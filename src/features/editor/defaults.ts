import type { AppConfig } from "../../types/config.types"
import type {
  CarouselSection,
  CTASection,
  TextareaSection,
} from "../../types/section.types"
import { createId } from "../../utils/ids"

export const createCarouselSection = (): CarouselSection => ({
  id: createId(),
  type: "carousel",
  images: [
    {
      id: createId(),
      url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    },
    {
      id: createId(),
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    },
    {
      id: createId(),
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    },
  ],
  aspectRatio: "portrait",
})

export const createTextareaSection = (): TextareaSection => ({
  id: createId(),
  type: "textarea",
  title: "Find your next escape",
  description: "Thoughtfully curated inspiration for wherever you want to go next.",
  titleColor: "#111111",
  descriptionColor: "#737373",
})

export const createCTASection = (): CTASection => ({
  id: createId(),
  type: "cta",
  label: "Shop Now",
  href: "https://example.com/collections/new-arrivals",
  buttonColor: "#000000",
  textColor: "#ffffff",
})

export const defaultConfig: AppConfig = {
  version: 1,
  sections: [createCarouselSection(), createTextareaSection(), createCTASection()],
}
