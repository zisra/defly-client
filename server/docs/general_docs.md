# Client Engine Protocol and Rendering Logic

---

## 🔫 Shooting & Bullet Mechanics

### `tc()` – Send Tick Input to Server

* Sends `opcode 2` to server every \~20ms if input has changed.
* Payload:

  ```js
  uint8 opcode = 2
  uint8 flags           // bit 0: shooting, bit 1: moving, bit 2: ???
  float32 moveDirection // radians
  float32 aimDirection  // radians
  int16   latencyOffset
  float32 aimDistance
  ```
* Pushes input state into `Wz[]` for prediction replay.
* Triggered via frame loop and on input updates (`K.shooting`, `K.moving`, etc).

---

## 🧨 Bullet Visuals and Dot Destruction

### `Tv(z)` – Handle Dot Destruction

Triggered by packet (likely `opcode 14` or `15`):

* Removes dot `RV[dotId]` from scene and spatial grid `E`.
* Plays **debris animation** via `Hv(...)`
* Removes visual elements (health bar, shield, text).
* For all connected lines:

  * Removes from `yV[lineId]`
  * Removes zones (`leftZoneId`, `rightZoneId`) via `ov(...)`
  * Triggers `anime(...)` fadeout
  * Calls `Fv()` on surviving dot to auto-remove if isolated

**Fallback:** If dot does not exist, plays `Hv(...)` at given (x, y) from packet offset 9.

### `Hv(color, x, y, count, width, scale, velocity?, alpha?)`

* Spawns `count` number of debris sprites.
* Each with randomized direction and velocity.
* Fades and moves them using `anime(...)`.
* Adds to visual container `Z`.

---

### `$v(x, y, size)`

* Spawns a `"death-blast"` or `"shoot"` sprite.
* Scales from 0 to size, fades to 0 in 500ms.
* Used for **bullet or explosion visuals**.
* Appended to container `p`.

---

## 🧱 Zone Destruction & Filtering

### `iv(view, isX: boolean, isGreaterThan: boolean)`

Handles **removal of all zones, lines, and dots** based on map slicing filter (vertical or horizontal):

1. **Input:** Packet with a single `float32` threshold.
2. **Filter Function:** Returns `true` if:

   * For vertical: `dot.x >= threshold` or `<`
   * For horizontal: `dot.y >= threshold` or `<`
3. For each zone in `bV`:

   * If all dots/lines are outside the threshold:

     * Removes from `bV`, `C`, `i`
     * Clears line `leftZoneId` / `rightZoneId`
4. For each line in `yV`:

   * If both dots are outside view and not part of any zone:

     * Remove line
5. For each dot in `RV`:

   * If not part of any line and out of view:

     * Remove and delete

**Related opcodes:**

| Opcode | Description                             |
| ------ | --------------------------------------- |
| `16`   | Remove all zones where `dot.x < value`  |
| `17`   | Remove all zones where `dot.x >= value` |
| `18`   | Remove all zones where `dot.y < value`  |
| `19`   | Remove all zones where `dot.y >= value` |

---

## 🔥 Zone-Based Removal (Single Zone)

### `_v(view, fastKill = false)`

* `int32 zoneId` at offset 1
* Calls `ov(...)` with `zone`, animated, and optionally `fastKill`
* Used in:

  * `case 15`: Normal zone remove (animated)
  * `case 32`: Fast zone remove (possibly from respawn/rollback)

---

## 🧼 Zone Cleanup Helpers

### `ov(zone, animate = true, fastKill = false)`

* Removes a zone:

  * From `bV`, `C`, and spatial index `i`
* Triggers `anime(...)` fadeout unless `fastKill === true`
* Sets lines’ `leftZoneId` and `rightZoneId` to 0
* If lines are now isolated, cleans them up and potentially resets shields via `gP()`
* If zone belonged to local player and not `fastKill`, applies score penalty

---

## 🧹 Dot Auto-Cleanup

### `Fv(dot)`

* Deletes dot if:

  * Has no connected lines
  * Is out of view via `pv(dot)`
* Also removes shield, health bar, text
* Removes from `RV`, `E`, and `a` (PIXI container)

---

## 🎯 Tick-Based Reapplication of Input: `qP(z)`

* Applies predicted input (`Wz`) to local player using stored history
* Also handles tick increment (`lz++`)
* Calls `WP(...)`, `DP(...)` depending on prediction/rewind state
* Handles per-frame logic for:

  * Shield appearance
  * Input smoothing
  * Timers and countdowns

---

## 🧠 Miscellaneous

### `hc(opcode, string)`

* Sends a custom opcode `128` with a UTF-16 string payload
* Likely used for chat or command dispatch

---

## ✅ Summary Table

| Component       | Function     | Purpose / Side Effect                        |
| --------------- | ------------ | -------------------------------------------- |
| `tc()`          | Tick Send    | Sends opcode 2, movement + shooting          |
| `Hv()`          | Debris       | Adds animated debris particles               |
| `$v()`          | Blast Sprite | Spawns short-lived radial effect             |
| `Tv()`          | Dot Kill     | Handles full cleanup and visual feedback     |
| `ov()`          | Zone Remove  | Removes zone and related line cleanup        |
| `iv()`          | Map Filter   | Region-based zone/line/dot purging           |
| `Fv()`          | Dot Check    | Deletes off-screen dots with no links        |
| `DP()` / `WP()` | Movement     | Applies direction-based motion and collision |
| `_v()`          | Zone ID kill | Removes a zone by ID                         |
