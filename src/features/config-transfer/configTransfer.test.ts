// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest"

import { exportConfig, serializeConfig } from "./exportConfig"
import { importConfig } from "./importConfig"

const config = {
  version: 1 as const,
  sections: [
    {
      id: "cta",
      type: "cta" as const,
      label: "Shop now",
      href: "https://example.com",
      buttonColor: "#000000",
      textColor: "#ffffff",
    },
  ],
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe("configuration transfer", () => {
  it("round-trips a valid configuration through formatted JSON", () => {
    const json = serializeConfig(config)

    expect(json).toContain("\n  \"version\"")
    expect(importConfig(json)).toEqual({ success: true, config })
  })

  it("downloads the formatted configuration as JSON", async () => {
    const link = document.createElement("a")
    const click = vi.spyOn(link, "click").mockImplementation(() => undefined)
    const createObjectURL = vi.fn((blob: Blob) => {
      expect(blob).toBeInstanceOf(Blob)
      return "blob:config"
    })
    const revokeObjectURL = vi.fn()
    vi.spyOn(document, "createElement").mockReturnValueOnce(link)
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL })

    exportConfig(config)

    const blob = createObjectURL.mock.calls[0][0]
    expect(blob.type).toBe("application/json")
    expect(await blob.text()).toBe(serializeConfig(config))
    expect(link.download).toBe("mobile-app-config.json")
    expect(click).toHaveBeenCalledOnce()
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:config")
  })

  it("distinguishes malformed JSON from an invalid configuration", () => {
    expect(importConfig("{")).toEqual({ success: false, reason: "malformed" })
    expect(importConfig('{"version":2,"sections":[]}')).toEqual({
      success: false,
      reason: "invalid",
    })
    expect(importConfig('{"version":1,"sections":[{"id":"x","type":"unknown"}]}')).toEqual({
      success: false,
      reason: "invalid",
    })
  })
})
