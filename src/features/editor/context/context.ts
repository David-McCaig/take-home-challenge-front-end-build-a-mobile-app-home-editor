import { createContext, type Dispatch } from "react"

import type { EditorAction, EditorState } from "../../../types/editor.types"

export interface EditorContextValue {
  state: EditorState
  dispatch: Dispatch<EditorAction>
}

export const EditorContext = createContext<EditorContextValue | null>(null)
