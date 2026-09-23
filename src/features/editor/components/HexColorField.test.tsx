// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { toast } from "sonner"
import { afterEach, expect, it, vi } from "vitest"

import { HexColorField } from "@/features/editor/components/HexColorField"

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

it("waits until blur to report an invalid hex color", async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  render(<HexColorField label="Title color" value="#111111" onChange={onChange} />)
  const input = screen.getByLabelText("Title color")

  await user.clear(input)
  await user.type(input, "invalid")

  expect(screen.queryByText("Enter a hex color with 3 or 6 digits.")).not.toBeInTheDocument()
  expect(input).not.toHaveAttribute("aria-invalid", "true")
  expect(onChange).not.toHaveBeenCalled()

  await user.tab()

  expect(screen.getByText("Enter a hex color with 3 or 6 digits.")).toBeInTheDocument()
  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(toast.error).toHaveBeenCalledWith("Invalid color not saved", {
    description: "Title color must be a hex color with 3 or 6 digits.",
  })

  await user.clear(input)
  await user.type(input, "#abc")

  expect(screen.queryByText("Enter a hex color with 3 or 6 digits.")).not.toBeInTheDocument()
  expect(onChange).toHaveBeenLastCalledWith("#abc")
  expect(toast.error).toHaveBeenCalledTimes(1)
})

it("updates the hex field after external value changes and reversions", async () => {
  const user = userEvent.setup()
  const { rerender } = render(
    <HexColorField label="Title color" value="#111111" onChange={vi.fn()} />,
  )

  await user.clear(screen.getByLabelText("Title color"))
  await user.type(screen.getByLabelText("Title color"), "invalid")
  await user.tab()

  expect(screen.getByText("Enter a hex color with 3 or 6 digits.")).toBeInTheDocument()

  rerender(<HexColorField label="Title color" value="#abcdef" onChange={vi.fn()} />)

  expect(screen.getByLabelText("Title color")).toHaveValue("#abcdef")
  expect(screen.queryByText("Enter a hex color with 3 or 6 digits.")).not.toBeInTheDocument()

  rerender(<HexColorField label="Title color" value="#111111" onChange={vi.fn()} />)

  expect(screen.getByLabelText("Title color")).toHaveValue("#111111")
})
