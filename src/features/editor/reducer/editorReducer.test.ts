import { describe, expect, it } from "vitest"

import type { EditorState } from "../../../types/editor.types"
import type { CTASection } from "../../../types/section.types"
import { editorReducer } from "./editorReducer"

const createSection = (id: string, label = id): CTASection => ({
  id,
  type: "cta",
  label,
  href: "https://example.com",
  buttonColor: "#000000",
  textColor: "#ffffff",
})

const first = createSection("first")
const second = createSection("second")
const initialState: EditorState = {
  config: { version: 1, sections: [first, second] },
  selectedSectionId: "first",
}

describe("editorReducer", () => {
  it("adds and updates sections by stable ID", () => {
    const third = createSection("third")
    const added = editorReducer(initialState, { type: "add-section", section: third })
    const updated = editorReducer(added, {
      type: "update-section",
      section: createSection("second", "Updated"),
    })

    expect(updated.config.sections.map(({ id }) => id)).toEqual(["first", "second", "third"])
    expect(updated.config.sections[1]).toMatchObject({ id: "second", label: "Updated" })
  })

  it("removes a section and clears its selection", () => {
    expect(
      editorReducer(initialState, { type: "remove-section", sectionId: "first" }),
    ).toEqual({
      config: { version: 1, sections: [second] },
      selectedSectionId: null,
    })
  })

  it("moves sections without crossing array boundaries", () => {
    const moved = editorReducer(initialState, {
      type: "move-section",
      sectionId: "second",
      direction: "up",
    })

    expect(moved.config.sections.map(({ id }) => id)).toEqual(["second", "first"])
    expect(
      editorReducer(initialState, {
        type: "move-section",
        sectionId: "first",
        direction: "up",
      }),
    ).toBe(initialState)
  })

  it("replaces config and resets transient selection", () => {
    const config = { version: 1 as const, sections: [createSection("replacement")] }

    expect(editorReducer(initialState, { type: "replace-config", config })).toEqual({
      config,
      selectedSectionId: null,
    })
  })
})
