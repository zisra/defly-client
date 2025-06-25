import { type WebSocket, WebSocketServer } from "ws";
import { keepInsideMapBounds } from "./keepInsideMapBounds";
import { randomSpawn } from "./randomSpawn";
import { MapShape, Opcode, type Player, type PlayerPlus } from "./types";
import { parseString, writeString } from "./utils";

/* ─────────────── general constants ─────────────── */

const PORT = 8000;
const TICK_RATE = 60;
const TICK_INTERVAL_MS = 1_000 / TICK_RATE;

export const MAP_WIDTH = 50;
export const MAP_HEIGHT = 50;
export const SAFE_MARGIN_X = 0;
export const SAFE_MARGIN_Y = 0;
export const MAP_SHAPE: MapShape = MapShape.Hexagon;
const DOT_MIN_DIST = 1;
const DOT_OVERLAP_EPS = 0.3;
const CAPTURE_GRID = 100;

const PLAYER_SIZE = 1;
const COLLISION_RADIUS = 0.6;
const MOVE_SPEED = 10;
const COLLISION_THRESHOLD = COLLISION_RADIUS;

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

const DOT_HP = 8;

const clients = new Map<WebSocket, PlayerPlus>();
const dots: Dot[] = [];
const lines: Line[] = [];

let serverTick = 0;
let nextPlayerId = 1;
let nextDotId = 1;
let nextLineId = 1;

/* ─────────────── networking helpers ─────────────── */

function distPointToSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const vx = bx - ax,
    vy = by - ay;
  const wx = px - ax,
    wy = py - ay;
  const c1 = vx * wx + vy * wy;
  if (c1 <= 0) return Math.hypot(px - ax, py - ay);
  const c2 = vx * vx + vy * vy;
  if (c2 <= c1) return Math.hypot(px - bx, py - by);
  const t = c1 / c2;
  const ix = ax + t * vx,
    iy = ay + t * vy;
  return Math.hypot(px - ix, py - iy);
}

function sendKillPacket(
  victimId: number,
  cause: number,
  killerId = 0,
  wallOwner = 0,
): void {
  /* layout understood by client’s xv()
   *  0   uint8   10      (opcode)
   *  1   int32   victim
   *  5   uint8   cause   (1=shot, 2=wall, 3=collision, 5=explosion)
   *  6   int32   killerId (or 0)
   * 10   float32 radius   (we keep default 50)
   * 14   int32   wallOwner (used for kills on wall crash)
   */
  const buf = new ArrayBuffer(1 + 4 + 1 + 4 + 4 + 4);
  const dv = new DataView(buf);
  dv.setUint8(0, 10);
  dv.setInt32(1, victimId);
  dv.setUint8(5, cause);
  dv.setInt32(6, killerId);
  dv.setFloat32(10, 50);
  dv.setInt32(14, wallOwner);
  broadcastPacket(buf);
}

function sendAllDots(ws: WebSocket): void {
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
    o += 4; // ⭐ advance!
  }
  ws.send(buf);
}

function sendAllLines(ws: WebSocket): void {
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
    o += 4; // right zone  ⭐ add o+=4
  }
  ws.send(buf);
}

