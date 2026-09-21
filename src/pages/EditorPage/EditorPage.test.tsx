// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { EditorProvider } from "@/features/editor/context/EditorContext"
import { EditorPage } from "@/pages/EditorPage/EditorPage"

describe("section management", () => {
  it("adds, selects, previews, and deletes repeated sections", async () => {
    const user = userEvent.setup()

    render(
      <EditorProvider initialConfig={{ version: 1, sections: [] }}>
        <EditorPage />
      </EditorProvider>,
    )

    await user.click(screen.getByRole("button", { name: "Add call to action section" }))

    const editor = screen.getByText("Widget Editor").closest("aside")
    expect(within(editor!).getByRole("heading", { name: "CTA" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Shop Now" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Add call to action section" }))

    expect(screen.getAllByRole("button", { name: "Shop Now" })).toHaveLength(2)

    await user.click(screen.getByRole("button", { name: "Delete CTA section 2" }))

    expect(screen.getAllByRole("button", { name: "Shop Now" })).toHaveLength(1)
    expect(screen.getByText("Select a section to edit it.")).toBeInTheDocument()
  })
})
