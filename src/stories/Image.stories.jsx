import { Image, Spinner } from "@jundao/design";

export default {
	title: "Components/Image",
	argTypes: {
		src: { control: "text" },
		alt: { control: "text" },
		fallback: { control: "text" },
		srcset: { control: "text" },
		shape: {
			control: { type: "select" },
			options: ["circle", "rounded", "square"],
		},
		loading: {
			control: { type: "select" },
			options: ["eager", "lazy"],
		},
		onLoadingStatusChange: { action: "onLoadingStatusChange" },
		fallbackDelay: { control: "number" },
	},
};

const Template = (props) => <Image {...props} />;

export const Default = Template.bind({});
Default.args = { src: "https://picsum.photos/300/200" };

export const Fallback = Template.bind({});
Fallback.args = {
	src: "https://broken-link",
	fallback: "Lorem Picsum (Fallback)",
	style: { width: "300px", height: "200px" },
};

export const Alt = Template.bind({});
Alt.args = {
	src: "https://picsum.photos/300/200",
	fallback: "Lorem Picsum (Fallback)",
	alt: "Lorem Picsum (Alt)",
	style: { width: "300px", height: "200px" },
};

export const FallbackDelay = Template.bind({});
FallbackDelay.args = {
	src: "https://broken-link",
	fallback: "Lorem Picsum (Fallback)",
	fallbackDelay: 1500,
	style: { width: "300px", height: "200px" },
};

export const CustomFallback = Template.bind({});
CustomFallback.args = {
	src: "https://broken-link",
	fallback: <Spinner />,
	style: { width: "300px", height: "200px" },
};

export const Circle = Template.bind({});
Circle.args = { src: "https://picsum.photos/200/200", shape: "circle" };

export const Square = Template.bind({});
Square.args = { src: "https://picsum.photos/300/200", shape: "square" };
