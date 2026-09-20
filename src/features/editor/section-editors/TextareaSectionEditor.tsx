import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { TextareaSection } from "@/types/section.types"

export function TextareaSectionEditor({ section }: { section: TextareaSection }) {
  return (
    <div className="mt-4 space-y-4">
      <label className="block text-xs text-muted-foreground">
        Title
        <Input defaultValue={section.title} className="mt-2 text-foreground" />
      </label>
      <label className="block text-xs text-muted-foreground">
        Description
        <Textarea defaultValue={section.description} className="mt-2 text-foreground" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-muted-foreground">
          Title color
          <Input type="color" defaultValue={section.titleColor} className="mt-2" />
        </label>
        <label className="text-xs text-muted-foreground">
          Description color
          <Input type="color" defaultValue={section.descriptionColor} className="mt-2" />
        </label>
      </div>
    </div>
  )
}
