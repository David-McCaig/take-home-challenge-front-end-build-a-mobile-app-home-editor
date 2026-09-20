import { Download, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AppHeader() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-3 border-b px-4 py-3 sm:px-7">
      <div className="min-w-0">
        <p className="text-[0.65rem] font-medium tracking-[0.3em] uppercase">
          Workspace
        </p>
        <h1 className="mt-1 whitespace-nowrap text-lg font-semibold">Mobile App Builder</h1>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button type="button" variant="ghost" size="lg" aria-label="Import configuration">
          <Upload aria-hidden="true" />
          <span className="hidden min-[400px]:inline">Import</span>
        </Button>
        <Button type="button" size="lg" aria-label="Export configuration">
          <Download aria-hidden="true" />
          <span className="hidden min-[400px]:inline">Export</span>
        </Button>
      </div>
    </header>
  )
}
