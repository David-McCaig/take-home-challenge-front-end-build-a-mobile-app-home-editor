import { CarouselSectionPreview } from "@/features/preview/section-previews/CarouselSectionPreview"
import { CTASectionPreview } from "@/features/preview/section-previews/CTASectionPreview"
import { TextareaSectionPreview } from "@/features/preview/section-previews/TextareaSectionPreview"
import type { Section } from "@/types/section.types"

export function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case "carousel":
      return <CarouselSectionPreview section={section} />
    case "textarea":
      return <TextareaSectionPreview section={section} />
    case "cta":
      return <CTASectionPreview section={section} />
    default:
      return section satisfies never
  }
}
