import { useState } from "react"

import { Input } from "@/components/ui/input"
import { HexColorField } from "@/features/editor/components/HexColorField"
import { useEditor } from "@/features/editor/hooks/useEditor"
import { httpUrlSchema } from "@/schemas/section.schema"
import type { CTASection } from "@/types/section.types"

export function CTASectionEditor({ section }: { section: CTASection }) {
  const { dispatch } = useEditor()
  const [hrefDraft, setHrefDraft] = useState(section.href)
  const [showHrefError, setShowHrefError] = useState(false)
  const isHrefValid = httpUrlSchema.safeParse(hrefDraft).success
  const updateSection = (updates: Partial<CTASection>) =>
    dispatch({ type: "update-section", section: { ...section, ...updates } })

  function commitHref() {
    setShowHrefError(!isHrefValid)
    if (isHrefValid) updateSection({ href: hrefDraft })
  }

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
          value={hrefDraft}
          onChange={(event) => {
            setHrefDraft(event.target.value)
            setShowHrefError(false)
          }}
          onBlur={commitHref}
          aria-invalid={showHrefError}
          aria-describedby={showHrefError ? "cta-link-error" : undefined}
          className="mt-2 text-foreground"
        />
      </label>
      {showHrefError && (
        <p id="cta-link-error" className="-mt-3 text-xs text-destructive">
          Enter a valid HTTP or HTTPS URL.
        </p>
      )}
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
