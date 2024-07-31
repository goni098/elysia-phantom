import { Type } from "@sinclair/typebox/type"
import { Value } from "@sinclair/typebox/value"

const schema = Type.Object({
  DATABASE_URL: Type.String({ minLength: 1 }),
  TELEGRAM_BOT_TOKEN: Type.String({ minLength: 1 })
})

if (!Value.Check(schema, process.env)) {
  console.error(Value.Errors(schema, process.env).First())
  process.exit(1)
}

export const { DATABASE_URL, TELEGRAM_BOT_TOKEN } = process.env
