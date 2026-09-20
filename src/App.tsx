import { EditorProvider } from "@/features/editor/context/EditorContext"
import { defaultConfig } from "@/features/editor/defaults"
import { EditorPage } from "@/pages/EditorPage/EditorPage"

function App() {
  return (
    <EditorProvider initialConfig={defaultConfig}>
      <EditorPage />
    </EditorProvider>
  )
}

export default App
