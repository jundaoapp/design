import withSolid from "rollup-preset-solid";
import styles from "rollup-plugin-styles";
import glob from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default [
	withSolid({
		input: "src/components/index.tsx",
		targets: ["esm", "cjs"],
		plugins: [
			styles({
				mode: "extract",
			}),
		],
	}),
	{
		input: Object.fromEntries(
			glob.sync("src/components/**/index.scss").map((file) => [
				// This remove `src/` as well as the file extension from each
				// file, so e.g. src/nested/foo.js becomes nested/foo
				path.relative(
					"src",
					file.slice(0, file.length - path.extname(file).length),
				),
				// This expands the relative paths to absolute paths, so e.g.
				// src/nested/foo becomes /project/src/nested/foo.js
				fileURLToPath(new URL(file, import.meta.url)),
			]),
		),
		output: {
			dir: "dist_temp/source",
		},
		plugins: [
			styles({
				mode: "extract",
			}),
		],
	},
];
