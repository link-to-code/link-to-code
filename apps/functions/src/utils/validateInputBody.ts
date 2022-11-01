import { AnyZodObject } from "zod";

/**
 * This function validates the input body object against a Zod schema
 *
 * @param {unknown} body The input body
 * @param {AnyZodObject} schema A zod schema
 */
export default function validateInputBody(body: unknown, schema: AnyZodObject): void {
  schema.parse(body);
}
