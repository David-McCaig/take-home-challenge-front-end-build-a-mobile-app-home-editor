// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest"
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"

import { EditorProvider } from "@/features/editor/context/EditorContext"
import { EditorPage } from "@/pages/EditorPage/EditorPage"
import type { CTASection, TextareaSection } from "@/types/section.types"

const createCTA = (id: string, label: string): CTASection => ({
  id,
  type: "cta",
  label,
  href: "https://example.com",
  buttonColor: "#000000",
  textColor: "#ffffff",
})

const textareaSection: TextareaSection = {
  id: "text",
  type: "textarea",
  title: "Original title",
  description: "Original description",
  titleColor: "#111111",
  descriptionColor: "#737373",
}

afterEach(cleanup)

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

  it("reorders the widget tree and preview", async () => {
    const user = userEvent.setup()

    render(
      <EditorProvider
        initialConfig={{
          version: 1,
          sections: [createCTA("first", "First"), createCTA("second", "Second")],
        }}
      >
        <EditorPage />
      </EditorProvider>,
    )

    const tree = screen.getByText("Widget Tree").closest("aside")!
    const preview = screen.getByRole("heading", { name: "Preview" }).closest("section")!
    const moveFirstUp = within(tree).getByRole("button", { name: "Move CTA section 1 up" })
    const moveSecondDown = within(tree).getByRole("button", {
      name: "Move CTA section 2 down",
    })

    expect(moveFirstUp).toBeDisabled()
    expect(moveSecondDown).toBeDisabled()

    await user.click(within(tree).getByRole("button", { name: "Move CTA section 2 up" }))

    expect(within(tree).getAllByRole("article").map(({ textContent }) => textContent)).toEqual([
      expect.stringContaining("Second"),
      expect.stringContaining("First"),
    ])
    expect(within(preview).getAllByRole("button").map(({ textContent }) => textContent)).toEqual([
      "Second",
      "First",
    ])
  })
})

describe("textarea section", () => {
  it("updates text and colors in the live preview", async () => {
    const user = userEvent.setup()

    render(
      <EditorProvider initialConfig={{ version: 1, sections: [textareaSection] }}>
        <EditorPage />
      </EditorProvider>,
    )

    const title = screen.getByLabelText("Title")
    const description = screen.getByLabelText("Description")
    const titleColor = screen.getByLabelText("Title color")
    const descriptionColor = screen.getByLabelText("Description color")

    expect(titleColor).toHaveValue("#111111")
    expect(descriptionColor).toHaveValue("#737373")

    fireEvent.change(screen.getByLabelText("Choose title color"), {
      target: { value: "#654321" },
    })
    expect(titleColor).toHaveValue("#654321")

    await user.clear(title)
    await user.type(title, "Updated title")
    await user.clear(description)
    await user.type(description, "First line\nSecond line")
    await user.clear(titleColor)
    await user.type(titleColor, "invalid")

    expect(screen.getByText("Enter a 3- or 6-digit hex color.")).toBeInTheDocument()

    await user.clear(titleColor)
    await user.type(titleColor, "#123456")
    await user.clear(descriptionColor)
    await user.type(descriptionColor, "#abcdef")

    const preview = screen.getByRole("heading", { name: "Preview" }).closest("section")!
    const previewTitle = within(preview).getByRole("heading", { name: "Updated title" })
    const previewDescription = within(preview).getByText(/First line\s+Second line/)

    expect(previewTitle).toHaveStyle({ color: "#123456" })
    expect(previewDescription).toHaveStyle({ color: "#abcdef" })
  })
})
