import { CarouselSectionEditor } from "@/features/editor/section-editors/CarouselSectionEditor"
import { CTASectionEditor } from "@/features/editor/section-editors/CTASectionEditor"
import { TextareaSectionEditor } from "@/features/editor/section-editors/TextareaSectionEditor"
import { useEditor } from "@/features/editor/hooks/useEditor"

export function WidgetEditorPanel() {
  const { state } = useEditor()
  const section = state.config.sections.find(({ id }) => id === state.selectedSectionId)

  return (
    <aside className="h-full rounded-2xl border p-4 sm:p-5 xl:min-h-[45rem]">
      <p className="text-xs font-medium tracking-wide uppercase">Widget Editor</p>
      {!section ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Select a section to edit it.
        </p>
      ) : (
        <div key={section.id}>
          <h2 className="mt-1 text-xl font-semibold">
            {section.type === "carousel"
              ? "Carousel"
              : section.type === "textarea"
                ? "Text"
                : "CTA"}
          </h2>
          {section.type === "carousel" && <CarouselSectionEditor section={section} />}
          {section.type === "textarea" && <TextareaSectionEditor section={section} />}
          {section.type === "cta" && <CTASectionEditor section={section} />}
        </div>
      )}
    </aside>
  )
}
