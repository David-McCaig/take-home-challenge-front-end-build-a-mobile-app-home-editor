export interface BaseSection {
  id: string
}

export interface CarouselImage {
  id: string
  url: string
}

export interface CarouselSection extends BaseSection {
  type: "carousel"
  images: CarouselImage[]
  aspectRatio: "portrait" | "landscape" | "square"
}

export interface TextareaSection extends BaseSection {
  type: "textarea"
  title: string
  description: string
  titleColor: string
  descriptionColor: string
}

export interface CTASection extends BaseSection {
  type: "cta"
  label: string
  href: string
  buttonColor: string
  textColor: string
}

export type Section = CarouselSection | TextareaSection | CTASection
