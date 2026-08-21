import { wrap } from "../../wrap"
import { Easing } from "../types"
import { isEasingArray } from "./is-easing-array"

/*#__NO_SIDE_EFFECTS__*/
export function getEasingForSegment(
    easing: Easing | Easing[],
    i: number
): Easing {
    return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing
}