function tryCaptureArea(ownerId: number): void {
  const ownerLines = lines.filter((l) => l.owner === ownerId);
  if (ownerLines.length < 3) return;

  /* Build adjacency → find any cycle with DFS/BFS */
  const adj = new Map<number, number[]>();
  for (const l of ownerLines) {
    adj.set(l.a, (adj.get(l.a) ?? []).concat(l.b));
    adj.set(l.b, (adj.get(l.b) ?? []).concat(l.a));
  }

  const visited = new Set<number>();
  const stack: number[] = [];
  let cycle: number[] | null = null;

  function dfs(v: number, parent: number): boolean {
    visited.add(v);
    stack.push(v);
    for (const nb of adj.get(v) ?? []) {
      if (nb === parent) continue;
      if (visited.has(nb)) {
        // found a cycle
        cycle = stack.slice(stack.indexOf(nb));
        return true;
      }
      if (dfs(nb, v)) return true;
    }
    stack.pop();
    return false;
  }
  for (const v of adj.keys()) {
    if (!visited.has(v) && dfs(v, -1)) break;
  }
  if (!cycle || cycle?.length < 3) return;

  /* Convert cycle-dot ids to coordinates  */
  const poly = cycle.map((id) => {
    const d = dots.find((x) => x.id === id)!;
    return [d.x, d.y] as const;
  });

  /* Rasterise inside the polygon on CAPTURE_GRID × CAPTURE_GRID */
  const cells: { y: number; x1: number; x2: number }[] = [];
  for (let gy = 0; gy < CAPTURE_GRID; gy++) {
    const y = ((gy + 0.5) * MAP_HEIGHT) / CAPTURE_GRID;
    const inter: number[] = [];
    for (let i = 0; i < poly.length; i++) {
      const [x1, y1] = poly[i];
      const [x2, y2] = poly[(i + 1) % poly.length];
      if ((y1 <= y && y2 > y) || (y2 <= y && y1 > y)) {
        const t = (y - y1) / (y2 - y1);
        inter.push(x1 + t * (x2 - x1));
      }
    }
    inter.sort((a, b) => a - b);
    for (let k = 0; k + 1 < inter.length; k += 2) {
      const x1 = Math.floor((inter[k] * CAPTURE_GRID) / MAP_WIDTH);
      const x2 = Math.floor((inter[k + 1] * CAPTURE_GRID) / MAP_WIDTH);
      if (x2 >= x1) cells.push({ y: gy, x1, x2 });
    }
  }

  if (cells.length === 0) return;

  /*  Build opcode-31 packet  */
  const buf = new ArrayBuffer(1 + 4 + cells.length * 3);
  const dv = new DataView(buf);
  dv.setUint8(0, 31);
  dv.setInt32(1, ownerId); // color chosen client-side
  let o = 5;
  for (const c of cells) {
    // each triplet : y , x1 , x2
    dv.setUint8(o++, c.y);
    dv.setUint8(o++, c.x1);
    dv.setUint8(o++, c.x2);
  }
  broadcastPacket(buf);
}

function broadcastPacket(ab: ArrayBuffer): void {
  const raw = Buffer.from(ab);
  for (const [ws] of clients) ws.readyState === ws.OPEN && ws.send(raw);
}

/* ---- dot / line packets ---- */
function buildDotCreate(dot: Dot): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 2 + 26); // 29 bytes total
  const dv = new DataView(buf);
  let o = 0;

  dv.setUint8(o++, Opcode.DotCreate); // 49
  dv.setInt16(o, 1);
  o += 2;

  dv.setInt32(o, dot.id);
  o += 4;
  dv.setInt32(o, dot.owner);
  o += 4;
  dv.setFloat32(o, dot.x);
  o += 4;
  dv.setFloat32(o, dot.y);
  o += 4;
  dv.setUint8(o++, DOT_HP); // hp
  dv.setUint8(o++, DOT_HP); // maxHp
  dv.setFloat32(o, 0);
  o += 4; // shield
  dv.setInt32(o, dot.creationTick);
  o += 4; // ⭐ advance!

  return buf; // o = 29
}

function buildDotRemovePacket(ids: number[]): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 2 + ids.length * 4);
  const dv = new DataView(buf);
  dv.setUint8(0, Opcode.DotCreate);
  dv.setInt16(1, ids.length);
  let o = 3;
  for (const id of ids) {
    dv.setInt32(o, id);
    o += 4;
  }
  return buf;
}

function buildLineRemovePacket(ids: number[]): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 2 + ids.length * 4);
  const dv = new DataView(buf);
  dv.setUint8(0, Opcode.LineRemove);
  dv.setInt16(1, ids.length);
  let o = 3;
  for (const id of ids) {
    dv.setInt32(o, id);
    o += 4;
  }
  return buf;
}

