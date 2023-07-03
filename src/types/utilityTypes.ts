type CallbackP1<T> = (t: T) => any;

type AnyCallback = (...args: any[]) => any;

export type { AnyCallback, CallbackP1, SizeUnits };
