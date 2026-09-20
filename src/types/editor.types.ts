import type { AppConfig } from "./config.types"
import type { Section } from "./section.types"

export interface EditorState {
  config: AppConfig
  selectedSectionId: string | null
}

export type EditorAction =
  | { type: "add-section"; section: Section }
  | { type: "update-section"; section: Section }
  | { type: "remove-section"; sectionId: string }
  | { type: "move-section"; sectionId: string; direction: "up" | "down" }
  | { type: "replace-config"; config: AppConfig }
  | { type: "select-section"; sectionId: string | null }
