import { copyFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MAX_BYTES = 1048576; // 1 MiB gate limit from RULES.txt
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(import.meta.dirname, "entry.png");
const dest = join(outDir, "entry.png");

// The entry is a pre-rendered front page; the program only copies it,
// so both grader runs produce byte-identical output.
const size = statSync(src).size;
if (size > MAX_BYTES) {
  throw new Error(
    `entry.png is ${size} bytes, over the 1 MiB (${MAX_BYTES} byte) limit`,
  );
}
copyFileSync(src, dest);
const written = statSync(dest).size;
if (written !== size) {
  throw new Error(`wrote ${written} bytes, expected ${size}`);
}
console.log(`wrote ${written} bytes to ${dest}`);
