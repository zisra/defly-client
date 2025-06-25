import { WebSocketServer } from "ws";
import { PORT, TICK_RATE } from "../constants/game";
import { Opcode, type PlayerPlus } from "../constants/types";
import {
  buildDotRemovePacket,
  buildLineRemovePacket,
  removePlayerGeometry,
} from "../game/geometry";
import { clients, getNextPlayerId, respawnPlayer } from "../game/player";
import { randomSpawn } from "../utils/randomSpawn";
import { handleBuildTowerPacket } from "./handlers";
import {
  broadcastPacket,
  buildPlayerInfoPacket,
  createGameInitPacket,
  handleInputPacket,
  parseLoginPacket,
  sendAllDots,
  sendAllLines,
} from "./packets";

export function createWebSocketServer(
  getServerTick: () => number,
): WebSocketServer {
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

          const id = getNextPlayerId();
          const pos = randomSpawn();

          const pl: PlayerPlus = {
            playerId: id,
            ...login,
            ...pos,
            sx: 0,
            sy: 0,
            lastInputTurn: 0,
            badge: 47,
            dead: false,
          };
          clients.set(ws, pl);

          /* a) tell everybody about the newcomer */
          broadcastPacket(buildPlayerInfoPacket(pl), clients);

          /* b) tell the newcomer about everybody already connected */
          for (const [, other] of clients)
            if (other.playerId !== pl.playerId)
              ws.send(buildPlayerInfoPacket(other));

          /* c) normal game-init packet */
          ws.send(createGameInitPacket(id, pos.x, pos.y));
          sendAllDots(ws);
          sendAllLines(ws);
          break;
        }

        case Opcode.Input: // 2
          handleInputPacket(ws, ab, clients, getServerTick(), TICK_RATE);
          break;

        case Opcode.BuildTower: // 16
          handleBuildTowerPacket(ws, ab, clients, getServerTick());
          break;

        case Opcode.Ping: // 99
          ws.send(Uint8Array.of(Opcode.Ping));
          break;

        case 4: {
          // client → server
          const pl = clients.get(ws);
          if (pl?.dead)
            respawnPlayer(
              pl,
              ws,
              createGameInitPacket,
              sendAllDots,
              sendAllLines,
            );
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

        const { dotIds, lineIds } = removePlayerGeometry(p.playerId);

        /* inform clients so the sprites vanish */
        if (dotIds.length > 0)
          broadcastPacket(buildDotRemovePacket(dotIds), clients);
        if (lineIds.length > 0)
          broadcastPacket(buildLineRemovePacket(lineIds), clients);
      }
      clients.delete(ws);
    });
  });

  return wss;
}
