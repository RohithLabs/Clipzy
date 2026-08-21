const path = require("path")
const { existsSync, readFileSync } = require("fs")
const pkg = require("../package.json")

const dist = path.join(__dirname, "..", "dist")

const file = readFileSync(path.join(dist, "dom.d.ts"), "utf8")

if (file.includes(`<reference types="react" />`)) {
    throw new Error("DOM bundle includes reference to React")
}

/**
 * Verify every "types" entry in package.json exports points to a file that
 * exists, that the bundle is self-contained (no relative imports of internal
 * chunks — #2900), and that it doesn't inline its own `declare class
 * MotionValue` (two inlined declarations have nominally-distinct `private
 * current` fields, breaking assignability between entry points like
 * `motion/react` and `motion/react-m` — #2887).
 */
for (const [name, entry] of Object.entries(pkg.exports)) {
    if (!entry || typeof entry !== "object" || !entry.types) continue

    const typesPath = path.join(__dirname, "..", entry.types)
    if (!existsSync(typesPath)) {
        throw new Error(
            `Types file for "${name}" (${entry.types}) does not exist`
        )
    }

    const contents = readFileSync(typesPath, "utf8")
    const relativeImport = contents.match(/from ['"](\.[^'"]+)['"]/)
    if (relativeImport) {
        throw new Error(
            `Types file for "${name}" (${entry.types}) contains a relative import (${relativeImport[1]}) — types must be bundled into a single self-contained file`
        )
    }

    if (/^declare class MotionValue\b/m.test(contents)) {
        throw new Error(
            `Types file for "${name}" (${entry.types}) inlines \`declare class MotionValue\` instead of importing it from motion-dom — this breaks MotionValue assignability across entry points (#2887)`
        )
    }
}

/**
 * Verify that the CJS m bundle does not declare its own React contexts. If it
 * does, `<LazyMotion>` from the main entry can't communicate with `<m.div>`
 * because each CJS bundle would have a separate `createContext()` instance
 * (#3091). The shared CJS chunk emitted from the rollup `cjs` build must
 * supply `LazyContext`, `MotionContext` etc. to both `index.js` and `m.js`.
 */
const cjsM = readFileSync(path.join(dist, "cjs", "m.js"), "utf8")
const ownLazyContext = cjsM.match(/createContext\(\{ strict: false \}\)/g)
if (ownLazyContext) {
    throw new Error(
        `CJS m bundle (dist/cjs/m.js) defines its own LazyContext (${ownLazyContext.length} time(s)) instead of importing it from the shared chunk — this breaks LazyMotion + m component interop across CJS bundles (#3091)`
    )
}
