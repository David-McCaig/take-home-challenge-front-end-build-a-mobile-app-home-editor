import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react"

const sections = [
  { name: "Carousel", detail: "New Arrivals", selected: true },
  { name: "Text", detail: "Find your next escape" },
  { name: "CTA", detail: "Shop Now" },
]

export function WidgetTreePanel() {
  return (
    <aside className="h-full rounded-2xl border p-4 xl:min-h-[45rem]">
      <p className="text-xs font-medium tracking-wide uppercase">Widget Tree</p>
      <h2 className="mt-1 text-base font-semibold">Home screen layers</h2>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Carousel", "Add carousel section"],
          ["Text", "Add text section"],
          ["CTA", "Add call to action section"],
        ].map(([label, accessibleLabel]) => (
          <button
            key={label}
            type="button"
            aria-label={accessibleLabel}
            className="flex h-[3.75rem] flex-col items-center justify-center gap-1 rounded-lg border bg-background text-xs transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Plus className="size-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {sections.map(({ name, detail, selected }) => (
          <article
            key={name}
            className={`min-h-[5.75rem] rounded-xl p-3 ${
              selected ? "border-2 border-foreground bg-muted/40" : "bg-muted"
            }`}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="size-4 text-muted-foreground" aria-hidden="true" />
              <ChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
              <h3 className="text-sm font-medium">{name}</h3>
              <button
                type="button"
                aria-label={`Delete ${name} section`}
                className="ml-auto rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1 pl-[2.25rem] text-xs text-muted-foreground">{detail}</p>
            <div className="mt-2 flex gap-3 pl-1 text-muted-foreground">
              <button type="button" aria-label={`Move ${name} section up`} className="rounded-sm focus-visible:outline-2">
                <ChevronUp className="size-3.5" aria-hidden="true" />
              </button>
              <button type="button" aria-label={`Move ${name} section down`} className="rounded-sm focus-visible:outline-2">
                <ChevronDown className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </aside>
  )
}
