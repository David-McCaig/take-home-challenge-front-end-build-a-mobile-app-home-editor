import { SectionRenderer } from "@/features/preview/components/SectionRenderer"
import type { AppConfig } from "@/types/config.types"

export function PhonePreview({ config }: { config: AppConfig }) {
  return (
    <div className="h-[33.75rem] w-full max-w-72 overflow-hidden rounded-[2rem] border-4 bg-background p-2 shadow-xl">
      <div className="flex items-center justify-between border-b px-5 py-4 text-xs font-medium">
        <span>Home</span>
        <span className="size-2 rounded-full bg-foreground" aria-hidden="true" />
      </div>

      <div className="h-[calc(100%-3.25rem)] space-y-6 overflow-y-auto px-5 pt-5 pb-5">
        {config.sections.length === 0 ? (
          <p className="py-16 text-center text-xs text-muted-foreground">
            Add a section to start building.
          </p>
        ) : (
          config.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))
        )}
      </div>
    </div>
  )
}
