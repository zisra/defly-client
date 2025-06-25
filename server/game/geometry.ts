import {
  BULLET_LIFETIME,
  BULLET_RADIUS,
  BULLET_SPEED,
  DOT_HP,
} from "../constants/game";
import type { Bullet, Dot, Line, PlayerPlus } from "../constants/types";
import { Opcode } from "../constants/types";
import { buildBulletRemove } from "../network/packets";
import { distPointToSegment } from "../utils/math";

export const dots: Dot[] = [];
export const lines: Line[] = [];
export const bullets: Bullet[] = [];

let nextDotId = 1;
let nextLineId = 1;
let nextBulletId = 1;

export function getNextDotId(): number {
  return nextDotId++;
}

export function getNextLineId(): number {
  return nextLineId++;
}

export function getNextBulletId(): number {
  return nextBulletId++;
}

export function haveLine(a: number, b: number): boolean {
  return lines.some(
    (l) => (l.a === a && l.b === b) || (l.a === b && l.b === a),
  );
}

export function buildDotCreate(dot: Dot): ArrayBuffer {
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
  o += 4;

  return buf;
}

export function buildDotRemovePacket(ids: number[]): ArrayBuffer {
  const buf = new ArrayBuffer(1 + 2 + ids.length * 4);
  const dv = new DataView(buf);
  dv.setUint8(0, Opcode.DotRemove);
  dv.setInt16(1, ids.length);
  let o = 3;
  for (const id of ids) {
    dv.setInt32(o, id);
    o += 4;
  }
  return buf;
}

export function buildLineCreate(line: Line): ArrayBuffer {
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
  o += 4; // Left zone
  dv.setInt32(o, 0);
  o += 4; // Right zone

  return buf;
}

export function updateBullets(
  broadcastFn: (buf: ArrayBuffer) => void,
  clients: Map<WebSocket, PlayerPlus>,
) {
  const toRemove: number[] = [];
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    // Save current position as lastX/Y
    bullet.lastX = bullet.x;
    bullet.lastY = bullet.y;
    // Update bullet position
    bullet.x += bullet.sx / 60; // assuming 60 ticks per second
    bullet.y += bullet.sy / 60;
    bullet.lifetime--;

    // Check collision with players (skip owner and dead players)
    for (const p of clients.values()) {
      if (p.playerId === bullet.owner || p.dead) continue;
      const dist = Math.hypot(p.x - bullet.x, p.y - bullet.y);
      if (dist < BULLET_RADIUS) {
        // Collision detected – kill the player (using collision cause 2 for wall, choose appropriate)
        // Here we simply mark the player as dead.
        // In a full implementation, you would call killPlayer(p, ...) from player.ts.
        p.dead = true;
        toRemove.push(bullet.id);
        break;
      }
    }

    // Check deflection from enemy lines
    for (const line of lines) {
      if (line.owner === bullet.owner) continue;
      const d1 = dots.find((d) => d.id === line.a);
      const d2 = dots.find((d) => d.id === line.b);
      if (!d1 || !d2) continue;
      const segDist = distPointToSegment(
        bullet.x,
        bullet.y,
        d1.x,
        d1.y,
        d2.x,
        d2.y,
      );
      if (segDist < BULLET_RADIUS) {
        // Deflect bullet by reversing its velocity scaled by 0.25
        bullet.sx = -bullet.sx * 0.25;
        bullet.sy = -bullet.sy * 0.25;
      }
    }

    if (bullet.lifetime <= 0) {
      toRemove.push(bullet.id);
    }
  }
  // Remove expired or spent bullets and broadcast bullet removal packets
  for (const id of toRemove) {
    const index = bullets.findIndex((b) => b.id === id);
    if (index !== -1) {
      broadcastFn(buildBulletRemove(bullets[index].id));
      bullets.splice(index, 1);
    }
  }
}

export function buildLineRemovePacket(ids: number[]): ArrayBuffer {
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

export function removePlayerGeometry(playerId: number): {
  dotIds: number[];
  lineIds: number[];
} {
  const dotIds = dots.filter((d) => d.owner === playerId).map((d) => d.id);
  const lineIds = lines.filter((l) => l.owner === playerId).map((l) => l.id);

  /* purge from server-side arrays (→ no more collision) */
  for (let i = dots.length - 1; i >= 0; i--)
    if (dots[i].owner === playerId) dots.splice(i, 1);
  for (let i = lines.length - 1; i >= 0; i--)
    if (lines[i].owner === playerId) lines.splice(i, 1);

  return { dotIds, lineIds };
}

export function spawnBullet(
  owner: number,
  x: number,
  y: number,
  direction: number,
): Bullet {
  const bullet: Bullet = {
    id: getNextBulletId(),
    owner,
    x,
    y,
    sx: Math.cos(direction) * BULLET_SPEED,
    sy: Math.sin(direction) * BULLET_SPEED,
    lifetime: BULLET_LIFETIME,
    lastX: x,
    lastY: y,
  };
  return bullet;
}
