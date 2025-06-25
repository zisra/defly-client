import {
  MAP_HEIGHT,
  MAP_SHAPE,
  MAP_WIDTH,
  SAFE_MARGIN_X,
  SAFE_MARGIN_Y,
  TICK_INTERVAL_MS,
} from "./constants/game";

import { haveLine } from "./game/geometry";
import { clients, handlePlayerCollisions, stepPlayer } from "./game/player";
import { sendTickPacket } from "./network/packets";
import { createWebSocketServer } from "./network/websocket";

export {
  haveLine,
  MAP_HEIGHT,
  MAP_SHAPE,
  MAP_WIDTH,
  SAFE_MARGIN_X,
  SAFE_MARGIN_Y,
};

let serverTick = 0;

function gameLoop() {
  // const broadcastFn = (buf: ArrayBuffer) => broadcastPacket(buf, clients);

  sendTickPacket(clients, serverTick, stepPlayer, handlePlayerCollisions);

  serverTick++;
}

// Server initialization
function main() {
  // Create and start WebSocket server
  createWebSocketServer(() => serverTick);

  // Start game loop
  setInterval(gameLoop, TICK_INTERVAL_MS);

  console.log("Game server started successfully!");
}

main();
