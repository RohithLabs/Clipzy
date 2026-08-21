import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"
import { useEffect, useRef } from "react"

/**
 * Test for GitHub issue #3091
 *
 * LazyMotion (from `motion/react`) wrapping `m.div` from the `motion/react-m`
 * subpath. The LazyMotion-supplied renderer and feature definitions must reach
 * the m component even though the m components come from a separately-bundled
 * subpath, otherwise the m component renders nothing animated.
 */
export const App = () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const id = setTimeout(() => {
            if (ref.current && !ref.current.dataset.animationComplete) {
                ref.current.dataset.animationFailed = "true"
            }
        }, 1000)
        return () => clearTimeout(id)
    }, [])

    return (
        <LazyMotion features={domAnimation}>
            <m.div
                id="box"
                ref={ref}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                onAnimationComplete={() => {
                    if (ref.current) {
                        ref.current.dataset.animationComplete = "true"
                    }
                }}
                style={{
                    width: 100,
                    height: 100,
                    background: "red",
                }}
            />
        </LazyMotion>
    )
}
