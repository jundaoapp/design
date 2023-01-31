import { createContext, useContext } from "solid-js";

type OverlayContextData = {
	level: number;
};
const OverlayContext = createContext({ level: 0 });

export function useOverlayContext(): [
	typeof OverlayContext.Provider,
	OverlayContextData,
] {
	return [OverlayContext.Provider, useContext(OverlayContext)];
}
