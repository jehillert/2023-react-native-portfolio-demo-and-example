type CallbackP1<T> = (t: T) => any;

type AnyCallback = (...args: any[]) => any;

type VoidCallbackWithArgs = (...args: any[]) => void | Promise<void>;

type VoidCallback = () => void | Promise<void>;

type AnyReturnCallback = () => any | void;

export type {
  AnyCallback,
  AnyReturnCallback,
  CallbackP1,
  VoidCallback,
  VoidCallbackWithArgs,
};
