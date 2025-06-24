import { type WebSocket, WebSocketServer } from "ws";
import { keepInsideMapBounds } from "./keepInsideMapBounds";
import { randomSpawn } from "./randomSpawn";
import { MapShape, Opcode, type Player } from "./types";
import { parseString, writeString } from "./utils";

/* ─────────────── general constants ─────────────── */

const PORT = 8000;
const TICK_RATE = 60; // ticks · s⁻¹
const TICK_INTERVAL_MS = 1_000 / TICK_RATE;

export const MAP_WIDTH = 50;
export const MAP_HEIGHT = 50;
export const SAFE_MARGIN_X = 0;
export const SAFE_MARGIN_Y = 0;
export const MAP_SHAPE: MapShape = MapShape.Hexagon;

const PLAYER_SIZE = 1;
const COLLISION_RADIUS = 0.6;
const MOVE_SPEED = 10;

/* ─────────────── game-objects ─────────────── */

interface PlayerState extends Player {
  prevShooting: boolean;
  nextAllowedShot: number;
}

interface Bullet {
  id: number;
  owner: number;
  x: number;
  y: number;
  sx: number;
  sy: number;
  spawnTick: number;
}

interface Dot {
  id: number;
  owner: number;
  x: number;
  y: number;
  creationTick: number;
}

interface Line {
  id: number;
  owner: number;
  a: number; // dotId 1
  b: number; // dotId 2
}

const BULLET_SPEED_FT_S = 30;
const FIRE_COOLDOWN_TICKS = 10; // 100 ms
const BULLET_LIFETIME_TICKS = 3 * TICK_RATE; // 3 s
const DOT_HP = 8;

const clients = new Map<WebSocket, PlayerState>();
const bullets: Bullet[] = [];
const dots: Dot[] = [];
const lines: Line[] = [];

let serverTick = 0;
let nextPlayerId = 1;
let nextBulletId = 1;
let nextDotId = 1;
let nextLineId = 1;

/* ─────────────── networking helpers ─────────────── */

function broadcastPacket(ab: ArrayBuffer): void {
  const raw = Buffer.from(ab);
  for (const [ws] of clients) ws.readyState === ws.OPEN && ws.send(raw);
}

/* ---- bullet packets ---- */

function buildBulletCreate(b: Bullet): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 4 + 4 + 4 + 4 + 4 + 4 + 4); // 33 bytes
  const dv = new DataView(buf);
  let o = 0;

  dv.setUint8(o++, Opcode.BulletCreate);
  dv.setInt32(o, b.spawnTick);
  o += 4;
  dv.setInt32(o, b.id);
  o += 4;
  dv.setInt32(o, b.owner);
  o += 4;
  dv.setFloat32(o, b.x);
  o += 4;
  dv.setFloat32(o, b.y);
  o += 4;
  dv.setFloat32(o, b.sx);
  o += 4;
  dv.setFloat32(o, b.sy);
  o += 4;

  return buf;
}
function buildBulletRemove(id: number): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 4);
  const dv = new DataView(buf);
  dv.setUint8(0, Opcode.BulletRemove);
  dv.setInt32(1, id);
  return buf;
}

/* ---- dot / line packets ---- */

function buildDotCreate(dot: Dot): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 2 + 26);
  const dv = new DataView(buf);
  let o = 0;

  dv.setUint8(o++, Opcode.DotCreate);
  dv.setInt16(o, 1);
  o += 2; // one dot

  dv.setInt32(o, dot.id);
  o += 4;
  dv.setInt32(o, dot.owner);
  o += 4;
  dv.setFloat32(o, dot.x);
  o += 4;
  dv.setFloat32(o, dot.y);
  o += 4;
  dv.setUint8(o++, DOT_HP); // hp
  dv.setUint8(o++, DOT_HP); // max-hp
  dv.setFloat32(o, 0);
  o += 4; // shield %
  dv.setInt32(o, dot.creationTick);

  return buf;
}

function buildLineCreate(line: Line): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 2 + 24);
  const dv = new DataView(buf);
  let o = 0;

  dv.setUint8(o++, Opcode.LineCreate);
  dv.setInt16(o, 1);
  o += 2; // one line

  dv.setInt32(o, line.id);
  o += 4;
  dv.setInt32(o, line.owner);
  o += 4;
  dv.setInt32(o, line.a);
  o += 4;
  dv.setInt32(o, line.b);
  o += 4;
  dv.setInt32(o, 0);
  o += 4; // leftZone  (unused)
  dv.setInt32(o, 0); // rightZone (unused)

  return buf;
}

