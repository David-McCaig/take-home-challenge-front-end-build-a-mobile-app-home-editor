import { CarouselSectionPreview } from "@/features/preview/section-previews/CarouselSectionPreview"
import { CTASectionPreview } from "@/features/preview/section-previews/CTASectionPreview"
import { TextareaSectionPreview } from "@/features/preview/section-previews/TextareaSectionPreview"
import type { Section } from "@/types/section.types"

export function SectionRenderer({ section }: { section: Section }) {
  if (section.type === "carousel") return <CarouselSectionPreview section={section} />
  if (section.type === "textarea") return <TextareaSectionPreview section={section} />
  return <CTASectionPreview section={section} />
}
