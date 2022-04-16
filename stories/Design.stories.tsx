import { Text, Title, Space } from "@jundao/design";
import { For } from "solid-js";

export default { title: "Design" };

const colors = ["blue", "red", "orange", "yellow", "green", "purple", "magenta"];

export const Colors = (props) => {
	return <Space vertical align="left">
        <Title>Colors</Title>
        <Text>Jundao Design's colors are based on Ant Design. The primary color is blue and the primary brightness is<Text code>6</Text>.</Text>

        <div style={{
            display: "flex",
        }}>
            <For each={[...Array(13).keys()]} fallback={<div>Loading...</div>}>
                {(brightness) => (
                    <div style={{
                        "background-color": `var(--jdd-gray-${brightness})`,
                        height: "4rem",
                        width: "4rem",
                        color: brightness > 5 ? "white" : "var(--gray-12)",
                        padding: "1rem"
                    }}><Text bold style={{
                        color: brightness > 5 ? "white" : "var(--gray-12)"
                    }}>gray:</Text> {brightness}</div>
                )}
            </For>
        </div>

        <Space wrap>
            <For each={colors} fallback={<div>Loading...</div>}>
                {(color) => (
                    <div style={{
                        width: "6rem",
                    }}>
                        <For each={[...Array( 10).keys()]} fallback={<div>Loading...</div>}>
                            {(brightness) => (
                                <div style={{
                                    "background-color": `var(--jdd-${color}-${brightness})`,
                                    width: "100%",
                                    height: "2rem",
                                    color: brightness > 5 ? "white" : "var(--gray-12)",
                                    padding: "1rem"
                                }}><Text bold style={{
                                    color: brightness > 5 ? "white" : "var(--gray-12)"
                                }}>{color}:</Text> {brightness}</div>
                            )}
                        </For>
                    </div>
                )}
            </For>
        </Space>
    </Space>;
};
