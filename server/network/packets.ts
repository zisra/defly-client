import type { WebSocket } from "ws";
import {
  BULLET_COOLDOWN,
  COLLISION_RADIUS,
  DOT_HP,
  MAP_HEIGHT,
  MAP_SHAPE,
  MAP_WIDTH,
  PLAYER_SIZE,
} from "../constants/game";
import { Opcode, type Player, type PlayerPlus } from "../constants/types";
import {
  bullets,
  dots,
  lines,
  spawnBullet,
  updateBullets,
} from "../game/geometry";
import { parseString, writeString } from "../utils/strings";

export function sendAllDots(ws: WebSocket): void {
  if (dots.length === 0) return;
  const n = dots.length;
  const buf = new ArrayBuffer(1 + 2 + n * 26);
  const dv = new DataView(buf);
  dv.setUint8(0, Opcode.DotCreate); // 49
  dv.setInt16(1, n);
  let o = 3;

  for (const d of dots) {
    dv.setInt32(o, d.id);
    o += 4;
    dv.setInt32(o, d.owner);
    o += 4;
    dv.setFloat32(o, d.x);
    o += 4;
    dv.setFloat32(o, d.y);
    o += 4;
    dv.setUint8(o++, DOT_HP);
    dv.setUint8(o++, DOT_HP);
    dv.setFloat32(o, 0);
    o += 4;
    dv.setInt32(o, d.creationTick);
    o += 4;
  }
  ws.send(buf);
}

export function sendAllLines(ws: WebSocket): void {
  if (lines.length === 0) return;
  const n = lines.length;
  const buf = new ArrayBuffer(1 + 2 + n * 24);
  const dv = new DataView(buf);
  dv.setUint8(0, Opcode.LineCreate); // 50
  dv.setInt16(1, n);
  let o = 3;

  for (const l of lines) {
    dv.setInt32(o, l.id);
    o += 4;
    dv.setInt32(o, l.owner);
    o += 4;
    dv.setInt32(o, l.a);
    o += 4;
    dv.setInt32(o, l.b);
    o += 4;
    dv.setInt32(o, 0);
    o += 4; // left zone
    dv.setInt32(o, 0);
    o += 4; // right zone
  }
  ws.send(buf);
}

export function broadcastPacket(
  ab: ArrayBuffer,
  clients: Map<WebSocket, PlayerPlus>,
): void {
  const raw = Buffer.from(ab);
  for (const [ws] of clients) ws.readyState === ws.OPEN && ws.send(raw);
}

export function sendTickPacket(
  clients: Map<WebSocket, PlayerPlus>,
  serverTick: number,
  stepPlayerFn: (
    p: PlayerPlus,
    broadcastFn: (buf: ArrayBuffer) => void,
  ) => void,
  handlePlayerCollisionsFn: (broadcastFn: (buf: ArrayBuffer) => void) => void,
): void {
  const broadcastFn = (buf: ArrayBuffer) => broadcastPacket(buf, clients);

  for (const p of clients.values()) stepPlayerFn(p, broadcastFn);
  handlePlayerCollisionsFn(broadcastFn);
  // NEW: update bullets each tick using the clients map
  updateBullets(broadcastFn, clients);

  const alive = [...clients.values()].filter((p) => !p.dead);
  const count = alive.length;
  const buf = new ArrayBuffer(1 + 4 + 2 + count * 25);
  const dv = new DataView(buf);
  let off = 0;
  dv.setUint8(off++, Opcode.Tick);
  dv.setInt32(off, serverTick);
  off += 4;
  dv.setInt16(off, count);
  off += 2;
  for (const p of alive) {
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
    off += 4;
    dv.setUint8(off++, 255);
  }
  broadcastFn(buf);
}

export function parseLoginPacket(
  buffer: ArrayBuffer,
): Omit<
  Player,
  "playerId" | "x" | "y" | "sx" | "sy" | "lastInputTurn" | "badge"
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

export function buildPlayerInfoPacket(p: Player): ArrayBuffer {
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

export function buildBulletCreate(bullet: {
  initialTurn: number;
  id: number;
  owner: number;
  creator: number;
  x: number;
  y: number;
  sx: number;
  sy: number;
  lifetime: number;
}): ArrayBuffer {
  const buf = new ArrayBuffer(37);
  const dv = new DataView(buf);
  let o = 0;
  dv.setUint8(o++, 13);
  dv.setInt32(o, bullet.initialTurn);
  o += 4;
  dv.setInt32(o, bullet.id);
  o += 4;
  dv.setInt32(o, bullet.owner);
  o += 4;
  dv.setInt32(o, bullet.creator);
  o += 4;
  dv.setFloat32(o, bullet.x);
  o += 4;
  dv.setFloat32(o, bullet.y);
  o += 4;
  dv.setFloat32(o, bullet.sx);
  o += 4;
  dv.setFloat32(o, bullet.sy);
  o += 4;
  dv.setInt32(o, bullet.lifetime);
  o += 4;
  return buf;
}

export function buildBulletRemove(bulletId: number): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 4);
  const dv = new DataView(buf);
  let o = 0;
  dv.setUint8(o++, 14);
  dv.setInt32(o, bulletId);
  o += 4;
  return buf;
}
export function createGameInitPacket(
  id: number,
  x: number,
  y: number,
): ArrayBuffer {
  const buf = new ArrayBuffer(90);
  const view = new DataView(buf);
  let off = 0;

  view.setUint8(off++, Opcode.InitOK);
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

  view.setInt32(off, 0);
  off += 4; // colour index
  view.setInt32(off, MAP_SHAPE);

  return buf;
}

export function handleInputPacket(
  ws: WebSocket,
  buf: ArrayBuffer,
  clients: Map<WebSocket, PlayerPlus>,
  serverTick: number,
  TICK_RATE: number,
): void {
  const p = clients.get(ws);
  if (!p || p.dead) return;
  const v = new DataView(buf);
  const flags = v.getUint8(1);
  p.shooting = (flags & 1) !== 0;
  p.moving = (flags & 2) !== 0;
  p.moveDirection = v.getFloat32(2);
  p.aimDirection = v.getFloat32(6);
  const latency = v.getInt16(10);
  p.aimDistance = v.getFloat32(12);
  p.lastInputTurn = serverTick + Math.round((TICK_RATE * latency) / 1000);

  // If shooting and cooldown passed, spawn a bullet
  if (p.shooting) {
    if (!p.lastShotTick || serverTick - p.lastShotTick >= BULLET_COOLDOWN) {
      p.lastShotTick = serverTick;
      const bullet = spawnBullet(p.playerId, p.x, p.y, p.aimDirection);
      bullets.push(bullet);
      broadcastPacket(buildBulletCreate(bullet), clients);
    }
  }
}
