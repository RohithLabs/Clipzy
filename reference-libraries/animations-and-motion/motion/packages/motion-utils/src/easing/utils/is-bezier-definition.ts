import { BezierDefinition, Easing } from "../types"

/*#__NO_SIDE_EFFECTS__*/
export const isBezierDefinition = (
    easing: Easing | Easing[]
): easing is BezierDefinition =>
    Array.isArray(easing) && typeof easing[0] === "number"
