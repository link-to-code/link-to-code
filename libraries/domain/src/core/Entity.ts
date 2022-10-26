/* eslint-disable @typescript-eslint/no-unused-vars */
import omit from "lodash.omit";
import pick from "lodash.pick";
import cloneDeepWith from "lodash.cloneDeepWith";

import type { DeepReadonly } from "../types/DeepReadonly";

const EntityRef = Symbol();

/**
 * An immutable object that represents a domain entity.
 */
export type Entity<T> = DeepReadonly<T> & { readonly [EntityRef]: typeof EntityRef };

/**
 * Creates an Entity factory starting from a plain object factory function.
 * @param factory A factory that creates entities plain objects.
 * @returns A function that creates new entities using the provided factory.
 */
function createEntityFactory<F extends (...args: never[]) => unknown>(factory: F) {
  return (...args: Parameters<F>) => {
    const entityData = factory(...args);

    return {
      ...(typeof entityData === "object" ? entityData : {}),
      [EntityRef]: EntityRef,
    } as Entity<ReturnType<F>>;
  };
}

/**
 * Checks if a provided object is an entity.
 * @param entity
 * @returns Returns true if the object is an entity, otherwise false.
 */
function isEntity<T>(entity: unknown): entity is Entity<T> {
  return !!entity && typeof entity === "object" && !!(EntityRef in entity);
}

/**
 * Internally used by `toRaw` to remove readonly and Entity type in a recursive way and return a plain object.
 * Only useful for `recursiveUnwrap` option.
 */
type DeepUnwrapEntity<T> = T extends ReadonlyArray<infer R>
  ? DeepUnwrapEntityArray<R>
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
  ? T
  : T extends object
  ? DeepUnwrapEntityObject<T>
  : T;

type DeepUnwrapEntityArray<T> = Array<DeepUnwrapEntity<T>>;

type DeepUnwrapEntityObject<T> = Omit<
  {
    -readonly [P in keyof T]: DeepUnwrapEntity<T[P]>;
  },
  typeof EntityRef
>;

/**
 * Recursively translates an entity to a plain object.
 * @param entity
 * @param recursiveUnwrap If true recursively removes entities recursively
 * @returns Returns a deep clone of the entity as a plain mutable object.
 */
function toRaw<T>(entity: Entity<T>, recursiveUnwrap: true): DeepUnwrapEntity<Entity<T>>;
function toRaw<T>(entity: Entity<T>, recursiveUnwrap?: false): T;
function toRaw<T>(entity: Entity<T>, recursiveUnwrap = false): T | DeepUnwrapEntity<Entity<T>> {
  const { [EntityRef]: ref, ...entityData } = entity;

  if (recursiveUnwrap) {
    return cloneDeepWith(entityData, (value) => {
      if (isEntity(value)) {
        return toRaw(value);
      }
    }) as DeepUnwrapEntity<Entity<T>>;
  }

  return cloneDeepWith(entityData) as T;
}

/**
 * Creates a new entity off the provided one, omitting specific keys within the `omitKeys` param.
 * @param entity
 * @param omitKeys
 * @returns Returns a new entity (it's not a deep clone).
 */
function toOmit<T extends object | null | undefined, K extends keyof T>(
  entity: Entity<T>,
  omitKeys: K[] = []
): Entity<Omit<T, K>> {
  return omit(entity, ...omitKeys) as unknown as Entity<Omit<T, K>>;
}

/**
 * Creates a new entity off the provided one, picking specific keys within the `pickKeys` param.
 * @param entity
 * @param pickKeys
 * @returns Returns a new entity (it's not a deep clone).
 */
function toPick<T extends object | null | undefined, K extends keyof T>(
  entity: Entity<T>,
  pickKeys: K[] = []
): Entity<Pick<T, K>> {
  return pick(entity, ...pickKeys) as unknown as Entity<Pick<T, K>>;
}

export { createEntityFactory, isEntity, toRaw, toOmit, toPick };
