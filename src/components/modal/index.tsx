import "./index.scss";
import "../title/index.scss";
import {
    createEffect, createSignal,
    JSXElement, on,
    Show
} from "solid-js";
import {Card, Icon, Text} from "..";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Dialog } from "@kobalte/core";
import {DialogContentOptions} from "@kobalte/core/dist/types/dialog";
import {mergeRefs} from "@solid-primitives/refs";
import {Transition, TransitionGroup} from "solid-transition-group";

export type ModalProps = IntrinsicComponentProps<
	"div",
	{
		title?: JSXElement;
		open?: boolean;
        onOpenChange?: (open: boolean) => void;
        footer?: JSXElement;
    } & DialogContentOptions
>;

export function Modal(props: ModalProps) {
	const [local, others] = processProps({
		props,
		keys: [
            "open",
            "onOpenChange",
            "children",
            "title",
            "footer",
            "ref",
		],
    });

    const [forceMount, setForceMount] = createSignal(false);
    const [sourceElement, setSourceElement] = createSignal<Element>();

    let ref: HTMLDivElement | undefined;

    createEffect(on(() => local.open, (open) => {
        if (open === true) {
            setForceMount(true);

            if (ref !== undefined) {
                setSourceElement(document.activeElement);
                const rect = sourceElement()!.getBoundingClientRect();
                const x = Math.round(rect.x + rect.width / 2);
                const y = Math.round(rect.y + rect.height / 2);

                ref!.style.setProperty("--jdd-modal-transition-property", "none");
                ref.style.setProperty("--jdd-modal-position", `calc(${x}px - 50%), calc(${y}px - 50%)`);
                setTimeout(() => {
                    ref!.style.removeProperty("--jdd-modal-transition-property");
                    ref!.style.setProperty("--jdd-modal-position", `calc(${window.innerWidth / 2}px - 50%), calc(${window.innerHeight / 2}px - 50%)`);
                    }, 0)

            }
        } else {
            if (ref !== undefined) {
                const rect = sourceElement()!.getBoundingClientRect();
                const x = Math.round(rect.x + rect.width / 2);
                const y = Math.round(rect.y + rect.height / 2);

                ref.style.setProperty("--jdd-modal-position", `calc(${x}px - 50%), calc(${y}px - 50%)`);
            }
        }
    }))

	return (
            <Dialog.Root isModal={true} isOpen={local.open} onOpenChange={local.onOpenChange} forceMount={forceMount()}>
                <Dialog.Portal>
                    <Transition name="modal-animation" appear onAfterExit={() => setForceMount(false)}>
                        <Show when={local.open === true}>
                            <div class="jdd modal-wrapper">
                                <Dialog.Overlay class="jdd modal-overlay" />
                                <Dialog.Content ref={mergeRefs(el => (ref = el), local.ref)} class="jdd modal" {...others}>
                                    <Card>
                                        <div class="modal-header">
                                            <Show when={local.title}>
                                                <Dialog.Title class="jdd title jdd-typography">{local.title}</Dialog.Title>
                                            </Show>

                                            <Dialog.CloseButton class="jdd modal-close">
                                                <Icon icon="close"/>
                                            </Dialog.CloseButton>
                                        </div>
                                        <Dialog.Description class="modal-description">
                                            <Show when={typeof local.children === "string"} fallback={local.children}>
                                                <Text>{local.children}</Text>
                                            </Show>

                                            <Show when={local.footer}>
                                                <div class="modal-footer">{local.footer}</div>
                                            </Show>
                                        </Dialog.Description>
                                    </Card>
                                </Dialog.Content>
                            </div>
                        </Show>
                    </Transition>
                </Dialog.Portal>
        </Dialog.Root>
	);
}
