import { betterAuth } from "better-auth";
import Database from "bun:sqlite";
import { openAPI } from "better-auth/plugins"


export const auth = betterAuth({
    emailAndPassword: { enabled: true },
    database: new Database("./sqlite.db"),
    plugins: [
        openAPI()
    ],
    trustedOrigins: [
        'http://localhost:3024',
        'http://localhost:3003'
    ]

})
