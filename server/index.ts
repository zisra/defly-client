import { type WebSocket, WebSocketServer } from "ws";
import { keepInsideMapBounds } from "./keepInsideMapBounds";
import { randomSpawn } from "./randomSpawn";
import { MapShape, Opcode, type Player } from "./types";
import { parseString } from "./utils";

const PORT = 8000;
const wss = new WebSocketServer({ port: PORT, host: "0.0.0.0" });
console.log(`Server listening on ws://localhost:${PORT}`);

export const MAP_WIDTH = 150;
export const MAP_HEIGHT = 150;
export const SAFE_MARGIN_X = 0;
export const SAFE_MARGIN_Y = 0;
export const MAP_SHAPE: MapShape = MapShape.Circle;

const PLAYER_SIZE = 1;
const COLLISION_RADIUS = 0.6;
const MOVE_SPEED = 10;
const TICK_RATE = 100;
const TICK_INTERVAL_MS = 1_000 / TICK_RATE;

const clients = new Map<WebSocket, Player>();
let serverTick = 0;
let nextPlayerId = 1;

setInterval(sendTickPacket, TICK_INTERVAL_MS);

function broadcastPacket(ab: ArrayBuffer): void {
  const raw = Buffer.from(ab);
  for (const [ws] of clients) {
    if (ws.readyState === ws.OPEN) ws.send(raw);
  }
}

function parseLoginPacket(
  buffer: ArrayBuffer,
): Omit<Player, "playerId" | "x" | "y" | "sx" | "sy" | "lastInputTurn"> | null {
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

  const { x, y } = keepInsideMapBounds({
    p,
    MAP_SHAPE,
    MAP_WIDTH,
    MAP_HEIGHT,
    SAFE_MARGIN_X,
  });

  p.x = x;
  p.y = y;
}

function sendTickPacket(): void {
  for (const p of clients.values()) stepPlayer(p);

  const players = [...clients.values()];
  const count = players.length;
  const buf = new ArrayBuffer(1 + 4 + 2 + count * 25);
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
  p.lastInputTurn = serverTick + Math.round((TICK_RATE * latencyMs) / 1000);
}

function createGameInitPacket(
  playerId: number,
  SPAWN_X: number,
  SPAWN_Y: number,
): ArrayBuffer {
  const buffer = new ArrayBuffer(90);
  const view = new DataView(buffer);

  let offset = 0;
  view.setUint8(offset++, 2); // Opcode: Game initialized
  view.setInt32(offset, playerId);
  offset += 4;
  view.setInt32(offset, 1); // Unused/team id?
  offset += 4;

  const ZOOM = 30;

  const worldFloats = [
    MAP_WIDTH,
    MAP_HEIGHT,
    PLAYER_SIZE,
    COLLISION_RADIUS,
    Math.PI * 2,
    Math.PI * 2,
    7,
    96,
    48,
    1,
    0,
    ZOOM,
    70,
    40,
    SPAWN_X,
    SPAWN_Y,
  ];

  for (const val of worldFloats) {
    view.setFloat32(offset, val);
    offset += 4;
  }

  view.setInt32(offset, 4); // Color, 0 = Client color
  offset += 4;

  view.setInt32(offset, MAP_SHAPE);
  offset += 4;

  return buffer;
}

function handlePing(ws: WebSocket): void {
  ws.send(Uint8Array.of(Opcode.Ping));
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
      case Opcode.Login: {
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
      case Opcode.InitOK:
        handleInputPacket(ws, arrayBuffer);
        break;
      case Opcode.Ping:
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
