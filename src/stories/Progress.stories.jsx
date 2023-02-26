import { Progress, Space, Button, Icon } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/Progress",
	argTypes: {
		label: { control: "text" },
		value: { control: "number" },
		type: {
			control: { type: "select" },
			options: ["line", "circle"],
		},
		min: { control: "number" },
		max: { control: "number" },
		status: {
			control: { type: "select" },
			options: ["default", "active", "indeterminate", "success", "fail"],
		},
		successOnComplete: { control: "boolean" },
		steps: { control: "boolean" },
		showInfo: { control: "boolean" },
		statusIcon: { control: "boolean" },
		customColor: { control: "text" },
		mini: { control: "boolean" },
	},
};

const Template = (props) => {
	return <Progress {...props} />;
};

export const Default = Template.bind({});
Default.args = { value: 40 };

export const Active = Template.bind({});
Active.args = { value: 40, status: "active" };

export const Indeterminate = Template.bind({});
Indeterminate.args = { value: 40, status: "indeterminate" };

export const Success = Template.bind({});
Success.args = { value: 40, status: "success" };

export const Fail = Template.bind({});
Fail.args = { value: 40, status: "fail" };

const CircleTemplate = (props) => {
	return (
		<div style={{ width: "4rem" }}>
			<Progress {...props} />
		</div>
	);
};

export const Circle = CircleTemplate.bind({});
Circle.args = { value: 40, type: "circle" };

export const MinMax = Template.bind({});
MinMax.args = { value: 40, min: 20, max: 60 };

export const NoInfo = Template.bind({});
NoInfo.args = { value: 40, showInfo: false };

const MiniTemplate = (props) => {
	return (
		<Space align="center">
			<div style={{ width: "4rem" }}>
				<Progress {...props} />
			</div>
			<div style={{ width: "1rem" }}>
				<Progress type="circle" {...props} />
			</div>
		</Space>
	);
};

export const Mini = MiniTemplate.bind({});
Mini.args = { value: 40, mini: true };

export const NoStatusIcon = Template.bind({});
NoStatusIcon.args = { value: 100, statusIcon: false };

export const Label = Template.bind({});
Label.args = { value: 40, label: "Progress" };

export const Steps = Template.bind({});
Steps.args = { value: 4, max: 5, steps: true };

export const CustomColor = Template.bind({});
CustomColor.args = { value: 40, customColor: "var(--jdd-purple-6)" };

export const CustomStepsColor = Template.bind({});
CustomStepsColor.args = {
	value: 4,
	max: 5,
	steps: true,
	customColor: [
		"var(--jdd-blue-6)",
		"var(--jdd-orange-6)",
		"var(--jdd-purple-6)",
	],
};

export const Multiple = Template.bind({});
Multiple.args = {
	value: [40, 20, 30],
	customColor: [
		"var(--jdd-blue-6)",
		"var(--jdd-orange-6)",
		"var(--jdd-purple-6)",
	],
};

const DynamicTemplate = (props) => {
	const [value, setValue] = createSignal(40);

	return (
		<Space align="center">
			<Space vertical style={{ "flex-grow": 1 }}>
				<Progress value={value()} {...props} />
				<Progress
					value={[value(), 20, 10]}
					customColor={[
						"var(--jdd-blue-6)",
						"var(--jdd-orange-6)",
						"var(--jdd-purple-6)",
					]}
					{...props}
				/>
				<Progress value={Math.floor(value() / 10)} max={10} steps {...props} />
				<Progress value={Math.floor(value() / 20)} max={5} steps {...props} />
				<Space align="center">
					<div style={{ width: "4rem" }}>
						<Progress mini value={value()} {...props} />
					</div>
					<div style={{ width: "1rem" }}>
						<Progress mini type="circle" value={value()} {...props} />
					</div>
					<div style={{ width: "1rem" }}>
						<Progress
							type="circle"
							value={[value(), 20, 10]}
							mini
							customColor={[
								"var(--jdd-blue-6)",
								"var(--jdd-orange-6)",
								"var(--jdd-purple-6)",
							]}
							{...props}
						/>
					</div>
				</Space>
				<Space>
					<div style={{ width: "10rem" }}>
						<Progress value={value()} {...props} type="circle" />
					</div>

					<div style={{ width: "10rem" }}>
						<Progress
							type="circle"
							value={[value(), 20, 10]}
							customColor={[
								"var(--jdd-blue-6)",
								"var(--jdd-orange-6)",
								"var(--jdd-purple-6)",
							]}
							{...props}
						/>
					</div>
				</Space>
			</Space>
			<Button.Group>
				<Button
					onClick={() => setValue(value() + 10)}
					disabled={value() === 100}
				>
					<Icon icon="add" />
				</Button>
				<Button onClick={() => setValue(value() - 10)} disabled={value() === 0}>
					<Icon icon="subtract" />
				</Button>
			</Button.Group>
		</Space>
	);
};

export const Dynamic = DynamicTemplate.bind({});
