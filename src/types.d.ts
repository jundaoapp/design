type PickRequired<Type, Keys extends keyof Type> = Pick<Required<Type>, Keys>;
type RequiredChildren<Type extends { children?: unknown }> = Omit<
	Type,
	"children"
> &
	PickRequired<Type, "children">;
