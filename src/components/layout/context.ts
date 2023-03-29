import {
	Accessor,
	createContext,
	createSignal,
	JSXElement,
	Signal,
	useContext,
} from "solid-js";

type LayoutContextData = {
	content: Signal<JSXElement | undefined>;
	sidebarLeft: Signal<JSXElement | undefined>;
	sidebarRight: Signal<JSXElement | undefined>;
};
const LayoutContext = createContext<LayoutContextData>({
	content: createSignal<JSXElement>(),
	sidebarLeft: createSignal<JSXElement>(),
	sidebarRight: createSignal<JSXElement>(),
});

export const LayoutContextProvider = LayoutContext.Provider;

export function useLayoutContext() {
	return useContext(LayoutContext);
}
