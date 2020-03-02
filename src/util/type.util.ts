export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

type Optional<T, K> = { [P in Extract<keyof T, K>]?: T[P] };
export type WithOptional<T, K extends keyof T> = T extends never
	? never
	: Omit<T, K> & Optional<T, K>;
