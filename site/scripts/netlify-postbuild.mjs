/**
 * Append X-Robots-Tag for Netlify deploy-preview / branch-deploy builds.
 * Production (CONTEXT=production) stays indexable — no header added.
 */
import fs from "node:fs";
import path from "node:path";

const context = process.env.CONTEXT || "";
const forced =
  process.env.VITE_SITE_NOINDEX === "true" || process.env.VITE_LEGAL_PREVIEW === "true";
const isNonProduction =
  forced || context === "deploy-preview" || context === "branch-deploy";

if (!isNonProduction) {
  console.log(`[netlify-postbuild] CONTEXT=${context || "(unset)"} — indexable (no X-Robots-Tag)`);
  process.exit(0);
}

const headersPath = path.join("dist", "_headers");
if (!fs.existsSync(headersPath)) {
  console.warn(`[netlify-postbuild] missing ${headersPath}; skip X-Robots-Tag`);
  process.exit(0);
}

const marker = "X-Robots-Tag: noindex, nofollow";
const current = fs.readFileSync(headersPath, "utf8");
if (current.includes(marker)) {
  console.log(`[netlify-postbuild] X-Robots-Tag already present`);
  process.exit(0);
}

fs.appendFileSync(
  headersPath,
  `\n# Non-production deploy — keep out of search indexes\n/*\n  ${marker}\n`,
);
console.log(
  `[netlify-postbuild] appended X-Robots-Tag for CONTEXT=${context || "env-forced"}`,
);
