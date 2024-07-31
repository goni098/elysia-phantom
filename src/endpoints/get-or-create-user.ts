import Elysia from "elysia"

import { miniAppAuth } from "@root/plugins/mini-app-auth.plugin"

export const getOrCreateUser = new Elysia({
  name: "Handler.GetOrCreateUser"
})
  .use(miniAppAuth)
  .get("/users", () => {
    return 1
  })
