import { AppHeader } from "@/components/layout/AppHeader"
import { WidgetEditorPanel } from "@/features/editor/components/WidgetEditorPanel"
import { WidgetTreePanel } from "@/features/editor/components/WidgetTreePanel"
import { PreviewPanel } from "@/features/preview/components/PreviewPanel"

export function EditorPage() {
  return (
    <div className="min-h-dvh bg-background">
      <AppHeader />
      <main className="mx-auto flex max-w-[90rem] flex-col gap-4 p-3 sm:p-5 xl:min-h-[calc(100dvh-5rem)] xl:flex-row">
        <div className="xl:w-[16.25rem] xl:shrink-0">
          <WidgetTreePanel />
        </div>
        <div className="xl:min-w-0 xl:flex-1">
          <PreviewPanel />
        </div>
        <div className="xl:w-80 xl:shrink-0">
          <WidgetEditorPanel />
        </div>
      </main>
    </div>
  )
}
