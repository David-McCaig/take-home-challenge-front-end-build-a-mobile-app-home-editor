import { describe, expect, it } from "vitest"

import { appConfigSchema } from "./config.schema"
import { carouselSectionSchema, ctaSectionSchema } from "./section.schema"

const carouselWithUrl = (url: string) => ({
  id: "carousel",
  type: "carousel",
  images: [{ id: "image", url }],
  aspectRatio: "landscape",
})

const ctaWithHref = (href: string) => ({
  id: "cta",
  type: "cta",
  label: "Shop now",
  href,
  buttonColor: "#000",
  textColor: "#fff",
})

describe("section URL validation", () => {
  it.each(["http://example.com", "https://example.com"])("accepts %s", (url) => {
    expect(carouselSectionSchema.safeParse(carouselWithUrl(url)).success).toBe(true)
    expect(ctaSectionSchema.safeParse(ctaWithHref(url)).success).toBe(true)
  })

  it.each(["javascript:alert(1)", "data:text/html,test", "ftp://example.com"])(
    "rejects %s",
    (url) => {
      expect(carouselSectionSchema.safeParse(carouselWithUrl(url)).success).toBe(false)
      expect(ctaSectionSchema.safeParse(ctaWithHref(url)).success).toBe(false)
    },
  )
})

describe("section ID validation", () => {
  it("rejects duplicate section IDs", () => {
    const section = ctaWithHref("https://example.com")

    expect(appConfigSchema.safeParse({ version: 1, sections: [section, section] }).success).toBe(
      false,
    )
  })

  it("rejects duplicate carousel image IDs", () => {
    const image = { id: "image", url: "https://example.com/image.jpg" }
    const carousel = { ...carouselWithUrl(image.url), images: [image, image] }

    expect(carouselSectionSchema.safeParse(carousel).success).toBe(false)
  })
})