function buildLineCreate(line: Line): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 2 + 24);
  const dv = new DataView(buf);
  let o = 0;

  dv.setUint8(o++, Opcode.LineCreate); // 50
  dv.setInt16(o, 1);
  o += 2;

  dv.setInt32(o, line.id);
  o += 4;
  dv.setInt32(o, line.owner);
  o += 4;
  dv.setInt32(o, line.a);
  o += 4;
  dv.setInt32(o, line.b);
  o += 4;
  dv.setInt32(o, 0);
  o += 4; // left zone
  dv.setInt32(o, 0);
  o += 4; // right zone  ⭐ add o+=4

  return buf;
}

function removePlayerGeometry(playerId: number): void {
  const dotIds = dots.filter((d) => d.owner === playerId).map((d) => d.id);
  const lineIds = lines.filter((l) => l.owner === playerId).map((l) => l.id);

  /* purge from server-side arrays (→ no more collision) */
  for (let i = dots.length - 1; i >= 0; i--)
    if (dots[i].owner === playerId) dots.splice(i, 1);
  for (let i = lines.length - 1; i >= 0; i--)
    if (lines[i].owner === playerId) lines.splice(i, 1);

  /* inform clients so the sprites vanish */
  if (dotIds.length > 0) broadcastPacket(buildDotRemovePacket(dotIds));
  if (lineIds.length > 0) broadcastPacket(buildLineRemovePacket(lineIds));
}

function killPlayer(
  p: PlayerPlus,
  cause: 2 | 3 | 5, // 2=wall 3=player-collision 5=explosion
  killerId = 0,
  wallOwner = 0,
): void {
  if (p.dead) return;

  sendKillPacket(p.playerId, cause, killerId, wallOwner);
  p.dead = true;
  p.moving = p.shooting = false;
  p.sx = p.sy = 0;

  removePlayerGeometry(p.playerId); // towers & walls disappear
}

function handlePlayerCollisions(): void {
  const alive = [...clients.values()].filter((p) => !p.dead);

  for (let i = 0; i < alive.length; i++) {
    for (let j = i + 1; j < alive.length; j++) {
      const a = alive[i],
        b = alive[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist <= COLLISION_THRESHOLD) {
        /* both players die, each receives the other’s id */
        killPlayer(a, 3, b.playerId);
        killPlayer(b, 3, a.playerId);
      }
    }
  }
}

/* ─────────────── player movement ─────────────── */

