import type { WebSocket } from "ws";
import {
  COLLISION_RADIUS,
  COLLISION_THRESHOLD,
  MAP_HEIGHT,
  MAP_SHAPE,
  MAP_WIDTH,
  MOVE_SPEED,
  SAFE_MARGIN_X,
  TICK_RATE,
} from "../constants/game";
import type { PlayerPlus } from "../constants/types";
import { keepInsideMapBounds } from "../utils/keepInsideMapBounds";
import { distPointToSegment } from "../utils/math";
import { randomSpawn } from "../utils/randomSpawn";
import {
  buildDotRemovePacket,
  buildLineRemovePacket,
  dots,
  lines,
  removePlayerGeometry,
} from "./geometry";

export const clients = new Map<WebSocket, PlayerPlus>();
let nextPlayerId = 1;

export function getNextPlayerId(): number {
  return nextPlayerId++;
}

export function sendKillPacket(
  victimId: number,
  cause: number,
  killerId = 0,
  wallOwner = 0,
  broadcastFn: (buf: ArrayBuffer) => void,
): void {
  /* layout understood by client's xv()
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
  broadcastFn(buf);
}

export function killPlayer(
  p: PlayerPlus,
  cause: 2 | 3 | 5, // 2=wall 3=player-collision 5=explosion
  broadcastFn: (buf: ArrayBuffer) => void,
  killerId = 0,
  wallOwner = 0,
): void {
  if (p.dead) return;

  sendKillPacket(p.playerId, cause, killerId, wallOwner, broadcastFn);
  p.dead = true;
  p.moving = p.shooting = false;
  p.sx = p.sy = 0;

  const { dotIds, lineIds } = removePlayerGeometry(p.playerId);

  /* inform clients so the sprites vanish */
  if (dotIds.length > 0) broadcastFn(buildDotRemovePacket(dotIds));
  if (lineIds.length > 0) broadcastFn(buildLineRemovePacket(lineIds));
}

export function handlePlayerCollisions(
  broadcastFn: (buf: ArrayBuffer) => void,
): void {
  const alive = [...clients.values()].filter((p) => !p.dead);

  for (let i = 0; i < alive.length; i++) {
    for (let j = i + 1; j < alive.length; j++) {
      const a = alive[i],
        b = alive[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist <= COLLISION_THRESHOLD) {
        /* both players die, each receives the other's id */
        killPlayer(a, 3, broadcastFn, b.playerId);
        killPlayer(b, 3, broadcastFn, a.playerId);
      }
    }
  }
}

export function stepPlayer(
  p: PlayerPlus,
  broadcastFn: (buf: ArrayBuffer) => void,
): void {
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
      killPlayer(p, 2, broadcastFn, 0, seg.owner);
      break;
    }
  }
}

export function respawnPlayer(
  p: PlayerPlus,
  ws: WebSocket,
  createGameInitFn: (id: number, x: number, y: number) => ArrayBuffer,
  sendAllDotsFn: (ws: WebSocket) => void,
  sendAllLinesFn: (ws: WebSocket) => void,
): void {
  const s = randomSpawn();

  p.x = s.x;
  p.y = s.y;
  p.sx = p.sy = 0;
  p.dead = false; // player can move again

  /* tell THAT client all world-constants again (same packet used at login) */
  ws.send(createGameInitFn(p.playerId, s.x, s.y));
  sendAllDotsFn(ws);
  sendAllLinesFn(ws);
}
