import { MapShape } from "./types";

export const PORT = 8000;
export const TICK_RATE = 60;
export const TICK_INTERVAL_MS = 1_000 / TICK_RATE;

export const MAP_WIDTH = 50;
export const MAP_HEIGHT = 50;
export const SAFE_MARGIN_X = 0;
export const SAFE_MARGIN_Y = 0;
export const MAP_SHAPE: MapShape = MapShape.Hexagon;
export const DOT_MIN_DIST = 1;
export const DOT_OVERLAP_EPS = 0.6;

export const PLAYER_SIZE = 1;
export const COLLISION_RADIUS = 0.6;
export const MOVE_SPEED = 10;
export const COLLISION_THRESHOLD = COLLISION_RADIUS;

export const DOT_HP = 8;

export const BULLET_SPEED = 20;
export const BULLET_LIFETIME = 60; // ticks (1 second at 60 FPS)
export const BULLET_RADIUS = 0.3;
export const BULLET_COOLDOWN = 10;
