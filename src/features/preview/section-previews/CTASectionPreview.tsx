import { Button } from "@/components/ui/button"
import type { CTASection } from "@/types/section.types"

export function CTASectionPreview({ section }: { section: CTASection }) {
  return (
    <Button
      type="button"
      className="h-10 w-full rounded-xl"
      style={{ backgroundColor: section.buttonColor, color: section.textColor }}
    >
      {section.label}
    </Button>
  )
}
