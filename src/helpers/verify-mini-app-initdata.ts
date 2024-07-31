import crypto from "crypto"
import { DateTime } from "luxon"

import { TELEGRAM_BOT_TOKEN } from "@root/shared/env"
import type { MiniAppUser } from "@root/types/MiniAppUser"

import { safeParse } from "./safe-parse"

// This follows this guild (https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)
export const verifyMiniAppInitData = (initData: string): MiniAppUser => {
  const TTL = 12

  let hash: string | undefined
  let authDate: DateTime | undefined
  let userRaw: string | undefined
  const pairs: string[] = []

  new URLSearchParams(initData).forEach((value, key) => {
    if (key === "hash") {
      hash = value
      return
    }

    if (key === "auth_date") {
      const authDateInSeconds = parseInt(value, 10)

      if (isNaN(authDateInSeconds)) throw new Error("invalid auth date")

      authDate = DateTime.fromSeconds(authDateInSeconds)
    }

    if (key === "user") userRaw = value

    pairs.push(`${key}=${value}`)
  })

  if (!hash) throw new Error("missing hash")

  if (!authDate) throw new Error("missing auth_date")

  if (!userRaw) throw new Error("missing user")

  if (authDate.plus({ hours: TTL }).toSeconds() < DateTime.now().toSeconds())
    throw new Error("expired")

  pairs.sort()

  const dataCheck = pairs.join("\n")

  const secret = crypto
    .createHmac("sha256", "WebAppData")
    .update(TELEGRAM_BOT_TOKEN)
    .digest()

  const decodedHash = crypto
    .createHmac("sha256", secret)
    .update(dataCheck)
    .digest("hex")

  if (hash !== decodedHash) throw new Error("invalid signature")

  const user = safeParse<{
    id: number
    is_premium?: boolean
    first_name: string
    username?: string
    last_name?: string
    photo_url?: string
  }>(userRaw)

  if (!user) throw new Error("invalid json input")

  const username = user.username ?? user.first_name + (user.last_name ?? "")

  return {
    telegramId: user.id,
    isPremium: user.is_premium ?? false,
    username,
    photoUrl: user.photo_url
  }
}
