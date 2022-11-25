import { Title } from "@jundao/design";

export default {
	title: "Components/Typography/Title",
	argTypes: {
		children: { control: "text" },
		level: { control: { type: "select" }, options: [1, 2, 3, 4, 5, 6] },
	},
};

const Template = (props) => {
	return <>
        <Title {...props}/>
        <Title level={1}>h1. Jundao Design</Title>
        <Title level={2}>h2. Jundao Design</Title>
        <Title level={3}>h3. Jundao Design</Title>
        <Title level={4}>h4. Jundao Design</Title>
        <Title level={5}>h5. Jundao Design</Title>
        <Title level={6}>h6. Jundao Design</Title>
    </>;
};

export const Default = Template.bind({});
Default.args = { children: "Jundao Design" };
