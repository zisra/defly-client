import type { WebSocket } from "ws";
import { DOT_MIN_DIST, DOT_OVERLAP_EPS } from "../constants/game";
import type { Dot, Line, PlayerPlus } from "../constants/types";
import {
  buildDotCreate,
  buildLineCreate,
  dots,
  getNextDotId,
  getNextLineId,
  haveLine,
  lines,
} from "../game/geometry";
import { broadcastPacket } from "./packets";

export function handleBuildTowerPacket(
  ws: WebSocket,
  buf: ArrayBuffer,
  clients: Map<WebSocket, PlayerPlus>,
  serverTick: number,
): void {
  const p = clients.get(ws);
  if (!p) return;

  const broadcastFn = (buffer: ArrayBuffer) => broadcastPacket(buffer, clients);

  /* 1 – coordinates (debug packet may contain floats) */
  let x = p.x,
    y = p.y;
  if (buf.byteLength >= 9) {
    const dv = new DataView(buf);
    x = dv.getFloat32(1);
    y = dv.getFloat32(5);
  }

  /* 2 – find if we are right on top of an existing dot */
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
          id: getNextLineId(),
          owner: p.playerId,
          a: last.id,
          b: overlap.id,
        };
        lines.push(line);
        broadcastFn(buildLineCreate(line));
      }
    }
    return; // nothing else to do
  }

  /* 3B – if too close to ANY existing dot (enemy OR own) → reject   */
  for (const d of dots) if (Math.hypot(d.x - x, d.y - y) < DOT_MIN_DIST) return;

  /* 4 – create a brand-new tower                                   */
  const dot: Dot = {
    id: getNextDotId(),
    owner: p.playerId,
    x,
    y,
    creationTick: serverTick,
  };
  dots.push(dot);
  broadcastFn(buildDotCreate(dot));

  /* 5 – connect it to the previous dot                              */
  const ownDots = dots.filter((d) => d.owner === p.playerId);
  if (ownDots.length >= 2) {
    const prev = ownDots[ownDots.length - 2];
    const line: Line = {
      id: getNextLineId(),
      owner: p.playerId,
      a: prev.id,
      b: dot.id,
    };
    lines.push(line);
    broadcastFn(buildLineCreate(line));
  }
}
