import { Input } from "@/components/ui/input"
import type { CTASection } from "@/types/section.types"

export function CTASectionEditor({ section }: { section: CTASection }) {
  return (
    <div className="mt-4 space-y-4">
      <label className="block text-xs text-muted-foreground">
        Label
        <Input defaultValue={section.label} className="mt-2 text-foreground" />
      </label>
      <label className="block text-xs text-muted-foreground">
        Link
        <Input type="url" defaultValue={section.href} className="mt-2 text-foreground" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-muted-foreground">
          Button color
          <Input type="color" defaultValue={section.buttonColor} className="mt-2" />
        </label>
        <label className="text-xs text-muted-foreground">
          Label color
          <Input type="color" defaultValue={section.textColor} className="mt-2" />
        </label>
      </div>
    </div>
  )
}
