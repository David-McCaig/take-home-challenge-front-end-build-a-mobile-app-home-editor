import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"

import {
  createCarouselSection,
  createCTASection,
  createTextareaSection,
} from "@/features/editor/defaults"
import { useEditor } from "@/features/editor/hooks/useEditor"
import type { Section } from "@/types/section.types"

const sectionOptions = [
  { label: "Carousel", accessibleLabel: "Add carousel section", create: createCarouselSection },
  { label: "Text", accessibleLabel: "Add text section", create: createTextareaSection },
  { label: "CTA", accessibleLabel: "Add call to action section", create: createCTASection },
]

function sectionLabel(section: Section) {
  switch (section.type) {
    case "carousel":
      return ["Carousel", `${section.images.length} images`]
    case "textarea":
      return ["Text", section.title || "Untitled"]
    case "cta":
      return ["CTA", section.label || "Unlabelled"]
    default:
      return section satisfies never
  }
}

export function WidgetTreePanel() {
  const { state, dispatch } = useEditor()

  return (
    <aside className="h-full rounded-2xl border p-4 xl:min-h-[45rem]">
      <p className="text-xs font-medium tracking-wide uppercase">Widget Tree</p>
      <h2 className="mt-1 text-base font-semibold">Home screen layers</h2>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {sectionOptions.map(({ label, accessibleLabel, create }) => (
          <button
            key={label}
            type="button"
            aria-label={accessibleLabel}
            onClick={() => dispatch({ type: "add-section", section: create() })}
            className="flex h-[3.75rem] flex-col items-center justify-center gap-1 rounded-lg border bg-background text-xs transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Plus className="size-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {state.config.sections.length === 0 && (
          <p className="rounded-xl border border-dashed p-4 text-center text-xs text-muted-foreground">
            No sections yet. Add one above.
          </p>
        )}
        {state.config.sections.map((section, index) => {
          const [name, detail] = sectionLabel(section)
          const accessibleName = `${name} section ${index + 1}`
          const selected = state.selectedSectionId === section.id

          return (
            <article
              key={section.id}
              className={`relative min-h-[5.75rem] rounded-xl p-3 ${
                selected ? "border-2 border-foreground bg-muted/40" : "bg-muted"
              }`}
            >
              <button
                type="button"
                aria-label={`Select ${accessibleName}`}
                aria-pressed={selected}
                onClick={() => dispatch({ type: "select-section", sectionId: section.id })}
                className="absolute inset-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
              />
              <div className="pointer-events-none relative flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium">{name}</h3>
                  <p className="mt-1 truncate text-xs text-muted-foreground">{detail}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Delete ${accessibleName}`}
                  onClick={() => dispatch({ type: "remove-section", sectionId: section.id })}
                  className="pointer-events-auto ml-auto rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                </button>
              </div>
              <div className="pointer-events-none relative mt-3 flex items-center justify-between border-t pt-2 text-muted-foreground">
                <span className="text-[0.65rem] font-medium tracking-wide uppercase">
                  Position
                </span>
                <div
                  role="group"
                  aria-label={`Move ${accessibleName}`}
                  className="pointer-events-auto flex overflow-hidden rounded-md border bg-background"
                >
                  <button
                    type="button"
                    aria-label={`Move ${accessibleName} up`}
                    className="flex size-7 items-center justify-center hover:bg-muted hover:text-foreground focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                  >
                    <ChevronUp className="size-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${accessibleName} down`}
                    className="flex size-7 items-center justify-center border-l hover:bg-muted hover:text-foreground focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                  >
                    <ChevronDown className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </aside>
  )
}
