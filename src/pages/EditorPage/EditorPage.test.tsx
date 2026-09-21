// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest"
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { EditorProvider } from "@/features/editor/context/EditorContext"
import { EditorPage } from "@/pages/EditorPage/EditorPage"
import type { CarouselSection, CTASection, TextareaSection } from "@/types/section.types"

vi.mock("embla-carousel-react", () => ({
  default: () => [() => undefined, undefined],
}))

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

const carouselSection: CarouselSection = {
  id: "carousel",
  type: "carousel",
  images: [{ id: "image-1", url: "https://example.com/first.jpg" }],
  aspectRatio: "portrait",
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

describe("CTA section", () => {
  it("validates links and keeps the preview non-navigating", async () => {
    const user = userEvent.setup()

    render(
      <EditorProvider
        initialConfig={{
          version: 1,
          sections: [createCTA("cta", "Shop Now"), createCTA("other", "Other")],
        }}
      >
        <EditorPage />
      </EditorProvider>,
    )

    const label = screen.getByLabelText("Label")
    const link = screen.getByLabelText("Link")
    await user.clear(label)
    await user.type(label, "Browse collection")
    await user.clear(link)
    await user.type(link, "javascript:alert(1)")

    expect(screen.queryByText("Enter a valid HTTP or HTTPS URL.")).not.toBeInTheDocument()
    await user.tab()
    expect(screen.getByText("Enter a valid HTTP or HTTPS URL.")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Select CTA section 2" }))
    await user.click(screen.getByRole("button", { name: "Select CTA section 1" }))
    expect(screen.getByLabelText("Link")).toHaveValue("https://example.com")

    await user.clear(screen.getByLabelText("Link"))
    await user.type(screen.getByLabelText("Link"), "https://example.com/new")
    await user.tab()
    await user.click(screen.getByRole("button", { name: "Select CTA section 2" }))
    await user.click(screen.getByRole("button", { name: "Select CTA section 1" }))
    await user.clear(screen.getByLabelText("Button color"))
    await user.type(screen.getByLabelText("Button color"), "#123456")
    await user.clear(screen.getByLabelText("Label color"))
    await user.type(screen.getByLabelText("Label color"), "#abcdef")

    const preview = screen.getByRole("heading", { name: "Preview" }).closest("section")!
    const previewButton = within(preview).getByRole("button", { name: "Browse collection" })

    expect(screen.getByLabelText("Link")).toHaveValue("https://example.com/new")
    expect(previewButton).toHaveStyle({ backgroundColor: "#123456", color: "#abcdef" })
    await user.click(previewButton)
    expect(window.location.href).toBe("http://localhost:3000/")
  })
})

describe("carousel section", () => {
  it("updates image URLs, images, and aspect ratio in the live preview", async () => {
    const user = userEvent.setup()

    render(
      <EditorProvider initialConfig={{ version: 1, sections: [carouselSection] }}>
        <EditorPage />
      </EditorProvider>,
    )

    const preview = screen.getByRole("heading", { name: "Preview" }).closest("section")!
    const imageUrl = screen.getByLabelText("Image 1 URL")

    await user.clear(imageUrl)
    await user.type(imageUrl, "not-a-url")
    await user.tab()
    expect(screen.getByText("Enter a valid HTTP or HTTPS URL.")).toBeInTheDocument()
    expect(within(preview).getByAltText("Carousel item 1")).toHaveAttribute(
      "src",
      "https://example.com/first.jpg",
    )

    await user.clear(imageUrl)
    await user.type(imageUrl, "https://example.com/updated.jpg")
    await user.tab()
    expect(within(preview).getByAltText("Carousel item 1")).toHaveAttribute(
      "src",
      "https://example.com/updated.jpg",
    )

    await user.selectOptions(screen.getByLabelText("View mode"), "square")
    expect(within(preview).getByAltText("Carousel item 1").parentElement).toHaveClass(
      "aspect-square",
    )

    expect(within(preview).queryByText("Image unavailable")).not.toBeInTheDocument()
    fireEvent.error(within(preview).getByAltText("Carousel item 1"))
    expect(within(preview).getByText("Image unavailable")).toBeInTheDocument()
    expect(within(preview).queryByAltText("Carousel item 1")).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Add image" }))
    expect(screen.getByText("Images (2)")).toBeInTheDocument()
    expect(within(preview).getAllByRole("group")).toHaveLength(1)

    await user.type(screen.getByLabelText("Image 2 URL"), "https://example.com/second.jpg")
    await user.tab()
    expect(within(preview).getAllByRole("group")).toHaveLength(2)

    await user.click(screen.getByRole("button", { name: "Remove image 1" }))
    await user.click(screen.getByRole("button", { name: "Remove image 1" }))
    expect(within(preview).getByText("No images")).toBeInTheDocument()
  })
})
