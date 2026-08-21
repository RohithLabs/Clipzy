export function debounce<CB extends (...args: unknown[]) => void>(
  callback: CB,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined
  return function <T>(this: T, ...args: Parameters<typeof callback>): void {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      callback.apply(this, args)
    }, delay)
  }
}
