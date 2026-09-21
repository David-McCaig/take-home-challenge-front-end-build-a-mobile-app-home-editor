import { Button } from "@/components/ui/button"
import type { CTASection } from "@/types/section.types"

export function CTASectionPreview({ section }: { section: CTASection }) {
  return (
    <Button
      type="button"
      className="h-auto min-h-10 w-full rounded-xl py-2"
      style={{ backgroundColor: section.buttonColor, color: section.textColor }}
    >
      <span className="min-w-0 whitespace-normal [overflow-wrap:anywhere]">{section.label}</span>
    </Button>
  )
}
