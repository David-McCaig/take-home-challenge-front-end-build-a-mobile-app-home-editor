import { useId, useState } from "react"

import { Input } from "@/components/ui/input"

const hexColorPattern = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

export function HexColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const id = useId()
  const [{ draft, sourceValue }, setDraft] = useState({ draft: value, sourceValue: value })

  if (sourceValue !== value) setDraft({ draft: value, sourceValue: value })

  const currentDraft = sourceValue === value ? draft : value
  const isValid = hexColorPattern.test(currentDraft)
  const pickerValue = value.length === 4 ? value.replace(/([0-9a-f])/gi, "$1$1") : value

  function updateDraft(nextValue: string) {
    setDraft({ draft: nextValue, sourceValue: value })
    if (hexColorPattern.test(nextValue)) onChange(nextValue)
  }

  return (
    <div>
      <label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </label>
      <div className="mt-2 flex gap-2">
        <span className="relative w-10 shrink-0 overflow-hidden rounded-lg border focus-within:ring-3 focus-within:ring-ring/50">
          <span className="absolute inset-0" style={{ backgroundColor: value }} aria-hidden="true" />
          <Input
            type="color"
            value={pickerValue}
            onChange={(event) => updateDraft(event.target.value)}
            aria-label={`Choose ${label.toLowerCase()}`}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </span>
        <Input
          id={id}
          value={currentDraft}
          maxLength={7}
          spellCheck={false}
          onChange={(event) => updateDraft(event.target.value)}
          aria-invalid={!isValid}
          aria-describedby={!isValid ? `${id}-error` : undefined}
          className="min-w-0 font-mono text-foreground"
        />
      </div>
      {!isValid && (
        <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
          Enter a 3- or 6-digit hex color.
        </p>
      )}
    </div>
  )
}
