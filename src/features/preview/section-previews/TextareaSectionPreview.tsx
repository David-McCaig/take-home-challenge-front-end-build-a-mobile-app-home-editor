import type { TextareaSection } from "@/types/section.types"

export function TextareaSectionPreview({ section }: { section: TextareaSection }) {
  return (
    <section>
      <h3 className="break-words text-sm font-semibold" style={{ color: section.titleColor }}>
        {section.title}
      </h3>
      <p
        className="mt-1 whitespace-pre-wrap break-words text-xs leading-4"
        style={{ color: section.descriptionColor }}
      >
        {section.description}
      </p>
    </section>
  )
}
