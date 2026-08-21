import { Easing } from "../types"

/*#__NO_SIDE_EFFECTS__*/
export const isEasingArray = (ease: any): ease is Easing[] => {
    return Array.isArray(ease) && typeof ease[0] !== "number"
}
