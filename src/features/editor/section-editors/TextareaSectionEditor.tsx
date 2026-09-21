import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HexColorField } from "@/features/editor/components/HexColorField"
import { useEditor } from "@/features/editor/hooks/useEditor"
import type { TextareaSection } from "@/types/section.types"

export function TextareaSectionEditor({ section }: { section: TextareaSection }) {
  const { dispatch } = useEditor()
  const updateSection = (updates: Partial<TextareaSection>) =>
    dispatch({ type: "update-section", section: { ...section, ...updates } })

  return (
    <div className="mt-4 space-y-4">
      <label className="block text-xs text-muted-foreground">
        Title
        <Input
          value={section.title}
          onChange={(event) => updateSection({ title: event.target.value })}
          className="mt-2 text-foreground"
        />
      </label>
      <label className="block text-xs text-muted-foreground">
        Description
        <Textarea
          value={section.description}
          onChange={(event) => updateSection({ description: event.target.value })}
          className="mt-2 text-foreground"
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <HexColorField
          label="Title color"
          value={section.titleColor}
          onChange={(titleColor) => updateSection({ titleColor })}
        />
        <HexColorField
          label="Description color"
          value={section.descriptionColor}
          onChange={(descriptionColor) => updateSection({ descriptionColor })}
        />
      </div>
    </div>
  )
}
