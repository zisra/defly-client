# Shooting and Bullet Collision Handling (Client-Side Specification)

## 1. Input → Shooting Packet (`opcode 2`)

### Sender: Client → Server

### Function: `tc()`

**Packet Structure (20 bytes):**

```
[0]   uint8   opcode = 2
[1]   uint8   flags (bitmask):
         bit 0: shooting
         bit 1: moving
         bit 2: special/unknown
[2–5] float32 moveDirection (radians)
[6–9] float32 aimDirection (radians)
[10–11] int16 latency offset (optional, default 0)
[12–15] float32 aimDistance
```

**Notes:**

* Called every \~20ms when `shooting`, `moving`, or direction changes.
* Shooting status: `K.shooting = true` when fire is triggered by player.
* `Wz[]` stores local prediction input for rollback during tick replay.

---

## 2. Bullet Creation

### Sender: Server → Client

### Presumed Opcode: `61` or custom (not shown directly)

### Structure (inferred):

```
[0]   uint8    opcode (likely 61)
[1–4] int32    bulletId
[5–8] float32  x (initial position)
[9–12] float32 y
[13–16] float32 vx (velocity x)
[17–20] float32 vy
[21–24] int32   ownerId
```

The client:

* Creates a bullet sprite with this data.
* Tracks it in `Uz[bulletId]`.
* Position is updated each tick using velocity and lifetime.

---

## 3. Bullet Rendering

### Related Visual Function: `$v(x, y, size)`

* Renders an animated radial sprite (`death-blast` or `shoot`) centered on `(x, y)`.
* Expands and fades to 0 over 500 ms.
* Used when bullet hits or explodes.

---

## 4. Bullet Death / Hit Effects

### Function: `Tv(z: DataView)`

Called when bullet collides with a dot (`RV[dotId]`) or expires.

#### Expected Packet Structure:

```
[0]   uint8    opcode
[1–4] int32    dotId
[5–8] int32    bulletId
```

* If the `dotId` exists:

  * Removes it from the scene and data model.
  * Triggers debris effect (`Hv(...)`) at dot location.
  * Cleans up any lines or zones connected to the dot.
  * If bullet data is available (`Uz[bulletId]`), adds directional debris offset.
* If the dot doesn't exist:

  * Fallback path checks for coordinates at offset 9–17 (x, y).
  * Triggers `Hv(...)` at that location for effect consistency.

---

## 5. Debris Effect (Visual)

### Function: `Hv(color, x, y, count, size, velocity, [offset], [alpha])`

* Spawns `count` debris particles with randomized spread.
* Uses `PIXI.Sprite(F.debris)` tinted by the owner's color.
* Applies animation: debris fades and moves using `anime(...)`.
* Offset (optional) adds a directional push (used from bullet's velocity).

---

## 6. Bullet Lifecycle

### Storage: `Uz[bulletId]`

Each bullet object contains:

* `position` (x, y)
* `sx`, `sy` (velocity components)
* `lifetime`: decreased per tick
* `endoflife`: flag set for fade-out animation

### Per-tick Update (handled in `WP(...)`)

* Bullet position is updated:

  ```js
  bullet.x += bullet.sx / 60;
  bullet.y += bullet.sy / 60;
  ```
* If nearing end-of-life:

  * Marked for visual fade and enlargement using `anime(...)`.
  * Removed if `lifetime <= 0`.

---

## 7. Bullet Collision with Dots

**Tested Per-Tick:**

Inside `WP(...)` → bullets are checked:

* Against **all dots** within spatial index `E` or `RV`
* If dot is not owned by the bullet shooter and intersects:

  * Applies collision effect (`cP(bullet, dot)`)
  * Bullet removed
  * Dot killed via `Tv(...)`
  * Visuals added via `Hv(...)`, `$v(...)`

---

## 8. Bullet Collision with Zones (Walls)

Also in `WP(...)`, bullets are checked against:

* `linePath` entries from `zone` objects
* If bullet intersects any enemy-owned line:

  * Bullet is deflected or destroyed
  * Position is reset with partial bounce via:

    ```js
    bullet.x = bullet.lastX + l.x * dV * -0.25;
    bullet.y = bullet.lastY + l.y * dV * -0.25;
    ```

---

## 9. Final Bullet Cleanup

When bullet is removed:

* `Uz[bulletId]` is deleted
* Bullet sprite is removed from container `o`
* Death particle may be added
* If the bullet’s creator is the local player:

  * Adds +10 score text (`Ic(...)`) at hit location

---

## Summary

| Operation           | Component         | Notes                                 |
| ------------------- | ----------------- | ------------------------------------- |
| Input packet send   | `tc()`            | Sends shooting + direction (opcode 2) |
| Bullet creation     | (server → client) | Presumed opcode 61                    |
| Collision with dot  | `Tv()`            | Bullet triggers dot death and visuals |
| Collision with line | `WP()`            | Reflects bullet or removes it         |
| Bullet update       | `WP()`            | Velocity applied per tick             |
| Debris effects      | `Hv(...)`         | Debris particles spread               |
| Visual blast        | `$v(...)`         | Circular animation when hit occurs    |
| Bullet storage      | `Uz[bulletId]`    | Contains position, velocity, lifetime |
