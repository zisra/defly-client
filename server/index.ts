import { type WebSocket, WebSocketServer } from "ws";

const PORT = 8000;
const wss = new WebSocketServer({ port: PORT });

const TICK_RATE = 60; // 60-Hz like the client code
const TICK_INTERVAL_MS = 1_000 / TICK_RATE;

const MAP_WIDTH = 50;
const MAP_HEIGHT = 50;
const SAFE_MARGIN_X = 0; // spawnSafeX  (index 12)
const SAFE_MARGIN_Y = 0; // spawnSafeY  (index 13)

enum Opcode {
  Login = 1,
  Input = 2,
  Tick = 4,
  Ping = 99,
  InitOK = 2,
}

interface Player {
  playerId: number;
  username: string;
  sessionId: string;
  skin: number;
  gamesPlayed: number;
  score: number;

  /* input state */
  shooting: boolean;
  moving: boolean;
  moveDirection: number;
  aimDirection: number;
  aimDistance: number;

  /* Physics */
  x: number;
  y: number;
  sx: number; // X-velocity
  sy: number; // Y-velocity

  lastInputTurn: number;
}

const clients = new Map<WebSocket, Player>();
let serverTick = 0;
let nextPlayerId = 1;

console.log(`Server listening on ws://localhost:${PORT}`);

function randomSpawn(): { x: number; y: number } {
  return {
    x: SAFE_MARGIN_X + Math.random() * (MAP_WIDTH - 2 * SAFE_MARGIN_X),
    y: SAFE_MARGIN_Y + Math.random() * (MAP_HEIGHT - 2 * SAFE_MARGIN_Y),
  };
}

const MOVE_SPEED = 10;

function stepPlayer(p: Player) {
  if (p.moving) {
    p.sx = Math.cos(p.moveDirection) * MOVE_SPEED;
    p.sy = Math.sin(p.moveDirection) * MOVE_SPEED;
  } else {
    p.sx = 0;
    p.sy = 0;
  }

  /* 2. Integrate position */
  p.x += p.sx / TICK_RATE;
  p.y += p.sy / TICK_RATE;

  /* 3. Keep inside map bounds */
  p.x = Math.max(0, Math.min(MAP_WIDTH, p.x));
  p.y = Math.max(0, Math.min(MAP_HEIGHT, p.y));
}

function parseString(
  view: DataView,
  offset: number,
): { value: string; nextOffset: number } {
  const length = view.getUint8(offset++);
  let str = "";
  for (let i = 0; i < length; i++) {
    str += String.fromCharCode(view.getUint16(offset));
    offset += 2;
  }
  return { value: str, nextOffset: offset };
}

function parseLoginPacket(
  buffer: ArrayBuffer,
): Omit<Player, "playerId"> | null {
  const view = new DataView(buffer);
  if (view.getUint8(0) !== 1) return null;

  let offset = 1;

  const usernameResult = parseString(view, offset);
  const username = usernameResult.value;
  offset = usernameResult.nextOffset;

  const sessionIdResult = parseString(view, offset);
  const sessionId = sessionIdResult.value;
  offset = sessionIdResult.nextOffset;

  const skin = view.getInt32(offset);
  offset += 4;

  const gamesPlayed = view.getInt32(offset);
  offset += 4;

  return {
    username,
    sessionId,
    skin,
    gamesPlayed,
    score: 0,
    shooting: false,
    moving: false,
    moveDirection: 0,
    aimDirection: -1,
    aimDistance: 0,
  };
}

function dataViewToBase64(dataView) {
  const uint8Array = new Uint8Array(dataView.buffer);
  let binaryString = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}

function base64ToDataView(base64) {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return new DataView(uint8Array.buffer);
}

