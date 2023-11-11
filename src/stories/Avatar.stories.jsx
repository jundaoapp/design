import { Avatar, Link as LinkComp, Space } from "@jundao/design";
import { action } from "@storybook/addon-actions";

// Solid Icons get treeshaken by mistake
function RiUserFacesUser3Fill(props) {
	return (
		<svg
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style="overflow: visible; color: currentcolor;"
			height="1em"
			width="1em"
		>
			<path
				fill="currentColor"
				d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2Zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
			/>
		</svg>
	);
}

export default {
	title: "Components/Avatar",
	argTypes: {
		alt: { control: "text" },
		size: {
			control: { type: "select" },
			options: ["small", "default", "large"],
		},
		shape: {
			control: { type: "select" },
			options: ["circle", "square"],
		},
		src: { control: "text" },
	},
};

const Template = (props) => <Avatar {...props} />;

export const Default = Template.bind({});
Default.args = { alt: "U" };

export const Square = Template.bind({});
Square.args = { alt: "U", shape: "square" };

export const Icon = Template.bind({});
Icon.args = { alt: "User", icon: <RiUserFacesUser3Fill title="User" /> };

export const Small = Template.bind({});
Small.args = { size: "small", alt: "U" };

export const Large = Template.bind({});
Large.args = { size: "large", alt: "U" };

export const Image = Template.bind({});
Image.args = {
	alt: "User",
	src: "https://avatars.githubusercontent.com/u/33844379?v=4",
};

const GroupTemplate = (props) => (
	<Space vertical align="start" size="large">
		<Avatar.Group size={props.size}>
			<For each={[...Array(10).keys()]} shape={props.shape}>
				{() => <Avatar {...props} />}
			</For>
		</Avatar.Group>

		<Avatar.Group max={4} size={props.size} shape={props.shape}>
			<For each={[...Array(10).keys()]}>{() => <Avatar {...props} />}</For>
		</Avatar.Group>

		<Avatar.Group max={4} overlap={false} size={props.size} shape={props.shape}>
			<For each={[...Array(10).keys()]}>{() => <Avatar {...props} />}</For>
		</Avatar.Group>
	</Space>
);

export const Group = GroupTemplate.bind({});
Group.args = { alt: "U" };

const LinkTemplate = (props) => (
	<Space vertical align="start" size="large">
		<LinkComp href="#">
			<Avatar {...props} />
		</LinkComp>

		<Avatar.Group max={4} size={props.size} shape={props.shape}>
			<For each={[...Array(10).keys()]}>
				{() => (
					<LinkComp href="#">
						<Avatar {...props} />
					</LinkComp>
				)}
			</For>
		</Avatar.Group>
	</Space>
);

export const Link = LinkTemplate.bind({});
Link.args = { alt: "U" };

const MoreTemplate = (props) => (
	<Space vertical align="start" size="large">
		<LinkComp href="#">
			<Avatar {...props} />
		</LinkComp>

		<Avatar.Group max={4} size={props.size} shape={props.shape} moreSrc="#">
			<For each={[...Array(10).keys()]}>
				{() => (
					<LinkComp href="#">
						<Avatar {...props} />
					</LinkComp>
				)}
			</For>
		</Avatar.Group>
	</Space>
);

export const MoreLink = MoreTemplate.bind({});
MoreLink.args = { alt: "U" };

const MoreClickTemplate = (props) => (
	<Space vertical align="start" size="large">
		<LinkComp href="#">
			<Avatar {...props} />
		</LinkComp>

		<Avatar.Group
			max={4}
			size={props.size}
			shape={props.shape}
			moreOnClick={action("onClick")}
		>
			<For each={[...Array(10).keys()]}>
				{() => (
					<LinkComp href="#">
						<Avatar {...props} />
					</LinkComp>
				)}
			</For>
		</Avatar.Group>
	</Space>
);

export const MoreOnClick = MoreClickTemplate.bind({});
MoreOnClick.args = { alt: "U" };
