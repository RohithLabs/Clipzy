/**
 * Companion to the #3315 fix: exercise drag + dragSnapToOrigin alongside
 * AnimatePresence exit. The fix removes a synchronous `value.stop()` from
 * VisualElement.unmount and relies on a deferred auto-stop — this page
 * lets a Cypress run prove that AnimatePresence exit animations still
 * complete cleanly while a drag-driven motion-value animation is mid-flight
 * during the unmount.
 */

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const TILE_SIZE = 80

export const App = () => {
    const [show, setShow] = useState(true)

    return (
        <div style={{ padding: 60 }}>
            <button
                data-testid="toggle"
                onClick={() => setShow((s) => !s)}
                style={{ marginBottom: 20 }}
            >
                toggle
            </button>
            <div
                id="container"
                data-show={show ? "1" : "0"}
                style={{ position: "relative", width: 300, height: 300 }}
            >
                <AnimatePresence>
                    {show && (
                        <motion.div
                            data-testid="tile"
                            drag
                            dragSnapToOrigin
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: TILE_SIZE,
                                height: TILE_SIZE,
                                background: "#08f",
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
