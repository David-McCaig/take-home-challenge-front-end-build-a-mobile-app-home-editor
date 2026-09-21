import type { CTASection } from "@/types/section.types"

export function CTASectionPreview({ section }: { section: CTASection }) {
  return (
    <button
      type="button"
      className="h-10 w-full rounded-xl text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ backgroundColor: section.buttonColor, color: section.textColor }}
    >
      {section.label}
    </button>
  )
}
