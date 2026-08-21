export function debounce<CB extends (...args: unknown[]) => void>(
  callback: CB,
  delay: number
) {
  let timer: number | undefined
  return function <T>(this: T, ...args: Parameters<typeof callback>) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      callback.apply(this, args)
    }, delay)
  }
}
