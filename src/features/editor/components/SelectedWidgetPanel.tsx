import { CarouselSectionEditor } from "@/features/carousel-section/CarouselSectionEditor"

export function SelectedWidgetPanel() {
  return (
    <aside className="h-full rounded-2xl border p-4 sm:p-5 xl:min-h-[45rem]">
      <p className="text-xs font-medium tracking-wide uppercase">Selected Widget</p>
      <h2 className="mt-1 text-xl font-semibold">Carousel</h2>
      <CarouselSectionEditor />
    </aside>
  )
}
