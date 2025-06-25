export enum MapShape {
  Square = 0,
  Hexagon = 1,
  Circle = 2,
}

export enum Opcode {
  Login = 1,
  Input = 2,
  Tick = 4,
  Ping = 99,
  InitOK = 2,
  BulletCreate = 13,
  BulletRemove = 14,
  DotCreate = 49,
  LineCreate = 50,
  BuildTower = 16,
  DotRemove = 8,
  LineRemove = 20,
}

export interface Player {
  playerId: number;
  username: string;
  sessionId: string;
  skin: number;
  badge: number;
  gamesPlayed: number;
  score: number;

  /* input state */
  shooting: boolean;
  moving: boolean;
  moveDirection: number;
  aimDirection: number;
  aimDistance: number;

  /* Physics */
  x: number;
  y: number;
  sx: number; // X-velocity
  sy: number; // Y-velocity

  lastInputTurn: number;
  lastShotTick?: number; // NEW: track last tick the player shot
}

export interface PlayerPlus extends Player {
  dead: boolean;
}

export interface Dot {
  id: number;
  owner: number;
  x: number;
  y: number;
  creationTick: number;
}

export interface Line {
  id: number;
  owner: number;
  a: number; // dotId 1
  b: number; // dotId 2
  leftZoneId: number;
  rightZoneId: number;
}

export interface Bullet {
  id: number;
  owner: number;
  x: number;
  y: number;
  sx: number;
  sy: number;
  lifetime: number;
  lastX: number;
  lastY: number;
}
