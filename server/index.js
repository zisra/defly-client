import { WebSocketServer } from "ws";

const PORT = 8000;
const wss = new WebSocketServer({ port: PORT });

const clients = new Map();
const dots = new Map();
const bullets = new Map();

console.log(`Server listening on ws://localhost:${PORT}`);

function parseLoginPacket(buffer) {
  const view = new DataView(buffer);
  if (view.getUint8(0) !== 1) return null;
  let offset = 1;
  const unameLen = view.getUint8(offset++);
  let username = "";
  for (let i = 0; i < unameLen; i++) {
    username += String.fromCharCode(view.getUint16(offset));
    offset += 2;
  }
  const sessLen = view.getUint8(offset++);
  for (let i = 0; i < sessLen; i++) offset += 2; // skip session id
  const $z = view.getInt32(offset);
  const qz = view.getInt32(offset + 4);
  return { username, $z, qz, score: 0, moving: false, moveDirection: 0 };
}

function createGameInitPacket(playerId) {
  const buffer = new ArrayBuffer(90);
  const view = new DataView(buffer);
  let offset = 0;
  view.setUint8(offset++, 2); // Opcode: Game initialized
  view.setInt32(offset, playerId);
  offset += 4; // HV
  view.setInt32(offset, 1);
  offset += 4; // lz
  view.setFloat32(offset, 10);
  offset += 4; // Oz (map width)
  view.setFloat32(offset, 10);
  offset += 4; // ez (map height)
  view.setFloat32(offset, 1);
  offset += 4; // kz (scale factor)
  view.setFloat32(offset, 6);
  offset += 4; // Iz
  view.setFloat32(offset, 2);
  offset += 4; // Az
  view.setFloat32(offset, 0);
  offset += 4; // QV
  view.setFloat32(offset, 80);
  offset += 4; // dV
  view.setFloat32(offset, 20);
  offset += 4; // fV
  view.setFloat32(offset, 2);
  offset += 4; // TV
  view.setFloat32(offset, 1);
  offset += 4; // $V
  view.setFloat32(offset, 0);
  offset += 4; // ignored
  view.setFloat32(offset, 12.5);
  offset += 4; // VV
  view.setFloat32(offset, 65);
  offset += 4; // Nz (size)
  view.setFloat32(offset, 65);
  offset += 4; // zV (also size?)
  view.setFloat32(offset, 4);
  offset += 4; // x (initial pos x)
  view.setFloat32(offset, 4);
  offset += 4; // y (initial pos y)

  // view.setInt32(offset, 0);
  // offset += 4; // MV (team ID)

  view.setInt32(offset, 0);
  offset += 4; // iV (minimap shape)
  view.setUint8(offset++, 1); // Pz (player type/skin)
  view.setUint8(offset++, 7); // flags (admin/mod/teamSelect)
  return buffer;
}

// Opcode 60: Dot Handling
// Expecting:
//   int32 dotId, float32 x, float32 y, float32 size
function handleDotPacket(ws, buffer) {
  const view = new DataView(buffer);
  // Assume opcode 60 occupies the first byte.
  let offset = 1;
  const dotId = view.getInt32(offset);
  offset += 4;
  const x = view.getFloat32(offset);
  offset += 4;
  const y = view.getFloat32(offset);
  offset += 4;
  const size = view.getFloat32(offset);
  offset += 4;
  // Create a dot object (will add extra fields as needed)
  const dot = { id: dotId, x, y, size, lines: [] };
  dots.set(dotId, dot);
  console.log(
    `[DOT] Dot ${dotId} created/updated at (${x}, ${y}) size ${size}`,
  );
  // Broadcast the dot update to all clients
  broadcastPacket(buffer);
}

// Opcode 61: Bullet Handling
// Expecting:
//   int32 bulletId, float32 x, float32 y, float32 vx, float32 vy, int32 ownerId
function handleBulletPacket(_ws, buffer) {
  const view = new DataView(buffer);
  let offset = 1; // opcode 61
  const bulletId = view.getInt32(offset);
  offset += 4;
  const x = view.getFloat32(offset);
  offset += 4;
  const y = view.getFloat32(offset);
  offset += 4;
  const vx = view.getFloat32(offset);
  offset += 4;
  const vy = view.getFloat32(offset);
  offset += 4;
  const ownerId = view.getInt32(offset);
  offset += 4;
  const bullet = { id: bulletId, x, y, vx, vy, ownerId };
  bullets.set(bulletId, bullet);
  console.log(
    `[BULLET] Bullet ${bulletId} created at (${x}, ${y}) with velocity (${vx}, ${vy}) by ${ownerId}`,
  );
  // Broadcast the bullet update to all clients
  broadcastPacket(buffer);
}

// Helper: Broadcast a given ArrayBuffer packet to all clients
function broadcastPacket(packetBuffer) {
  for (const [client] of clients.entries()) {
    if (client.readyState === client.OPEN) {
      client.send(packetBuffer);
    }
  }
} // Movement packet handler (opcode 3)
function handleMovementPacket(ws, buffer) {
  const view = new DataView(buffer);
  const moving = view.getUint8(1);
  const direction = view.getUint8(2);
  const player = clients.get(ws);
  if (player) {
    player.moving = !!moving;
    player.moveDirection = direction;

    // Demo, increase score for everyone
    console.log(`[MOVE] ${player.username} moving=${moving} dir=${direction}`);

    broadcastPacket(buffer);
  }
}

// Ping (opcode 99)
function handlePing(ws) {
  ws.send(Uint8Array.of(99));
}

wss.on("connection", (ws) => {
  console.log("[+] Client connected");

  ws.on("message", (data) => {
    const arrayBuffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    );
    const view = new DataView(arrayBuffer);
    const opcode = view.getUint8(0);

    switch (opcode) {
      case 1: {
        const login = parseLoginPacket(arrayBuffer);
        if (login) {
          clients.set(ws, { ...login });
          console.log(`[LOGIN] Player joined: ${login.username}`);

          const gameInitPacket = createGameInitPacket(login.$z || 1);
          ws.send(gameInitPacket);
        }
        break;
      }
      case 3:
        handleMovementPacket(ws, arrayBuffer);
        break;
      case 60:
        handleDotPacket(ws, arrayBuffer);
        break;
      case 61:
        handleBulletPacket(ws, arrayBuffer);
        break;
      case 99:
        console.log("[PING] Ping received");
        handlePing(ws);
        break;
      default:
        console.log(`[?] Unknown opcode: ${opcode}`);
    }
  });

  ws.on("close", () => {
    const player = clients.get(ws);
    if (player) {
      console.log(`[-] Player disconnected: ${player.username}`);
    }
    clients.delete(ws);
  });
});
