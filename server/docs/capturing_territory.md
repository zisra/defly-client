# Client Handling of Shaded Regions and Dot Connections

This document describes how the client receives, parses, and renders shaded regions (territorial zones) and their associated line/dot connections. It is based on reverse-engineered client logic including opcode handling, polygon rendering, and zone tracking.

---

## Packet Opcodes

| Opcode | Description                         | Handler              |
| ------ | ----------------------------------- | -------------------- |
| `8`    | Add or update a zone (animated)     | `hv(view, true)`     |
| `20`   | Add or update a zone (no animation) | `hv(view, false)`    |
| `51`   | Full resynchronization of all zones | `(z) => { Uv(...) }` |

---

## Data Structures

| Variable | Description                         |
| -------- | ----------------------------------- |
| `bV`     | Map of `zoneId → zone` object       |
| `yV`     | Map of `lineId → line` object       |
| `RV`     | Map of `dotId → dot` object         |
| `C`      | `PIXI.Container` for zone rendering |
| `i`      | Spatial index for fast zone lookup  |

---

## Zone Parsing: `hv(view, animate)`

### Purpose

Parses a single shaded region from a packet (`opcode 8` or `20`) and constructs a `PIXI.Graphics` polygon.

### Format

* `int32 zoneId`
* `int32 ownerId`
* `float32 areaScore`
* `int16 lineCount`
* `lineCount × (int32 lineId + uint8 sideFlag)`

  * `sideFlag`: 0 = left, 1 = right
* If `simplified` flag inferred (packet length check):

  * `int16 dotCount`
  * `dotCount × int32 dotId`
  * 4 × `float32`: minX, maxX, minY, maxY (bounding box)

### Process

* Removes old zone with the same ID if present
* Assigns `leftZoneId`/`rightZoneId` to involved lines
* Reconstructs polygon via dot positions
* Clips polygon to bounding box if simplified
* Draws polygon using `PIXI.Graphics.drawPolygon(...)`
* Adds to container `C` and index `i`
* Stores in `bV[zoneId]`

---

## Bulk Zone Sync: `case 51`

Performs a full refresh of the client zone state using three types of calls to `Uv(...)`.

### Packet Structure

```text
uint8 opcode = 51
uint16 A        → number of full zones (not simplified, not animated)
A × Uv(..., false, false)

uint16 B        → number of animated zones
B × Uv(..., false, true)

uint16 C        → number of simplified zones (uses dot list)
C × (uint8 sideFlag, Uv(..., true, sideFlag == 0))
```

### `Uv(z, offset, simplified, animate)`

* If `simplified === false`:

  * Behaves like `hv(...)`
* If `simplified === true`:

  * Uses dot ID list instead of line-path for polygon
  * Applies bounding box clipping
* If `animate === true`:

  * Alpha transition is applied via `anime(...)`

---

## Line → Zone Relationship

Each line rendered via `VD()` and added in `case 50` includes:

* `lineId`, `ownerId`
* `dot1Id`, `dot2Id`
* `leftZoneId`, `rightZoneId`

These fields are essential for:

* Coloring territory
* Associating lines with specific zones
* Detecting border ownership

Lines are stored in `yV[lineId]`.

---

## Zone Removal

* Handled by `Uv(...)` or `hv(...)` when a duplicate `zoneId` is received
* Lines referencing the removed zone have their `leftZoneId` or `rightZoneId` set to `0`
* `C.removeChild(...)` is called to remove from render
* Zone is removed from `bV[...]` and `i` (spatial index)

---

## Polygon Handling

The final polygon is stored in `zone.polygon = Float32Array` and rendered using `PIXI.Graphics.drawPolygon(...)`.

If simplified:

* The polygon is clipped to a bounding box using the `qv` (inside-rectangle test) and `mv` (intersection point) utilities.

---

## Zone Capture Effects

* Units inside zones are tested using `Cv(polygon, position)` (point-in-polygon test).
* Captured units are marked via `tv(z)` (alpha = 0.6, `isCaptured = true`)
* Uncaptured units are reset via `jv(z)`
* `av(z)` and `Bv(z)` perform this logic when zones or units update

---

## Rendering Considerations

* Zones are drawn beneath other game layers
* Color is determined by `Pl(ownerId)` or `Ll(ownerId)` depending on mode
* Simplified zones have lower visual fidelity but are more bandwidth-efficient
