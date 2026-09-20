import type { EditorAction, EditorState } from "../../../types/editor.types"

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "add-section":
      return {
        ...state,
        config: {
          ...state.config,
          sections: [...state.config.sections, action.section],
        },
        selectedSectionId: action.section.id,
      }

    case "update-section": {
      const index = state.config.sections.findIndex(({ id }) => id === action.section.id)

      if (index === -1) return state

      const sections = [...state.config.sections]
      sections[index] = action.section

      return { ...state, config: { ...state.config, sections } }
    }

    case "remove-section": {
      const sections = state.config.sections.filter(({ id }) => id !== action.sectionId)

      if (sections.length === state.config.sections.length) return state

      return {
        config: { ...state.config, sections },
        selectedSectionId:
          state.selectedSectionId === action.sectionId ? null : state.selectedSectionId,
      }
    }

    case "move-section": {
      const from = state.config.sections.findIndex(({ id }) => id === action.sectionId)
      const to = from + (action.direction === "up" ? -1 : 1)

      if (from === -1 || to < 0 || to >= state.config.sections.length) return state

      const sections = [...state.config.sections]
      const section = sections[from]
      sections[from] = sections[to]
      sections[to] = section

      return { ...state, config: { ...state.config, sections } }
    }

    case "replace-config":
      return { config: action.config, selectedSectionId: null }

    case "select-section":
      return { ...state, selectedSectionId: action.sectionId }
  }
}
