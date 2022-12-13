import { Text, Title, Space, Divider } from "@jundao/design";
import { For } from "solid-js";

export default { title: "Design" };

const colors = [
	"gray",
	"blue",
	"red",
	"orange",
	"yellow",
	"green",
	"purple",
	"magenta",
];

export const Colors = () => {
	return (
		<Space vertical align="start">
			<Title>Colors</Title>
			<Text>
				Jundao Design's colors are based on Ant Design. The primary color is
				blue and the primary brightness is<Text code>6</Text>.
			</Text>
			<Text>
				Colors are accessible as css variables{" "}
				<Text code>
					var(--jdd-{"{"}
					<Text mark>color</Text>
					{"}"}-{"{"}
					<Text mark>brightness</Text>
					{"}"})
				</Text>
				.
			</Text>

			<Divider />

			<style>
				{`
            body {
                --jdd-inline-border-color: var(--jdd-gray-13);
            }
            body.jdd-dark {
                --jdd-inline-border-color: var(--jdd-gray-1);
            }
            `}
			</style>

			<Space wrap vertical align="start">
				<For each={colors} fallback={<div>Loading...</div>}>
					{(color) => (
						<Space>
							<Text style={{ width: "5rem", "margin-bottom": "2rem" }}>
								{color}
							</Text>
							<For
								each={[...Array(color === "gray" ? 18 : 10).keys()]}
								fallback={<div>Loading...</div>}
							>
								{(brightness) => (
									<Space vertical>
										<div
											style={{
												"background-color": `var(--jdd-${color}-${
													brightness + 1
												})`,
												width: "3.5rem",
												height: "2.25rem",
												"border-radius": ".5rem",
												border:
													brightness === 5 && color !== "gray"
														? "2px solid var(--jdd-inline-border-color)"
														: "",
											}}
										/>

										<Text bold>{brightness + 1}</Text>
									</Space>
								)}
							</For>
						</Space>
					)}
				</For>
			</Space>
		</Space>
	);
};

export const Font = () => {
	return (
		<Space vertical align="start">
			<Title>Font</Title>
			<Text>
				Jundao Design uses the font <Text code>Inter</Text> for its UI and{" "}
				<Text code>JetBrains Mono</Text> as monospace.
			</Text>
			<Text>
				The base font size is assumed to be <Text code>16px</Text> and a line
				height of <Text code>1.5715</Text> based on the root font size.
			</Text>
		</Space>
	);
};
