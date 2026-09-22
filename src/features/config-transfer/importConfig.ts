import { appConfigSchema } from "@/schemas/config.schema"
import type { AppConfig } from "@/types/config.types"

export type ImportResult =
  | { success: true; config: AppConfig }
  | { success: false; reason: "malformed" | "invalid" }

export function importConfig(json: string): ImportResult {
  let value: unknown

  try {
    value = JSON.parse(json)
  } catch {
    return { success: false, reason: "malformed" }
  }

  const result = appConfigSchema.safeParse(value)

  return result.success
    ? { success: true, config: result.data }
    : { success: false, reason: "invalid" }
}
