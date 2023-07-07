type CallbackP1<T> = (t: T) => any;

type AnyCallback = (...args: any[]) => any;
type VoidCallback<T> = (props: T) => void | ((props: T) => Promise<void>);

export type { AnyCallback, CallbackP1, VoidCallback };
