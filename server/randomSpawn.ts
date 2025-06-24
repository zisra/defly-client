import {
  MAP_HEIGHT,
  MAP_SHAPE,
  MAP_WIDTH,
  SAFE_MARGIN_X,
  SAFE_MARGIN_Y,
} from ".";
import { MapShape } from "./types";

export function randomSpawn(): { x: number; y: number } {
  if (MAP_SHAPE === MapShape.Circle) {
    const radius = Math.min(MAP_WIDTH, MAP_HEIGHT) / 2 - SAFE_MARGIN_X;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: MAP_WIDTH / 2 + radius * Math.cos(angle),
      y: MAP_HEIGHT / 2 + radius * Math.sin(angle),
    };
  } else if (MAP_SHAPE === MapShape.Hexagon) {
    // Define the hexagon vertices (exactly as supplied in the drawing)
    const hexagonVertices = [
      { x: 0, y: MAP_HEIGHT / 2 },
      { x: MAP_WIDTH / 4, y: 0 },
      { x: (3 * MAP_WIDTH) / 4, y: 0 },
      { x: MAP_WIDTH, y: MAP_HEIGHT / 2 },
      { x: (3 * MAP_WIDTH) / 4, y: MAP_HEIGHT },
      { x: MAP_WIDTH / 4, y: MAP_HEIGHT },
    ];
    // The center is used to split the hexagon into 6 triangles.
    const center = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 };

    // Pick one triangle at random.
    const i = Math.floor(Math.random() * 6);
    const A = center;
    const B = hexagonVertices[i];
    const C = hexagonVertices[(i + 1) % 6];

    // Generate a uniformly random point in a triangle using barycentric coordinates.
    let r1 = Math.random();
    let r2 = Math.random();
    if (r1 + r2 > 1) {
      r1 = 1 - r1;
      r2 = 1 - r2;
    }
    return {
      x: A.x + r1 * (B.x - A.x) + r2 * (C.x - A.x),
      y: A.y + r1 * (B.y - A.y) + r2 * (C.y - A.y),
    };
  }

  return {
    x: SAFE_MARGIN_X + Math.random() * (MAP_WIDTH - 2 * SAFE_MARGIN_X),
    y: SAFE_MARGIN_Y + Math.random() * (MAP_HEIGHT - 2 * SAFE_MARGIN_Y),
  };
}
