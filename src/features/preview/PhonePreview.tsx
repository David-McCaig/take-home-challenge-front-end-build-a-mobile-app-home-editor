import { CarouselSectionPreview } from "@/features/carousel-section/CarouselSectionPreview"
import { CTASectionPreview } from "@/features/cta-section/CTASectionPreview"
import { TextareaSectionPreview } from "@/features/textarea-section/TextareaSectionPreview"

export function PhonePreview() {
  return (
    <div className="h-[33.75rem] w-full max-w-72 rounded-[2rem] border-4 bg-background p-2 shadow-xl">
      <div className="flex items-center justify-between border-b px-5 py-4 text-xs font-medium">
        <span>Home</span>
        <span className="size-2 rounded-full bg-foreground" aria-hidden="true" />
      </div>

      <div className="px-5 pt-5">
        <CarouselSectionPreview />
        <TextareaSectionPreview />
        <CTASectionPreview />
      </div>
    </div>
  )
}
