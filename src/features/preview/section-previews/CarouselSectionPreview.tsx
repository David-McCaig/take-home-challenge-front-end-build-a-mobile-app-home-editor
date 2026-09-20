import { ChevronRight } from "lucide-react"
import type { CarouselSection } from "@/types/section.types"

export function CarouselSectionPreview({ section }: { section: CarouselSection }) {
  const firstImage = section.images[0]

  if (!firstImage) {
    return <p className="rounded-2xl bg-muted p-6 text-center text-xs text-muted-foreground">No images</p>
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src={firstImage.url}
        alt="Carousel item 1"
        className="h-[10.25rem] w-full object-cover"
      />
      <button
        type="button"
        aria-label="Next image"
        className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 shadow-sm focus-visible:outline-2"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-2 py-1 text-[0.65rem]">
        1 / {section.images.length}
      </span>
    </div>
  )
}
