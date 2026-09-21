import { useRef, useState, type ChangeEvent } from "react"
import { Download, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { exportConfig } from "@/features/config-transfer/exportConfig"
import { importConfig } from "@/features/config-transfer/importConfig"
import { useEditor } from "@/features/editor/hooks/useEditor"

export function AppHeader() {
  const { state, dispatch } = useEditor()
  const inputRef = useRef<HTMLInputElement>(null)
  const [feedback, setFeedback] = useState("")

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return

    let result

    try {
      result = importConfig(await file.text())
    } catch {
      setFeedback("Import failed: unable to read file.")
      return
    }

    if (!result.success) {
      setFeedback(
        result.reason === "malformed"
          ? "Import failed: malformed JSON."
          : "Import failed: invalid configuration.",
      )
      return
    }

    dispatch({ type: "replace-config", config: result.config })
    setFeedback("Configuration imported.")
  }

  return (
    <header className="flex min-h-20 items-center justify-between gap-3 border-b px-4 py-3 sm:px-7">
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
          className="sr-only"
          aria-label="Configuration file"
          onChange={handleImport}
        />
        <Button
          type="button"
          variant="ghost"
          size="lg"
          aria-label="Import configuration"
          onClick={() => inputRef.current?.click()}
        >
          <Upload aria-hidden="true" />
          <span className="hidden min-[400px]:inline">Import</span>
        </Button>
        <Button
          type="button"
          size="lg"
          aria-label="Export configuration"
          onClick={() => {
            exportConfig(state.config)
            setFeedback("Configuration exported.")
          }}
        >
          <Download aria-hidden="true" />
          <span className="hidden min-[400px]:inline">Export</span>
        </Button>
        {feedback && (
          <p className="basis-full text-right text-xs text-muted-foreground" role="status">
            {feedback}
          </p>
        )}
      </div>
    </header>
  )
}
