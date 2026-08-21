import { useState } from "react"
import { motion } from "framer-motion"

/**
 * Regression test for issue #3315.
 *
 * Tiles use `drag` + `dragSnapToOrigin` + `layoutId` with absolute
 * `top`/`left` positioning. When two same-row tiles swap, React 19's
 * reorder reconciliation briefly unmounts and remounts the dragged tile.
 * The visual element's unmount used to call `value.stop()` on its owned
 * motion values, killing the in-flight dragSnapToOrigin animation and
 * leaving the drag transform stranded — so the tile would render at its
 * new layout position PLUS the drag offset.
 */

const TILES_PER_ROW = 3
const TILE_SIZE = 60
const GRID_SIZE = TILE_SIZE * TILES_PER_ROW

export const App = () => {
    const [tiles, setTiles] = useState<{ id: number }[][]>(() => {
        const t: { id: number }[][] = []
        for (let i = 0; i < TILES_PER_ROW; i++) {
            const r: { id: number }[] = []
            for (let j = 0; j < TILES_PER_ROW; j++) {
                r.push({ id: i * TILES_PER_ROW + j })
            }
            t.push(r)
        }
        return t
    })

    const handleDragEnd = (
        draggedPos: { x: number; y: number },
        info: { offset: { x: number; y: number } }
    ) => {
        const dropX = draggedPos.x + Math.round(info.offset.x / TILE_SIZE)
        const dropY = draggedPos.y + Math.round(info.offset.y / TILE_SIZE)
        if (
            dropX < 0 ||
            dropX >= TILES_PER_ROW ||
            dropY < 0 ||
            dropY >= TILES_PER_ROW ||
            (draggedPos.x === dropX && draggedPos.y === dropY)
        ) {
            return
        }
        const newTiles = tiles.map((row) => [...row])
        newTiles[dropY][dropX] = tiles[draggedPos.y][draggedPos.x]
        newTiles[draggedPos.y][draggedPos.x] = tiles[dropY][dropX]
        setTiles(newTiles)
    }

    return (
        <div style={{ padding: 50 }}>
            <div
                id="grid"
                data-tile-state={tiles
                    .map((row) => row.map((t) => t.id).join(","))
                    .join("|")}
                style={{
                    border: "solid 1px black",
                    width: GRID_SIZE,
                    height: GRID_SIZE,
                    position: "relative",
                }}
            >
                {tiles.map((r, y) =>
                    r.map((tile, x) => (
                        <Tile
                            position={{ x, y }}
                            tile={tile}
                            key={tile.id}
                            id={tile.id}
                            onDragEnd={handleDragEnd}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

function Tile({
    tile,
    position,
    id,
    onDragEnd,
}: {
    tile: { id: number }
    position: { x: number; y: number }
    id: number
    onDragEnd: (
        pos: { x: number; y: number },
        info: { offset: { x: number; y: number } }
    ) => void
}) {
    const [isDragging, setIsDragging] = useState(false)
    return (
        <motion.div
            data-testid={`tile-${id}`}
            style={{
                position: "absolute",
                border: "solid 1px black",
                width: TILE_SIZE,
                height: TILE_SIZE,
                top: position.y * TILE_SIZE,
                left: position.x * TILE_SIZE,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                zIndex: isDragging ? 1 : 0,
            }}
            layoutId={String(tile.id)}
            onAnimationComplete={() => setIsDragging(false)}
            onAnimationStart={() => setIsDragging(true)}
            drag
            dragSnapToOrigin
            onDragEnd={(_, info) => onDragEnd(position, info)}
            whileDrag={{ zIndex: 1 }}
        >
            {id}
        </motion.div>
    )
}
