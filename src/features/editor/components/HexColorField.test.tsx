// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, expect, it, vi } from "vitest"

import { HexColorField } from "@/features/editor/components/HexColorField"

afterEach(cleanup)

it("updates the hex field when its value changes externally", () => {
  const { rerender } = render(
    <HexColorField label="Title color" value="#111111" onChange={vi.fn()} />,
  )

  rerender(<HexColorField label="Title color" value="#abcdef" onChange={vi.fn()} />)

  expect(screen.getByLabelText("Title color")).toHaveValue("#abcdef")
})
