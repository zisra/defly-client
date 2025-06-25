import { MapShape, type Player } from "../constants/types";

export function keepInsideMapBounds({
  p,
  MAP_SHAPE,
  MAP_WIDTH,
  MAP_HEIGHT,
  SAFE_MARGIN_X,
}: {
  p: Player;
  MAP_SHAPE: MapShape;
  MAP_WIDTH: number;
  MAP_HEIGHT: number;
  SAFE_MARGIN_X: number;
}) {
  if (MAP_SHAPE === MapShape.Circle) {
    const centerX = MAP_WIDTH / 2;
    const centerY = MAP_HEIGHT / 2;
    const radius = Math.min(MAP_WIDTH, MAP_HEIGHT) / 2 - SAFE_MARGIN_X;
    const dx = p.x - centerX;
    const dy = p.y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > radius) {
      const angle = Math.atan2(dy, dx);
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    }
  } else if (MAP_SHAPE === MapShape.Hexagon) {
    // Define the hexagon vertices in order:
    const hexagonVertices = [
      { x: 0, y: MAP_HEIGHT / 2 },
      { x: MAP_WIDTH / 4, y: 0 },
      { x: (3 * MAP_WIDTH) / 4, y: 0 },
      { x: MAP_WIDTH, y: MAP_HEIGHT / 2 },
      { x: (3 * MAP_WIDTH) / 4, y: MAP_HEIGHT },
      { x: MAP_WIDTH / 4, y: MAP_HEIGHT },
    ];

    // Function to check if a point is inside the convex polygon (hexagon)
    const pointInPolygon = (
      pt: Player,
      vertices: {
        x: number;
        y: number;
      }[],
    ) => {
      let inside = false;
      for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x,
          yi = vertices[i].y;
        const xj = vertices[j].x,
          yj = vertices[j].y;
        const intersect =
          yi > pt.y !== yj > pt.y &&
          pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    };

    // If the player's position p is not inside the hexagon, clamp it.
    if (!pointInPolygon(p, hexagonVertices)) {
      // The center of the hexagon
      const center = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 };
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      let closestT = Infinity;
      let clampPos: {
        x: number;
        y: number;
      } = {
        x: center.x,
        y: center.y,
      };

      // Loop over each edge of the hexagon
      for (let i = 0; i < hexagonVertices.length; i++) {
        const A = hexagonVertices[i];
        const B = hexagonVertices[(i + 1) % hexagonVertices.length];
        // Edge vector
        const ex = B.x - A.x;
        const ey = B.y - A.y;
        // The ray from the center going towards p: center + t*(dx, dy)
        // Solve for t and u in:
        // center.x + t*dx = A.x + u*ex
        // center.y + t*dy = A.y + u*ey
        const denom = dx * ey - dy * ex;
        if (denom === 0) continue; // Parallel => no valid intersection
        const t = ((A.x - center.x) * ey - (A.y - center.y) * ex) / denom;
        const u = ((A.x - center.x) * dy - (A.y - center.y) * dx) / denom;
        // Check if intersection lies on the ray (t >= 0) and on the edge (0 <= u <= 1)
        if (t >= 0 && u >= 0 && u <= 1 && t < closestT) {
          closestT = t;
          clampPos = { x: center.x + t * dx, y: center.y + t * dy };
        }
      }

      // If a suitable intersection is found, clamp the player's position to it.
      if (clampPos) {
        return {
          x: clampPos.x,
          y: clampPos.y,
        };
      }
    }
  }

  return {
    x: Math.max(0, Math.min(MAP_WIDTH, p.x)),
    y: Math.max(0, Math.min(MAP_HEIGHT, p.y)),
  };
}
