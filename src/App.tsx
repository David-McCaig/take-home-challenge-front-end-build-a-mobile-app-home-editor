import { EditorProvider } from "@/features/editor/context/EditorContext"
import { defaultConfig } from "@/features/editor/defaults"
import { EditorPage } from "@/pages/EditorPage/EditorPage"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <EditorProvider initialConfig={defaultConfig}>
      <EditorPage />
      <Toaster richColors position="top-right" />
    </EditorProvider>
  )
}

export default App
