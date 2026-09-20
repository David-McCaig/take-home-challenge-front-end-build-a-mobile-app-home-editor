import { useReducer, type ReactNode } from "react"

import type { AppConfig } from "../../../types/config.types"
import { editorReducer } from "../reducer/editorReducer"
import { EditorContext } from "./context"

interface EditorProviderProps {
  children: ReactNode
  initialConfig: AppConfig
}

export function EditorProvider({ children, initialConfig }: EditorProviderProps) {
  const [state, dispatch] = useReducer(editorReducer, {
    config: initialConfig,
    selectedSectionId: null,
  })

  return <EditorContext value={{ state, dispatch }}>{children}</EditorContext>
}
