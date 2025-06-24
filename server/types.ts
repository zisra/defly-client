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
}
