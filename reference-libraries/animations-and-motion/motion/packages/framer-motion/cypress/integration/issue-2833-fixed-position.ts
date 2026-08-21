/**
 * Regression test for #2833.
 *
 * React-select with menuPosition="fixed" was rendering in the wrong position
 * because motion.div applied will-change: transform automatically, which
 * establishes a CSS containing block for position: fixed descendants. The
 * auto will-change behaviour was removed but plain transform/filter/etc.
 * should also never be applied by default.
 */
const variants = [
    "plain",
    "while-hover",
    "while-tap",
    "animate-transform",
    "initial-transform",
]

describe("position: fixed children inside motion.div (#2833)", () => {
    for (const variant of variants) {
        it(`motion.div does not establish a containing block (variant=${variant})`, () => {
            cy.visit(`?test=issue-2833-fixed-position&variant=${variant}`)

            cy.get("#parent").then(($el) => {
                const cs = getComputedStyle($el[0] as HTMLElement)
                expect(cs.transform).to.equal("none")
                expect(cs.perspective).to.equal("none")
                expect(cs.filter).to.equal("none")
                // willChange of "transform"/"perspective"/"filter" would also
                // establish a containing block.
                expect(cs.willChange).to.equal("auto")
            })

            // The fixed-positioned child should land at viewport (10, 10),
            // not offset by the wrapper's 200px padding.
            cy.get("#fixed-child").then(($el) => {
                const rect = ($el[0] as HTMLElement).getBoundingClientRect()
                expect(rect.top).to.equal(10)
                expect(rect.left).to.equal(10)
            })
        })
    }
})
