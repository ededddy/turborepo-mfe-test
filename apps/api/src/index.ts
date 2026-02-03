import { Hono } from 'hono'
import { CONSTANT } from "@repo/constants";
import { logger } from "hono/logger";
import { auth } from "@repo/auth/server";


const app = new Hono().basePath("/api")
app.use(logger())

// works simple better-auth
app.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

app.get('/', (c) => {
    return c.text(CONSTANT)
})

export default {
    port: process.env.TURBO_MFE_PORT,
    fetch: app.fetch
}
