import { motion } from "framer-motion"

/**
 * Regression test for #2833.
 *
 * React-select with menuPosition="fixed" relies on the menu being positioned
 * relative to the viewport, not to its ancestors. CSS spec: an ancestor with
 * `transform`, `perspective`, `filter`, `backdrop-filter`, or `will-change`
 * (containing those properties) establishes a containing block for fixed
 * descendants — breaking that assumption.
 *
 * motion.div should not apply any of those by default, even when transform
 * animations are configured via animate/whileHover/whileTap.
 */
export const App = () => {
    const variant =
        new URLSearchParams(window.location.search).get("variant") ?? "plain"

    const child = (
        <div
            id="fixed-child"
            style={{
                position: "fixed",
                top: 10,
                left: 10,
                width: 50,
                height: 50,
                background: "red",
            }}
        />
    )

    let parent
    if (variant === "while-hover") {
        parent = (
            <motion.div id="parent" whileHover={{ scale: 1.1 }}>
                {child}
            </motion.div>
        )
    } else if (variant === "while-tap") {
        parent = (
            <motion.div id="parent" whileTap={{ scale: 0.9 }}>
                {child}
            </motion.div>
        )
    } else if (variant === "animate-transform") {
        parent = (
            <motion.div id="parent" animate={{ x: 0, y: 0 }}>
                {child}
            </motion.div>
        )
    } else if (variant === "initial-transform") {
        parent = (
            <motion.div
                id="parent"
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
            >
                {child}
            </motion.div>
        )
    } else {
        parent = <motion.div id="parent">{child}</motion.div>
    }

    return <div style={{ padding: 200 }}>{parent}</div>
}
