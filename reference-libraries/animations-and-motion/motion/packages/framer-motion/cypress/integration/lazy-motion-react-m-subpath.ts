describe("LazyMotion with m components from /m subpath (issue #3091)", () => {
    it("animates m.div from framer-motion/m inside LazyMotion from framer-motion", () => {
        cy.visit("?test=lazy-motion-react-m-subpath")
            .wait(500)
            .get("#box")
            .should(([$element]: any) => {
                expect($element.dataset.animationFailed).to.not.equal("true")
                expect($element.dataset.animationComplete).to.equal("true")
                expect(getComputedStyle($element).opacity).to.equal("1")
            })
    })
})
