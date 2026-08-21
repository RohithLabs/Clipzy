import { motion } from "framer-motion"
import { useRef, useLayoutEffect } from "react"

/**
 * Test page for issue #2829: When dragConstraints is set to a ref pointing
 * to a viewport-sized element (`position: absolute; inset: 0`), drag should
 * work across the full constraint area regardless of initial scroll position.
 *
 * The page is tall enough to scroll. We scroll the window in a layout effect
 * to simulate a page being refreshed after the user had scrolled, which is
 * the exact scenario the bug reporter described.
 */
export const App = () => {
    const constraintsRef = useRef<HTMLDivElement>(null)

    const params = new URLSearchParams(window.location.search)
    const initialScroll = Number(params.get("scroll") || "300")

    useLayoutEffect(() => {
        window.scrollTo(0, initialScroll)
    }, [initialScroll])

    return (
        <div style={{ height: 3000, margin: 0, padding: 0 }}>
            <div
                id="constraints"
                ref={constraintsRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 255, 0.1)",
                }}
            >
                <motion.div
                    id="box"
                    data-testid="draggable"
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0}
                    dragMomentum={false}
                    style={{
                        width: 50,
                        height: 50,
                        background: "red",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
            </div>
        </div>
    )
}
