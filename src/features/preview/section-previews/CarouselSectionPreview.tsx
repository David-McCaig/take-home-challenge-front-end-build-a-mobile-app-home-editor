import { useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { CarouselSection } from "@/types/section.types"

const aspectRatioClasses: Record<CarouselSection["aspectRatio"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-video",
  square: "aspect-square",
}

function CarouselImagePreview({ url, index }: { url: string; index: number }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs text-muted-foreground">
        Image unavailable
      </span>
    )
  }

  return (
    <img
      src={url}
      alt={`Carousel item ${index + 1}`}
      onError={() => setFailed(true)}
      className="absolute inset-0 size-full object-cover"
    />
  )
}

export function CarouselSectionPreview({ section }: { section: CarouselSection }) {
  if (section.images.length === 0) {
    return <p className="rounded-2xl bg-muted p-6 text-center text-xs text-muted-foreground">No images</p>
  }

  return (
    <Carousel opts={{ loop: section.images.length > 1 }} aria-label="Image carousel">
      <CarouselContent className="-ml-0">
        {section.images.map((image, index) => (
          <CarouselItem key={image.id} className="pl-0">
            <div
              className={`relative overflow-hidden rounded-2xl bg-muted ${aspectRatioClasses[section.aspectRatio]}`}
            >
              <CarouselImagePreview key={image.url} url={image.url} index={index} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {section.images.length > 1 && (
        <>
          <CarouselPrevious className="left-2 bg-background/90" />
          <CarouselNext className="right-2 bg-background/90" />
        </>
      )}
    </Carousel>
  )
}
