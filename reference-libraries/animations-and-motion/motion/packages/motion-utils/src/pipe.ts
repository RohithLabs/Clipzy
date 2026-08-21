/**
 * Pipe
 * Compose other transformers to run linearily
 * pipe(min(20), max(40))
 * @param  {...functions} transformers
 * @return {function}
 */
export const pipe = (...transformers: Function[]) =>
    transformers.reduce((a, b) => (v: any) => b(a(v)))
