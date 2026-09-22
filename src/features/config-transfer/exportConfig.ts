import type { AppConfig } from "@/types/config.types"

export function serializeConfig(config: AppConfig) {
  return JSON.stringify(config, null, 2)
}

export function exportConfig(config: AppConfig) {
  const url = URL.createObjectURL(
    new Blob([serializeConfig(config)], { type: "application/json" }),
  )
  const link = document.createElement("a")
  link.href = url
  link.download = "mobile-app-config.json"
  link.click()
  URL.revokeObjectURL(url)
}
