import Elysia from "elysia"

import { HttpException } from "@root/shared/error"

export const miniAppAuth = new Elysia({
  name: "Plugin.MiniAppAuth"
}).onRequest(({ request }) => {
  const initData = request.headers.get("Bearer")

  if (!initData) throw HttpException.Unauthorized("???")
})
