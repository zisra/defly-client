/**
 * Multiplayer server with:
 * 1. Support for multiple players
 * 2. Tick sync every 250ms (opcode 4)
 * 3. Copter rotation support (opcode 62)
 */

import { WebSocketServer } from "ws";

const PORT = 8000;
const wss = new WebSocketServer({ port: PORT });

const clients = new Map(); // ws -> player object
const dots = new Map();
const bullets = new Map();
let serverTick = 0;

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
  return {
    username,
    $z,
    qz,
    score: 0,
    moving: false,
    moveDirection: 0,
    angle: 0,
  };
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
  offset += 4; // x
  view.setFloat32(offset, 4);
  offset += 4; // y
  view.setInt32(offset, 0);
  offset += 4; // iV
  view.setUint8(offset++, 1); // Pz
  view.setUint8(offset++, 7); // flags
  return buffer;
}

function handleDotPacket(ws, buffer) {
  const view = new DataView(buffer);
  let offset = 1;
  const dotId = view.getInt32(offset);
  offset += 4;
  const x = view.getFloat32(offset);
  offset += 4;
  const y = view.getFloat32(offset);
  offset += 4;
  const size = view.getFloat32(offset);
  offset += 4;
  const dot = { id: dotId, x, y, size, lines: [] };
  dots.set(dotId, dot);
  console.log(
    `[DOT] Dot ${dotId} created/updated at (${x}, ${y}) size ${size}`,
  );
  broadcastPacket(buffer);
}

function handleBulletPacket(_ws, buffer) {
  const view = new DataView(buffer);
  let offset = 1;
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
    `[BULLET] Bullet ${bulletId} created at (${x}, ${y}) by ${ownerId}`,
  );
  broadcastPacket(buffer);
}

function handleMovementPacket(ws, buffer) {
  const view = new DataView(buffer);
  const moving = view.getUint8(1);
  const direction = view.getUint8(2);
  const player = clients.get(ws);
  if (player) {
    player.moving = !!moving;
    player.moveDirection = direction;
    console.log(`[MOVE] ${player.username} moving=${moving} dir=${direction}`);
    broadcastPacket(buffer);
  }
}

function handleRotationPacket(ws, buffer) {
  const view = new DataView(buffer);
  const angle = view.getFloat32(1);
  const player = clients.get(ws);
  if (player) {
    player.angle = angle;
    console.log(`[ROTATE] ${player.username} angle=${angle}`);
    broadcastPacket(buffer);
  }
}

function handlePing(ws) {
  ws.send(Uint8Array.of(99));
}

function sendTickPacket() {
  const buffer = new ArrayBuffer(5);
  const view = new DataView(buffer);
  view.setUint8(0, 4);
  view.setInt32(1, serverTick);
  broadcastPacket(buffer);
  serverTick++;
}

setInterval(() => {
  sendTickPacket();
}, 250); // 4Hz = every 250ms

function broadcastPacket(packetBuffer) {
  for (const [client] of clients.entries()) {
    if (client.readyState === client.OPEN) {
      client.send(packetBuffer);
    }
  }
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
          console.log(`[LOGIN] ${login.username} joined.`);
          ws.send(createGameInitPacket(login.$z || 1));
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
      case 62:
        handleRotationPacket(ws, arrayBuffer);
        break;
      case 99:
        handlePing(ws);
        break;
      default:
        console.log(`[?] Unknown opcode: ${opcode}`);
    }
  });

  ws.on("close", () => {
    const player = clients.get(ws);
    if (player) {
      console.log(`[-] ${player.username} disconnected.`);
    }
    clients.delete(ws);
  });
});
