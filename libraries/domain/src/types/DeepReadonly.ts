// credits Minko Gechev https://twitter.com/mgechev/status/1240178886979223552

type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export { DeepReadonlyObject, DeepReadonlyArray, DeepReadonly };
