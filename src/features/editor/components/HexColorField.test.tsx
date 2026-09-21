// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, expect, it, vi } from "vitest"

import { HexColorField } from "@/features/editor/components/HexColorField"

afterEach(cleanup)

it("updates the hex field after external value changes and reversions", async () => {
  const user = userEvent.setup()
  const { rerender } = render(
    <HexColorField label="Title color" value="#111111" onChange={vi.fn()} />,
  )

  await user.clear(screen.getByLabelText("Title color"))
  await user.type(screen.getByLabelText("Title color"), "invalid")
  rerender(<HexColorField label="Title color" value="#abcdef" onChange={vi.fn()} />)

  expect(screen.getByLabelText("Title color")).toHaveValue("#abcdef")

  rerender(<HexColorField label="Title color" value="#111111" onChange={vi.fn()} />)

  expect(screen.getByLabelText("Title color")).toHaveValue("#111111")
})
