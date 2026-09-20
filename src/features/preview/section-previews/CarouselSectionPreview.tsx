import { ChevronRight } from "lucide-react"

export function CarouselSectionPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"
        alt="Woman wearing a summer outfit"
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
        1 / 3
      </span>
    </div>
  )
}
