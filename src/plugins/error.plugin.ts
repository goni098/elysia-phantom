import Elysia from "elysia"
import { isNil } from "lodash"

import { HttpException } from "@root/shared/error"

export const error = new Elysia({ name: "Plugin.Error" })
  .error({
    HTTP_EXCEPTION: HttpException
  })
  .onError({ as: "global" }, ({ code, error, set }) => {
    let message = error.message

    if (isNil(code)) {
      message = "internal error"
      console.error(error)
    } else if (code === "HTTP_EXCEPTION") set.status = error.code

    return {
      statusCode: code,
      message,
      cause: error.cause
    }
  })