function createGameInitPacket(
  playerId: number,
  SPAWN_X: number,
  SPAWN_Y: number,
): ArrayBuffer {
  // const buffer = new ArrayBuffer(90);
  // const view = new DataView(buffer);
  // let offset = 0;

  // view.setUint8(offset++, 2); // Opcode: Game initialized
  // view.setInt32(offset, playerId);
  // offset += 4;

  // view.setInt32(offset, 1); // Unused/team id?
  // offset += 4;

  // const PLAYER_SIZE = 1;
  // const COLLISION_RADIUS = 1;
  // const ZOOM = 12.5;

  // const worldFloats = [
  //   MAP_WIDTH,
  //   MAP_HEIGHT,
  //   PLAYER_SIZE,
  //   COLLISION_RADIUS,
  //   2,
  //   0,
  //   80,
  //   20,
  //   2,
  //   1,
  //   0,
  //   ZOOM,
  //   100,
  //   100,
  //   SPAWN_X,
  //   SPAWN_Y,
  // ];

  // for (const val of worldFloats) {
  //   view.setFloat32(offset, val);
  //   offset += 4;
  // }

  // view.setInt32(offset, 0); // Color, 0 = Client color
  // offset += 4;

  // view.setUint8(offset++, 1); // flag?
  // view.setUint8(offset++, 1); // another flag?

  // return buffer;

  return base64ToDataView(
    "AgAABQYAAAAAREgAAERIAAA/gAAAPxmZmj6ZmZo/LSJvPxmZmkDgAABCwAAAQkAAAEAAAABB8AAAQowAAEIgAABCZpDmQC78OQAAAAAAAAAAAQAICAgICAYIBgABAgMEBQdBIAAAQfAAAEEgAABB8AAAQSAAAEHwAABBIAAAQfAAAA==",
  );
}

function handleInputPacket(ws: WebSocket, buf: ArrayBuffer): void {
  if (buf.byteLength < 16) {
    console.warn("Input packet too short");
    return;
  }
  const v = new DataView(buf);

  const flags = v.getUint8(1);
  const shooting = (flags & 1) !== 0;
  const moving = (flags & 2) !== 0;

  const moveDir = v.getFloat32(2);
  const aimDir = v.getFloat32(6);
  const latencyMs = v.getInt16(10);
  const aimDist = v.getFloat32(12);

  const p = clients.get(ws);
  if (!p) return;

  p.shooting = shooting;
  p.moving = moving;
  p.moveDirection = moveDir;
  p.aimDirection = aimDir;
  p.aimDistance = aimDist;
  p.lastInputTurn = serverTick + Math.round((TICK_RATE * latencyMs) / 1_000);
}

function handlePing(ws: WebSocket): void {
  ws.send(Uint8Array.of(99));
}

const ENTITY_SIZE = 25; // 4 + 5×4 + 1  (what YD() expects)

function sendTickPacket(): void {
  for (const p of clients.values()) stepPlayer(p);

  const players = [...clients.values()];
  const count = players.length;
  const buf = new ArrayBuffer(1 + 4 + 2 + count * ENTITY_SIZE);
  const dv = new DataView(buf);
  let off = 0;

  dv.setUint8(off++, Opcode.Tick);
  dv.setInt32(off, serverTick);
  off += 4; // big-endian
  dv.setInt16(off, count);
  off += 2;

  for (const p of players) {
    dv.setInt32(off, p.playerId);
    off += 4;
    dv.setFloat32(off, p.x);
    off += 4;
    dv.setFloat32(off, p.y);
    off += 4;
    dv.setFloat32(off, p.sx);
    off += 4;
    dv.setFloat32(off, p.sy);
    off += 4;
    dv.setFloat32(off, p.aimDirection ?? 0);
    off += 4; // “rotation”
    dv.setUint8(off, 255);
    off += 1; // super-power (none)
  }

  broadcastPacket(buf);
  serverTick++;
}

setInterval(sendTickPacket, TICK_INTERVAL_MS);

function broadcastPacket(ab: ArrayBuffer): void {
  const raw = Buffer.from(ab);
  for (const [ws] of clients) {
    if (ws.readyState === ws.OPEN) ws.send(raw);
  }
}

wss.on("connection", (ws: WebSocket) => {
  console.log("[+] Client connected");

  ws.on("message", (data: Buffer) => {
    const arrayBuffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    );
    const view = new DataView(arrayBuffer);
    const opcode = view.getUint8(0);

    switch (opcode) {
      case 1: {
        const loginData = parseLoginPacket(arrayBuffer);
        if (loginData) {
          const playerId = nextPlayerId++;
          const { x, y } = randomSpawn();
          const player: Player = {
            playerId,
            ...loginData,
            x,
            y,
            sx: 0,
            sy: 0,
            lastInputTurn: 0,
          };
          clients.set(ws, player);
          ws.send(createGameInitPacket(playerId, x, y));
        }
        break;
      }
      case 2:
        handleInputPacket(ws, arrayBuffer);
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
