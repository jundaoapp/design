import glob from "glob";
import { fileURLToPath } from "node:url";
import { performance } from "perf_hooks";
import fs from "fs";

const startTime = performance.now();

console.log("\x1b[36mPatching build...\x1b[0m");

glob
	.sync("dist_temp/source/assets/components/**/index-*.css")
	.map((file) => fileURLToPath(new URL(file, import.meta.url)))
	.map((filepath) => {
		const path = `./dist/source/${/(?<=dist_temp\/source\/assets\/components\/)\w+/.exec(
			filepath,
		)}`;

		fs.copyFileSync(filepath, `${path}/index.css`);
		console.log(
			`\x1b[34mCopied\x1b[0m  ./${/dist_temp\/source\/assets\/components\/.+/.exec(
				filepath,
			)}`,
			`-> ${path}/index.css`,
		);
	});

glob
	.sync("dist_temp/source/assets/remixicon-*")
	.map((file) => fileURLToPath(new URL(file, import.meta.url)))
	.map((filepath) => {
		const filename = /remixicon-\w+\.\w+/.exec(filepath);
		const path = `./dist/source/style/${filename}`;

		fs.copyFileSync(filepath, path);
		console.log(
			`\x1b[34mCopied\x1b[0m  ./${/dist_temp\/source\/assets\/.+/.exec(
				filepath,
			)} -> ${path}`,
		);
	});

glob
	.sync("dist/source/**/*.jsx")
	.map((file) => fileURLToPath(new URL(file, import.meta.url)))
	.map((filepath) => {
		const data = fs.readFileSync(filepath, "utf8");
		fs.writeFileSync(filepath, data.replaceAll('index.scss";', 'index.css";'));
		console.log(
			`\x1b[34mUpdated\x1b[0m ./${/dist\/source\/.+/.exec(
				filepath,
                )} \x1b[35mimport scss\x1b[0m -> \x1b[35mcss\x1b[0m`,
		);
	});

glob
	.sync("dist/types/**/*.d.ts")
	.map((file) => fileURLToPath(new URL(file, import.meta.url)))
	.map((filepath) => {
		const data = fs.readFileSync(filepath, "utf8");
		fs.writeFileSync(filepath, data.replaceAll('import "./index.scss";\n', ""));
		console.log(
			`\x1b[34mUpdated\x1b[0m ./${/dist\/types\/.+/.exec(
				filepath,
                )} \x1b[35mimport scss\x1b[0m -> \x1b[31m✗\x1b[0m`,
		);
	});

fs.rmSync("dist_temp/", { recursive: true, force: true });
console.log("\x1b[34mDeleted\x1b[0m ./dist_temp/");

const endTime = performance.now();

console.log(`\x1b[36mPatched in ${Math.round(endTime - startTime)}ms\x1b[0m`);
