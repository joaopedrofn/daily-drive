import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import type { ApiContext } from "./types";
import { errorHandler } from "./middleware/error-handler";
import { jsonSuccess } from "./response";

const app = new Hono<ApiContext>().basePath("/api");

app.use("*", errorHandler);
app.use("*", logger());
app.use(
  "*",
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.BETTER_AUTH_URL!]
        : ["http://localhost:3000"],
    credentials: true,
  }),
);

// app.on(["GET", "POST", "PUT", "DELETE", "PATCH"], "/auth/*", (c) => {
//   return auth.handler(c.req.raw);
// });

app.get("/health", (c) => {
  return jsonSuccess(c, {
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export default app;
export type AppType = typeof app;
