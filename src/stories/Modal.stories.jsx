import { Modal, Button } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/Modal",
	argTypes: {
		title: { control: "text" },
		children: { control: "text" },
	},
};

const lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod aliquet purus eget feugiat. Fusce placerat maximus diam eu interdum. Aliquam sed quam at tortor interdum cursus. Nunc lacinia velit mi, sit amet tincidunt neque commodo quis. Nunc turpis augue, scelerisque sit amet luctus et, pharetra rhoncus diam. Proin dignissim enim quis risus placerat condimentum. Suspendisse vel cursus arcu. Suspendisse iaculis porttitor ipsum eget viverra. Vivamus lacus sem, convallis sit amet commodo in, venenatis in enim. Vivamus at convallis dui. Sed mauris diam, dapibus non lorem vitae, fermentum congue justo. Nulla facilisi. Phasellus id mauris vel metus consectetur ornare ac et enim. ";

const Template = (props) => {
    const [open, setOpen] = createSignal(false);


    return (
            <>
            <Button onPress={() => setOpen(true)} loading={open()}>Open Modal</Button>
            <Modal open={open()} onOpenChange={setOpen} {...props}/>
            </>
            );
};

export const Default = Template.bind({});
Default.args = { title: "Modal Title", children: lipsum };

const FooterTemplate = (props) => {
    const [open, setOpen] = createSignal(false);

    return (
            <>
            <Button onPress={() => setOpen(true)} loading={open()}>Open Modal</Button>
            <Modal open={open()} onOpenChange={setOpen} footer={
                <>
                <Button autofocus onPress={() => setOpen(false)}>Cancel</Button>
                <Button type="primary" danger onPress={() => setOpen(false)}>Delete</Button>
                </>
            } {...props}/>
            </>
            );
};

export const Footer = FooterTemplate.bind({});
Footer.args = { title: "Delete file", children: "Are you sure you want to delete this file?" };
