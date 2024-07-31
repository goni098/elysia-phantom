import { Elysia } from "elysia"

import { getOrCreateUser } from "./endpoints/get-or-create-user"
import { error } from "./plugins/error.plugin"

function main() {
  new Elysia()
    .use(error)
    .get("/", () => "Hello Elysia")
    .use(getOrCreateUser)
    .listen(3000, self => {
      console.log(`🦊 Elysia is running at ${self.hostname}:${self.port}`)
    })
}

export default main
