/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.
*/
/*#__NO_SIDE_EFFECTS__*/
export const progress = (from: number, to: number, value: number) => {
    const range = to - from
    return range ? (value - from) / range : 1
}
