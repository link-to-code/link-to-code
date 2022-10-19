import { AnyZodObject } from "zod";

/**
 * This function validates the request body object against a Zod schema
 *
 * @param {unknown} body The request body
 * @param {AnyZodObject} schema A zod schema
 */
export default function validateRequestBody(body: unknown, schema: AnyZodObject): void {
  schema.parse(body);
}
