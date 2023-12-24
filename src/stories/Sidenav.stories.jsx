import { Sidenav, Space } from "@jundao/design";
import {
	RiBuildingsHomeFill,
	RiSystemSettings3Fill,
	RiSystemShieldFill,
	RiUserFacesAdminFill,
} from "solid-icons/ri";

export default {
	title: "Components/Sidenav",
	argTypes: {
		children: { control: "text" },
		onClick: { action: "onClick" },
		disabled: { control: "boolean" },
		current: { control: "boolean" },
	},
};

const Component = (props) => {
	return (
		<Sidenav
			transparentBackground={props.transparentBackground}
			style="width: 12rem;"
		>
			<Sidenav.Link onClick={props.onClick}>
				<RiBuildingsHomeFill /> {props.children} (button)
			</Sidenav.Link>
			<Sidenav.Link href="javascript:;">{props.children} (link)</Sidenav.Link>

			<Sidenav.Link current onClick={props.onClick}>
				{props.children} (button) (current)
			</Sidenav.Link>
			<Sidenav.Link current href="javascript:;">
				<RiSystemSettings3Fill /> {props.children} (link) (current)
			</Sidenav.Link>

			<Sidenav.Link disabled onClick={props.onClick}>
				{props.children} (button) (disabled)
			</Sidenav.Link>
			<Sidenav.Link disabled href="javascript:;">
				{props.children} (link) (disabled)
			</Sidenav.Link>

			<Sidenav.Group
				label={
					<>
						<RiSystemShieldFill /> Group
					</>
				}
			>
				<Sidenav.Link onClick={props.onClick}>
					<RiUserFacesAdminFill /> {props.children} (button)
				</Sidenav.Link>
				<Sidenav.Link href="javascript:;">{props.children} (link)</Sidenav.Link>

				<Sidenav.Group label="Sub Group">
					<Sidenav.Link onClick={props.onClick}>
						{props.children} (button)
					</Sidenav.Link>
					<Sidenav.Link href="javascript:;">
						{props.children} (link)
					</Sidenav.Link>
				</Sidenav.Group>
			</Sidenav.Group>

			<Sidenav.Group disabled label="Group (disabled)">
				<Sidenav.Link onClick={props.onClick}>
					{props.children} (button)
				</Sidenav.Link>
				<Sidenav.Link href="javascript:;">{props.children} (link)</Sidenav.Link>
			</Sidenav.Group>
		</Sidenav>
	);
};

const Template = (props) => {
	return (
		<Space>
			<Component {...props} />
			<Component transparentBackground {...props} />
		</Space>
	);
};

export const Default = Template.bind({});
Default.args = { children: "Link" };
