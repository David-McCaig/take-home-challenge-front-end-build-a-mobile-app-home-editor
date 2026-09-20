import { describe, expect, it } from "vitest"

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
