import type { TextareaSection } from "@/types/section.types"

export function TextareaSectionPreview({ section }: { section: TextareaSection }) {
  return (
    <section>
      <h3 className="text-sm font-semibold" style={{ color: section.titleColor }}>
        {section.title}
      </h3>
      <p className="mt-2 text-xs leading-5" style={{ color: section.descriptionColor }}>
        {section.description}
      </p>
    </section>
  )
}
