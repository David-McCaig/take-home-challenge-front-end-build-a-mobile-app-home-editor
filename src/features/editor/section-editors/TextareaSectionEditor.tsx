import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function TextareaSectionEditor() {
  return (
    <div className="mt-4 space-y-4">
      <label className="block text-xs text-muted-foreground">
        Title
        <Input defaultValue="Find your next escape" className="mt-2 text-foreground" />
      </label>
      <label className="block text-xs text-muted-foreground">
        Description
        <Textarea defaultValue="Thoughtfully curated inspiration for wherever you want to go next." className="mt-2 text-foreground" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-muted-foreground">
          Title color
          <Input type="color" defaultValue="#111111" className="mt-2" />
        </label>
        <label className="text-xs text-muted-foreground">
          Description color
          <Input type="color" defaultValue="#737373" className="mt-2" />
        </label>
      </div>
    </div>
  )
}
