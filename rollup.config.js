import withSolid from "rollup-preset-solid";
import scss from "rollup-plugin-scss";

export default withSolid({
	input: "src/components/index.ts",
	targets: ["esm", "cjs"],
	plugins: [scss()],
});
