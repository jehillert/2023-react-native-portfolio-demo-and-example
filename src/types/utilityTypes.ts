type CallbackP1<T> = (t: T) => any;

type AnyCallback = (...args: any[]) => any;

type SizeUnits = '%' | 'px';

export type { AnyCallback, CallbackP1, SizeUnits };
