import { describe, expect, it } from "vitest"

import { appConfigSchema } from "../../schemas/config.schema"
import { defaultConfig } from "./defaults"

describe("defaultConfig", () => {
  it("starts with one valid section of every supported type", () => {
    expect(appConfigSchema.safeParse(defaultConfig).success).toBe(true)
    expect(defaultConfig.sections.map(({ type }) => type)).toEqual([
      "carousel",
      "textarea",
      "cta",
    ])
  })
})
