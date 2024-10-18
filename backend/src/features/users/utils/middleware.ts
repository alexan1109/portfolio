import type { MiddlewareHandler } from "hono";
import { getUser } from "./auth";
import { HTTPException } from "hono/http-exception";

export const authenticate = (): MiddlewareHandler => {
  return async function authenticate(c, next) {
    const user = getUser(c.req.raw, c.get("services").db);
    console.log('Authenticated user:', user);
    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized. User not found." });
    }
    c.set("user", user);
    await next();
  };
};