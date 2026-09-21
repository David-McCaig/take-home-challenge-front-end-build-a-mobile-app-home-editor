import { Input } from "@/components/ui/input"
import { HexColorField } from "@/features/editor/components/HexColorField"
import { useEditor } from "@/features/editor/hooks/useEditor"
import type { CTASection } from "@/types/section.types"

export function CTASectionEditor({ section }: { section: CTASection }) {
  const { dispatch } = useEditor()
  const updateSection = (updates: Partial<CTASection>) =>
    dispatch({ type: "update-section", section: { ...section, ...updates } })

  return (
    <div className="mt-4 space-y-4">
      <label className="block text-xs text-muted-foreground">
        Label
        <Input
          value={section.label}
          onChange={(event) => updateSection({ label: event.target.value })}
          className="mt-2 text-foreground"
        />
      </label>
      <label className="block text-xs text-muted-foreground">
        Link
        <Input
          type="url"
          value={section.href}
          onChange={(event) => updateSection({ href: event.target.value })}
          className="mt-2 text-foreground"
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <HexColorField
          label="Button color"
          value={section.buttonColor}
          onChange={(buttonColor) => updateSection({ buttonColor })}
        />
        <HexColorField
          label="Label color"
          value={section.textColor}
          onChange={(textColor) => updateSection({ textColor })}
        />
      </div>
    </div>
  )
}
