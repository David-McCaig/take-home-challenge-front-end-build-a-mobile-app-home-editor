import { useRef, type ChangeEvent } from "react"
import { Download, Upload } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { exportConfig } from "@/features/config-transfer/exportConfig"
import { importConfig } from "@/features/config-transfer/importConfig"
import { useEditor } from "@/features/editor/hooks/useEditor"

export function AppHeader() {
  const { state, dispatch } = useEditor()
  const inputRef = useRef<HTMLInputElement>(null)
  const latestImportId = useRef(0)

  function showImportError(description: string) {
    toast.error("Import failed", { description, closeButton: true, duration: Infinity })
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return

    const importId = ++latestImportId.current
    let result

    try {
      result = importConfig(await file.text())
    } catch {
      if (importId !== latestImportId.current) return
      showImportError("The selected file could not be read. Your configuration was not changed.")
      return
    }

    if (importId !== latestImportId.current) return

    if (!result.success) {
      showImportError(
        result.reason === "malformed"
          ? "The selected file contains malformed JSON. Your configuration was not changed."
          : "The selected file is not a valid configuration. Your configuration was not changed.",
      )
      return
    }

    dispatch({ type: "replace-config", config: result.config })
    toast.success("Configuration imported", {
      description: "Your workspace is ready to edit.",
      duration: 4000,
    })
  }

  return (
    <header className="border-b">
      <div className="mx-auto flex min-h-20 max-w-[90rem] items-center justify-between gap-3 px-4 py-3 sm:px-7">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-medium tracking-[0.3em] uppercase">
            Workspace
          </p>
          <h1 className="mt-1 whitespace-nowrap text-lg font-semibold">Mobile App Builder</h1>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={handleImport}
          />
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="cursor-pointer"
            aria-label="Import configuration"
            onClick={() => inputRef.current?.click()}
          >
            <Upload aria-hidden="true" />
            <span className="hidden min-[400px]:inline">Import</span>
          </Button>
          <Button
            type="button"
            size="lg"
            className="cursor-pointer"
            aria-label="Export configuration"
            onClick={() => exportConfig(state.config)}
          >
            <Download aria-hidden="true" />
            <span className="hidden min-[400px]:inline">Export</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
