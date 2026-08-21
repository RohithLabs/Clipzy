// This file serves as an entry point for the package
import { Lenis } from './src/lenis'

// @ts-expect-error
globalThis.Lenis = Lenis
// @ts-expect-error
globalThis.Lenis.prototype = Lenis.prototype
