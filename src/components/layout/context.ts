import {
	JSXElement,
	Signal,
	createContext,
	createSignal,
	useContext,
} from "solid-js";

type LayoutContextData = {
	content: Signal<JSXElement | undefined>;
	sidebarLeft: Signal<JSXElement | undefined>;
	sidebarRight: Signal<JSXElement | undefined>;
	sidebarLeftOpen: Signal<boolean>;
	sidebarRightOpen: Signal<boolean>;
};
const LayoutContext = createContext<LayoutContextData>({
	content: createSignal<JSXElement>(),
	sidebarLeft: createSignal<JSXElement>(),
	sidebarRight: createSignal<JSXElement>(),
	sidebarLeftOpen: createSignal(false),
	sidebarRightOpen: createSignal(false),
});

export const LayoutContextProvider = LayoutContext.Provider as (props: {
	value?: Partial<LayoutContextData>;
	children: JSXElement;
}) => JSXElement;

export function useLayoutContext() {
	const context = useContext(LayoutContext);

	if (!context) {
		throw new Error(
			"[JDD]: useLayoutContext() must be used inside a <Layout/>",
		);
	}

	return context as LayoutContextData;
}
