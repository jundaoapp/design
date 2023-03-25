import "./index.scss";
import { processProps } from "../utilities";
import {
	Select as KobalteSelect,
	MultiSelect as KobalteMultiSelect,
	As,
	CollectionNode,
} from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { Button, Icon, Card, Text, Space } from "..";
import { SelectProps, MultiSelectProps } from ".";
import { Dynamic } from "solid-js/web";
import { Accessor, createMemo, JSXElement, Show } from "solid-js";
import { SelectValueComponentProps } from "@kobalte/core/dist/types/select";
import { MultiSelectValueComponentProps } from "@kobalte/core/dist/types/multi-select";

type AnySelect<Option> =
	| (SelectProps<Option> & {
			selectType: "select";
	  })
	| (MultiSelectProps<Option> & {
			selectType: "multi";
	  });

export function AnySelect<Option>(props: AnySelect<Option>) {
	const [local, others] = processProps({
		props,
		default: {
			size: "default",
			danger: false,
			invalid: false,
		},
		keys: [
			"size",
			"label",
			"type",
			"danger",
			"disabled",
			"autofocus",
			"required",
			"readonly",
			"open",
			"onChange",
			"placeholder",
			"options",
			"selectType",
			"errorMessage",
			"description",
			"invalid",
			"value",
			"defaultValue",
			"valueComponent",
		],
	});

	let ref!: HTMLButtonElement;
	if (local.autofocus) createAutofocus(() => ref);

	const label = createMemo(() => local.label);
	const description = createMemo(() => local.description);
	const errorMessage = createMemo(() => local.errorMessage);

	return (
		<Dynamic
			component={
				{
					select: KobalteSelect.Root,
					multi: KobalteMultiSelect.Root,
				}[local.selectType]
			}
			ref={ref}
			placeholder={local.placeholder}
			options={local.options}
			isDisabled={local.disabled}
			isRequired={local.required}
			isReadOnly={local.readonly}
			isOpen={local.open}
			value={local.value}
			defaultValue={local.defaultValue}
			onValueChange={local.onChange}
			validationState={local.invalid ? "invalid" : "valid"}
			// @ts-ignore: TS Can't infer dynamic component and this prop as compatible
			valueComponent={
				local.valueComponent === undefined
					? {
							select: (props: SelectValueComponentProps<Option>) =>
								props.item.rawValue,
							multi: (props: MultiSelectValueComponentProps<Option>) =>
								props.items
									.map((i) => i.rawValue)
									.sort()
									.join(", "),
					  }[local.selectType]
					: local.valueComponent
			}
			// @ts-ignore: TS Can't infer dynamic component and this prop as compatible
			itemComponent={(props: SelectValueComponentProps<Option>) => (
				<Dynamic
					component={
						{
							select: KobalteSelect.Item,
							multi: KobalteMultiSelect.Item,
						}[local.selectType]
					}
					item={props.item}
					class="item"
				>
					<Dynamic
						component={
							{
								select: KobalteSelect.ItemLabel,
								multi: KobalteMultiSelect.ItemLabel,
							}[local.selectType]
						}
						asChild
					>
						<As component={Text} class="label">
							{props.item.rawValue as JSXElement}
						</As>
					</Dynamic>
					<Dynamic
						component={
							{
								select: KobalteSelect.ItemIndicator,
								multi: KobalteMultiSelect.ItemIndicator,
							}[local.selectType]
						}
						asChild
					>
						<As component={Text} class="indicator">
							<Icon icon="check" />
						</As>
					</Dynamic>
				</Dynamic>
			)}
			asChild
		>
			<As
				component={Space}
				align={
					description() === undefined && errorMessage() === undefined
						? "center"
						: "start"
				}
			>
				<Show when={label()}>
					<Dynamic
						component={
							{
								select: KobalteSelect.Label,
								multi: KobalteMultiSelect.Label,
							}[local.selectType]
						}
					>
						<Show when={typeof label() === "string"} fallback={label()}>
							<Text>{label()}</Text>
						</Show>
					</Dynamic>
				</Show>

				<Space vertical>
					<Dynamic
						component={
							{
								select: KobalteSelect.Trigger,
								multi: KobalteMultiSelect.Trigger,
							}[local.selectType]
						}
						asChild
						{...others}
					>
						<As component={Button} class="select">
							<Dynamic
								component={
									{
										select: KobalteSelect.Value,
										multi: KobalteMultiSelect.Value,
									}[local.selectType]
								}
								class="value"
							/>
							<Dynamic
								component={
									{
										select: KobalteSelect.Icon,
										multi: KobalteMultiSelect.Icon,
									}[local.selectType]
								}
								asChild
							>
								<As component={Icon} icon="code" />
							</Dynamic>
						</As>
					</Dynamic>

					<Show when={description()}>
						<Dynamic
							component={
								{
									select: KobalteSelect.Description,
									multi: KobalteMultiSelect.Description,
								}[local.selectType]
							}
						>
							<Show
								when={typeof description() === "string"}
								fallback={description()}
							>
								<Text type="secondary" size="small">
									{description()}
								</Text>
							</Show>
						</Dynamic>
					</Show>

					<Show when={errorMessage()}>
						<Dynamic
							component={
								{
									select: KobalteSelect.ErrorMessage,
									multi: KobalteMultiSelect.ErrorMessage,
								}[local.selectType]
							}
						>
							<Show
								when={typeof errorMessage() === "string"}
								fallback={errorMessage()}
							>
								<Text type="danger" size="small">
									{errorMessage()}
								</Text>
							</Show>
						</Dynamic>
					</Show>
				</Space>
			</As>

			<Dynamic
				component={
					{
						select: KobalteSelect.Portal,
						multi: KobalteMultiSelect.Portal,
					}[local.selectType]
				}
			>
				<Dynamic
					component={
						{
							select: KobalteSelect.Content,
							multi: KobalteMultiSelect.Content,
						}[local.selectType]
					}
					asChild
				>
					<As
						component={Card}
						contrastBackground
						noPadding
						size="small"
						class="jdd select-content"
					>
						<KobalteSelect.Listbox />
					</As>
				</Dynamic>
			</Dynamic>
		</Dynamic>
	);
}
