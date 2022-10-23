/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import omit from "lodash.omit";
import pick from "lodash.pick";

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

function isEntity<T>(entity: Entity<T>): boolean {
  return !!entity[EntityRef];
}

/**
 * Translate an entity to a plain object.
 * @param entity
 * @param transform Transforms the entity before returning the raw version. Changes must be made in an immutable way.
 * @returns Returns a plain mutable object.
 */
function toRaw<T>(entity: Entity<T>, transform: (entity: Entity<T>) => Entity<T> = (e) => e): T {
  const { [EntityRef]: ref, ...entityData } = transform(entity);

  return entityData as T;
}

/**
 * Translate an entity to a plain object, removing keys within the `omitKeys` param.
 * @param entity
 * @param omitKeys
 * @returns Returns a plain mutable object.
 */
function toRawOmit<T extends object | null | undefined, K extends keyof T>(
  entity: Entity<T>,
  omitKeys: K[] = []
): Omit<T, K> {
  const entityData = toRaw(entity);

  return omit(entityData, ...omitKeys) as Omit<T, K>;
}

/**
 * Translate an entity to a plain object, picking only the keys within the `pickKeys` param.
 * @param entity
 * @param pickKeys
 * @returns Returns a plain mutable object.
 */
function toRawPick<T extends object | null | undefined, K extends keyof T>(
  entity: Entity<T>,
  pickKeys: K[] = []
): Pick<T, K> {
  const entityData = toRaw(entity);

  return pick(entityData, ...pickKeys) as Pick<T, K>;
}

export { createEntityFactory, isEntity, toRaw, toRawOmit, toRawPick };