function stepPlayer(p: PlayerPlus): void {
  /* ── 1. move only if the player is alive ───────────────────────── */
  if (p.dead) {
    p.sx = p.sy = 0;
  } else {
    if (p.moving) {
      p.sx = Math.cos(p.moveDirection) * MOVE_SPEED;
      p.sy = Math.sin(p.moveDirection) * MOVE_SPEED;
    } else {
      p.sx = p.sy = 0;
    }

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

  /* ── 2. collision with enemy line segments ─────────────────────── */
  if (p.dead) return; // no collision check while dead

  for (const seg of lines) {
    if (seg.owner === p.playerId) continue; // ignore own walls

    const d1 = dots.find((d) => d.id === seg.a);
    const d2 = dots.find((d) => d.id === seg.b);
    if (!d1 || !d2) continue;

    const dist = distPointToSegment(p.x, p.y, d1.x, d1.y, d2.x, d2.y);

    if (dist <= COLLISION_RADIUS) {
      killPlayer(p, 2, 0, seg.owner);
      break;
    }
  }
}

function respawnPlayer(p: PlayerPlus, ws: WebSocket): void {
  const s = randomSpawn();

  p.x = s.x;
  p.y = s.y;
  p.sx = p.sy = 0;
  p.dead = false; // player can move again

  /* tell THAT client all world-constants again (same packet used at login) */
  ws.send(createGameInitPacket(p.playerId, s.x, s.y));
  sendAllDots(ws); // ← NEW
  sendAllLines(ws); // ← NEW
}

/* ─────────────── tower building (opcode 16) ─────────────── */

export function haveLine(a: number, b: number): boolean {
  return lines.some(
    (l) => (l.a === a && l.b === b) || (l.a === b && l.b === a),
  );
}

function handleBuildTowerPacket(ws: WebSocket, buf: ArrayBuffer): void {
  const p = clients.get(ws);
  if (!p) return;

  /* 1 – coordinates (debug packet may contain floats) */
  let x = p.x,
    y = p.y;
  if (buf.byteLength >= 9) {
    const dv = new DataView(buf);
    x = dv.getFloat32(1);
    y = dv.getFloat32(5);
  }

  /* 2 – find if we are right on top of an existing dot */
  let overlap: Dot | undefined;
  for (const d of dots) {
    const dxy = Math.hypot(d.x - x, d.y - y);
    if (dxy < DOT_OVERLAP_EPS) {
      overlap = d;
      break;
    }
  }

  /* 3A – we ARE on an existing dot that belongs to this player
          → treat as loop-closing action                              */
  if (overlap && overlap.owner === p.playerId) {
    /* find the last tower placed by this player that is not overlap  */
    const ownDots = dots.filter((d) => d.owner === p.playerId);
    if (ownDots.length >= 1) {
      const last = ownDots[ownDots.length - 1];
      if (last.id !== overlap.id && !haveLine(last.id, overlap.id)) {
        /* create the missing line */
        const line: Line = {
          id: nextLineId++,
          owner: p.playerId,
          a: last.id,
          b: overlap.id,
        };
        lines.push(line);
        broadcastPacket(buildLineCreate(line));
      }
    }
    /* attempt territory capture */
    tryCaptureArea(p.playerId);
    return; // nothing else to do
  }

  /* 3B – if too close to ANY existing dot (enemy OR own) → reject   */
  for (const d of dots) if (Math.hypot(d.x - x, d.y - y) < DOT_MIN_DIST) return;

  /* 4 – create a brand-new tower                                   */
  const dot: Dot = {
    id: nextDotId++,
    owner: p.playerId,
    x,
    y,
    creationTick: serverTick,
  };
  dots.push(dot);
  broadcastPacket(buildDotCreate(dot));

  /* 5 – connect it to the previous dot                              */
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

  /* 6 – maybe this new segment closed a loop                        */
  tryCaptureArea(p.playerId);
}

/* ─────────────── tick packet (players only) ─────────────── */

function sendTickPacket(): void {
  for (const p of clients.values()) stepPlayer(p);

  handlePlayerCollisions();
  const alive = [...clients.values()].filter((p) => !p.dead); // NEW
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
    // ← uses alive list
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

  broadcastPacket(buf);
  serverTick++;
}

setInterval(sendTickPacket, TICK_INTERVAL_MS);

/* ─────────────── login / packets from client ─────────────── */

function parseLoginPacket(
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

function buildPlayerInfoPacket(p: Player): ArrayBuffer {
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

  ws.on("message", (data: Buffer) => {
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

        const pl: PlayerPlus = {
          playerId: id,
          ...login,
          ...pos,
          sx: 0,
          sy: 0,
          lastInputTurn: 0,
          dead: false,
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
        sendAllDots(ws); // ← NEW
        sendAllLines(ws); // ← NEW
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

      case 4: {
        // client → server
        const pl = clients.get(ws);
        if (pl && pl.dead) respawnPlayer(pl, ws);
        break;
      }

      default:
        console.log("[?] Unknown opcode:", op);
    }
  });

  ws.on("close", () => {
    const p = clients.get(ws);
    if (p) {
      console.log(`[-] ${p.username} disconnected`);

      removePlayerGeometry(p.playerId);
    }
    clients.delete(ws);
  });
});