/* ─────────────── physics helpers ─────────────── */

function maybeFireBullet(p: PlayerState): void {
  if (
    p.shooting &&
    !p.prevShooting &&
    serverTick >= p.nextAllowedShot &&
    p.aimDirection >= 0
  ) {
    const sx = Math.cos(p.aimDirection) * BULLET_SPEED_FT_S;
    const sy = Math.sin(p.aimDirection) * BULLET_SPEED_FT_S;

    const bullet: Bullet = {
      id: nextBulletId++,
      owner: p.playerId,
      x: p.x,
      y: p.y,
      sx,
      sy,
      spawnTick: serverTick,
    };
    bullets.push(bullet);
    broadcastPacket(buildBulletCreate(bullet));
    p.nextAllowedShot = serverTick + FIRE_COOLDOWN_TICKS;
  }
  p.prevShooting = p.shooting;
}

function stepBullets(): void {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.x += b.sx / TICK_RATE;
    b.y += b.sy / TICK_RATE;

    const expired =
      serverTick - b.spawnTick >= BULLET_LIFETIME_TICKS ||
      b.x < 0 ||
      b.x > MAP_WIDTH ||
      b.y < 0 ||
      b.y > MAP_HEIGHT;

    if (expired) {
      bullets.splice(i, 1);
      broadcastPacket(buildBulletRemove(b.id));
    }
  }
}

/* ─────────────── player movement ─────────────── */

function stepPlayer(p: PlayerState): void {
  if (p.moving) {
    p.sx = Math.cos(p.moveDirection) * MOVE_SPEED;
    p.sy = Math.sin(p.moveDirection) * MOVE_SPEED;
  } else {
    p.sx = p.sy = 0;
  }

  p.x += p.sx / TICK_RATE;
  p.y += p.sy / TICK_RATE;

  /* clamp / wrap according to map shape */
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

/* ─────────────── tower building (opcode 16) ─────────────── */

function handleBuildTowerPacket(ws: WebSocket, buf: ArrayBuffer): void {
  const p = clients.get(ws);
  if (!p) return; // sanity

  /* optional dev-coordinates (ignored) */
  let towerX = p.x;
  let towerY = p.y;
  if (buf.byteLength >= 9) {
    const dv = new DataView(buf);
    towerX = dv.getFloat32(1);
    towerY = dv.getFloat32(5);
  }

  /* ---- create dot ---------------------------------------------------- */
  const dot: Dot = {
    id: nextDotId++,
    owner: p.playerId,
    x: towerX,
    y: towerY,
    creationTick: serverTick,
  };
  dots.push(dot);
  broadcastPacket(buildDotCreate(dot));

  /* ---- create line to previous dot of the same owner ----------------- */
  const ownDots = dots.filter((d) => d.owner === p.playerId);
  if (ownDots.length >= 2) {
    const prev = ownDots[ownDots.length - 2];
    const line: Line = {
      id: nextLineId++,
      owner: p.playerId,
      a: prev.id,
      b: dot.id,
    };
    lines.push(line);
    broadcastPacket(buildLineCreate(line));
  }
}

/* ─────────────── tick packet (players only) ─────────────── */

function sendTickPacket(): void {
  /* 1. integrate physics */
  for (const p of clients.values()) {
    stepPlayer(p);
    maybeFireBullet(p);
  }
  stepBullets();

  /* 2. build & send player-state packet */
  const players = [...clients.values()];
  const count = players.length;
  const buf = new ArrayBuffer(1 + 4 + 2 + count * 25);
  const dv = new DataView(buf);
  let off = 0;

  dv.setUint8(off++, Opcode.Tick);
  dv.setInt32(off, serverTick);
  off += 4;
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
    off += 4; // rotation
    dv.setUint8(off++, 255); // no super-power
  }

  broadcastPacket(buf);
  serverTick++;
}
setInterval(sendTickPacket, TICK_INTERVAL_MS);

/* ─────────────── login / packets from client ─────────────── */

function parseLoginPacket(
  buffer: ArrayBuffer,
): Omit<
  PlayerState,
  "playerId" | "x" | "y" | "sx" | "sy" | "lastInputTurn"
