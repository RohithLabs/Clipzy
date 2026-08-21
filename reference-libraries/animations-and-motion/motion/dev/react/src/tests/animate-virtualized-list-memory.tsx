import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

/**
 * Reproduction harness for issue #3241: alleged memory leak when
 * scrolling animated motion.div items in a virtualized list.
 *
 * Mirrors the original sandbox structurally — each item is a motion.div
 * with `initial={{ opacity: 0 }}` / `animate={{ opacity: 1 }}` and 100
 * child divs to amplify any DOM-node leak.
 *
 * The harness automatically scrolls a sliding window of items every
 * 30ms (faster than the 300ms transition, so animations are routinely
 * interrupted mid-flight). Every motion.div is registered in a
 * FinalizationRegistry; `window.__leakStats` exposes mounted /
 * unmounted / still-alive counts.
 *
 * Open the page in Chrome with `--js-flags=--expose-gc`, let it cycle,
 * then run `for (let i=0;i<10;i++){window.gc();await new Promise(r=>
 * setTimeout(r,100))}` in DevTools and read `__leakStats`. With no
 * leak, `stillAlive` should equal the visible item count
 * (typically 3–4) plus a small number of GC stragglers.
 */

const ITEM_COUNT = 50
const ITEM_SIZE = 200
const VIEWPORT_HEIGHT = 400

declare global {
    interface Window {
        gc?: () => void
        __leakStats?: {
            mounted: number
            unmounted: number
            stillAlive: number
        }
    }
}

let registry: FinalizationRegistry<number> | null = null
const liveIds = new Set<number>()
let totalMounted = 0
let totalUnmounted = 0
let idCounter = 0

const updateStats = () => {
    window.__leakStats = {
        mounted: totalMounted,
        unmounted: totalUnmounted,
        stillAlive: liveIds.size,
    }
}

if (typeof FinalizationRegistry !== "undefined" && !registry) {
    registry = new FinalizationRegistry<number>((id) => {
        liveIds.delete(id)
        updateStats()
    })
}

const ListItem = ({
    index,
    style,
}: {
    index: number
    style: React.CSSProperties
}) => {
    const idRef = useRef<number>(0)
    const setRef = (el: HTMLDivElement | null) => {
        if (el && !idRef.current) {
            idRef.current = ++idCounter
            totalMounted++
            liveIds.add(idRef.current)
            registry?.register(el, idRef.current)
            updateStats()
        } else if (!el && idRef.current) {
            totalUnmounted++
            updateStats()
        }
    }

    return (
        <motion.div
            ref={setRef}
            className="virtual-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                ...style,
                padding: 10,
                margin: 5,
                border: "1px solid #ccc",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
            }}
        >
            <h3>Item {index}</h3>
            {Array.from({ length: 100 }, (_, i) => (
                <div key={i} />
            ))}
        </motion.div>
    )
}

export const App = () => {
    const [scrollTop, setScrollTop] = useState(0)
    const cycleRef = useRef(0)

    useEffect(() => {
        const id = setInterval(() => {
            cycleRef.current += 1
            const totalScroll = ITEM_COUNT * ITEM_SIZE - VIEWPORT_HEIGHT
            setScrollTop((s) => (s + ITEM_SIZE) % totalScroll)
        }, 30)
        return () => clearInterval(id)
    }, [])

    const startIndex = Math.floor(scrollTop / ITEM_SIZE)
    const endIndex = Math.min(
        ITEM_COUNT - 1,
        Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ITEM_SIZE)
    )

    const visible: number[] = []
    for (let i = startIndex; i <= endIndex; i++) visible.push(i)

    return (
        <div>
            <div id="leak-stats" style={{ fontFamily: "monospace" }}>
                cycle: {cycleRef.current} / mounted: {totalMounted} /
                unmounted: {totalUnmounted} / live: {liveIds.size}
            </div>
            <div
                id="scroll-container"
                style={{
                    height: VIEWPORT_HEIGHT,
                    width: 400,
                    border: "2px solid #646cff",
                    borderRadius: 8,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <div style={{ height: ITEM_COUNT * ITEM_SIZE }}>
                    {visible.map((i) => (
                        <ListItem
                            key={i}
                            index={i}
                            style={{
                                position: "absolute",
                                top: i * ITEM_SIZE,
                                left: 0,
                                right: 0,
                                height: ITEM_SIZE,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
