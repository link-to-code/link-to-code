/* eslint-disable @typescript-eslint/no-unused-vars */
import omit from "lodash.omit";
import pick from "lodash.pick";
import cloneDeepWith from "lodash.cloneDeepWith";

import type { DeepReadonly } from "../types/DeepReadonly";

const MODEL_REF = Symbol();

/**
 * An immutable object that represents a model.
 */
export type Model<T> = DeepReadonly<T> & { readonly [MODEL_REF]: typeof MODEL_REF };

/**
 * Creates a model factory starting from a plain object factory function.
 * @param factory A factory that creates entities plain objects.
 * @returns A function that creates new entities using the provided factory.
 */
function createModelFactory<F extends (...args: never[]) => unknown>(factory: F) {
  return (...args: Parameters<F>) => {
    const modelData = factory(...args);

    return {
      ...(typeof modelData === "object" ? modelData : {}),
      [MODEL_REF]: MODEL_REF,
    } as Model<ReturnType<F>>;
  };
}

/**
 * Checks if a provided object is a model.
 * @param model
 * @returns Returns true if the object is a model, otherwise false.
 */
function isModel<T>(model: unknown): model is Model<T> {
  return !!model && typeof model === "object" && !!(MODEL_REF in model);
}

/**
 * Internally used by `toRaw` to remove readonly and model type in a recursive way and return a plain object.
 * Only useful for `recursiveUnwrap` option.
 */
type DeepUnwrapModel<T> = T extends ReadonlyArray<infer R>
  ? DeepUnwrapModelArray<R>
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
  ? T
  : T extends object
  ? DeepUnwrapModelObject<T>
  : T;

type DeepUnwrapModelArray<T> = Array<DeepUnwrapModel<T>>;

type DeepUnwrapModelObject<T> = Omit<
  {
    -readonly [P in keyof T]: DeepUnwrapModel<T[P]>;
  },
  typeof MODEL_REF
>;

/**
 * Recursively translates a model to a plain object.
 * @param model
 * @param recursiveUnwrap If true recursively removes entities recursively
 * @returns Returns a deep clone of the model as a plain mutable object.
 */
function toRaw<T>(model: Model<T>, recursiveUnwrap: true): DeepUnwrapModel<Model<T>>;
function toRaw<T>(model: Model<T>, recursiveUnwrap?: false): T;
function toRaw<T>(model: Model<T>, recursiveUnwrap = false): T | DeepUnwrapModel<Model<T>> {
  const { [MODEL_REF]: ref, ...modelData } = model;

  if (recursiveUnwrap) {
    return cloneDeepWith(modelData, (value) => {
      if (isModel(value)) {
        return toRaw(value);
      }
    }) as DeepUnwrapModel<Model<T>>;
  }

  return cloneDeepWith(modelData) as T;
}

/**
 * Creates a new model off the provided one, omitting specific keys within the `omitKeys` param.
 * @param model
 * @param omitKeys
 * @returns Returns a new model (it's not a deep clone).
 */
function toOmit<T extends object | null | undefined, K extends keyof T>(
  model: Model<T>,
  omitKeys: K[] = []
): Model<Omit<T, K>> {
  return omit(model, ...omitKeys) as unknown as Model<Omit<T, K>>;
}

/**
 * Creates a new model off the provided one, picking specific keys within the `pickKeys` param.
 * @param model
 * @param pickKeys
 * @returns Returns a new model (it's not a deep clone).
 */
function toPick<T extends object | null | undefined, K extends keyof T>(
  model: Model<T>,
  pickKeys: K[] = []
): Model<Pick<T, K>> {
  return pick(model, ...pickKeys) as unknown as Model<Pick<T, K>>;
}

export { createModelFactory, isModel, toRaw, toOmit, toPick };