> | null {
  const view = new DataView(buffer);
  if (view.getUint8(0) !== Opcode.Login) return null;

  let offset = 1;
  const u1 = parseString(view, offset);
  offset = u1.nextOffset;
  const u2 = parseString(view, offset);
  offset = u2.nextOffset;

  const skin = view.getInt32(offset);
  offset += 4;
  const gamesPlayed = view.getInt32(offset);

  return {
    username: u1.value,
    sessionId: u2.value,
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

function buildPlayerInfoPacket(p: PlayerState): ArrayBuffer {
  const strBytes = 1 + 2 * Math.min(p.username.length, 255);
  const bufLen = 1 + 4 + strBytes + 4 + 4 + 1;
  const buf = new ArrayBuffer(bufLen);
  const dv = new DataView(buf);
  let o = 0;

  dv.setUint8(o++, 29); // opcode
  dv.setInt32(o, p.playerId);
  o += 4;

  o = writeString(dv, o, p.username);
  dv.setInt32(o, p.skin);
  o += 4;
  dv.setInt32(o, 0); // Color
  o += 4;
  dv.setUint8(o, 47); // Badge

  return buf;
}

function handleInputPacket(ws: WebSocket, buf: ArrayBuffer): void {
  if (buf.byteLength < 16) return;
  const v = new DataView(buf);
  const p = clients.get(ws);
  if (!p) return;

  const flags = v.getUint8(1);
  p.shooting = (flags & 1) !== 0;
  p.moving = (flags & 2) !== 0;
  p.moveDirection = v.getFloat32(2);
  p.aimDirection = v.getFloat32(6);
  const latency = v.getInt16(10);
  p.aimDistance = v.getFloat32(12);
  p.lastInputTurn = serverTick + Math.round((TICK_RATE * latency) / 1_000);
}

function createGameInitPacket(id: number, x: number, y: number): ArrayBuffer {
  const buf = new ArrayBuffer(90);
  const view = new DataView(buf);
  let off = 0;

  view.setUint8(off++, Opcode.InitOK); // opcode 2
  view.setInt32(off, id);
  off += 4;
  view.setInt32(off, 1);
  off += 4; // team / unused

  const ZOOM = 30;
  const worldFloats = [
    MAP_WIDTH,
    MAP_HEIGHT,
    PLAYER_SIZE,
    COLLISION_RADIUS,
    Math.PI * 2,
    Math.PI * 2,
    0.6,
    96,
    48,
    1,
    0,
    ZOOM,
    70,
    40,
    x,
    y,
  ];
  for (const f of worldFloats) {
    view.setFloat32(off, f);
    off += 4;
  }

  view.setInt32(off, 4);
  off += 4; // colour index
  view.setInt32(off, MAP_SHAPE);

  return buf;
}

/* ─────────────── WebSocket server ─────────────── */

const wss = new WebSocketServer({ port: PORT, host: "0.0.0.0" });
console.log(`Server listening on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
  console.log("[+] Client connected");

  ws.on("message", (data) => {
    const ab = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    );
    const dv = new DataView(ab);
    const op = dv.getUint8(0);

    switch (op) {
      case Opcode.Login: {
        const login = parseLoginPacket(ab);
        if (!login) break;

        const id = nextPlayerId++;
        const pos = randomSpawn();

        const pl: PlayerState = {
          playerId: id,
          ...login,
          ...pos,
          sx: 0,
          sy: 0,
          lastInputTurn: 0,
          prevShooting: false,
          nextAllowedShot: 0,
        };
        clients.set(ws, pl);

        /* a) tell everybody about the newcomer */
        broadcastPacket(buildPlayerInfoPacket(pl));

        /* b) tell the newcomer about everybody already connected */
        for (const [, other] of clients)
          if (other.playerId !== pl.playerId)
            ws.send(buildPlayerInfoPacket(other));

        /* c) normal game-init packet */
        ws.send(createGameInitPacket(id, pos.x, pos.y));
        break;
      }

      case Opcode.Input: // 2
        handleInputPacket(ws, ab);
        break;

      case Opcode.BuildTower: // 16
        handleBuildTowerPacket(ws, ab);
        break;

      case Opcode.Ping: // 99
        ws.send(Uint8Array.of(Opcode.Ping));
        break;

      default:
        console.log("[?] Unknown opcode:", op);
    }
  });

  ws.on("close", () => {
    const p = clients.get(ws);
    p && console.log(`[-] ${p.username} disconnected`);
    clients.delete(ws);
  });
});
