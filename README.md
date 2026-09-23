# Mobile App Home Screen Editor

A responsive React application for building and previewing a mobile app home screen in real time. Users can add, edit, remove, and reorder carousel, text, and call-to-action sections, then export or restore the configuration as JSON.

[View the live demo](https://reactivchallenge.netlify.app/)

![Mobile App Home Screen Editor showing the widget tree, phone preview, and carousel editor](docs/assets/mobile-app-home-screen-editor.png)

## Run locally

Use Node.js 20.19+ or 22.12+ and npm.

```bash
git clone https://github.com/David-McCaig/take-home-challenge-front-end-build-a-mobile-app-home-editor.git
cd take-home-challenge-front-end-build-a-mobile-app-home-editor
npm install
npm run dev
```

Open the local URL printed by Vite.

## Available commands

```bash
npm run dev      # start the development server
npm test         # run the test suite once
npm run lint     # run ESLint
npm run build    # type-check and create a production build
npm run preview  # serve the production build locally
```

## Features

- Live mobile preview for every valid edit.
- Multiple carousel, textarea, and CTA sections.
- Accessible add, delete, and up/down reorder controls.
- Carousel image URL management and portrait, landscape, or square layouts.
- Editable textarea content and independent title/description colors.
- Editable CTA label, HTTP(S) link, button color, and text color.
- Versioned JSON import/export with runtime validation and graceful error feedback.
- Responsive editor layout, keyboard focus states, empty states, and broken-image handling.

## Approach

The editor uses React Context with `useReducer` as the single source of truth. The mutable editor state contains a serializable `AppConfig` plus transient UI state such as the selected section. Editor controls dispatch actions to the reducer, which updates the canonical configuration. The preview receives that configuration through props and contains no editing logic, keeping it independent from the editor and leaving a clean seam for future persistence.

Tests focus on user-visible behavior: section management and ordering, editor-to-preview updates, input validation, reducer behavior, and valid or invalid configuration transfers.

## Data model

`Section` is a discriminated union of `CarouselSection`, `TextareaSection`, and `CTASection`. Every section has a stable ID, as does every carousel image. `AppConfig` contains the version and ordered sections, keeping the exported JSON focused only on the data needed to rebuild the home screen.

The version is currently the literal `1`, leaving a clear place to add migrations if the format changes. TypeScript types describe the data used inside the application, while separate Zod schemas validate untrusted data at runtime when importing JSON. They reject unknown fields, duplicate section or image IDs, and non-HTTP(S) URLs. The same URL rule is used by the editor and importer, preventing values such as `javascript:` links from entering the configuration.

The section model is modular: adding a new section means defining its type and schema, then providing its editor and preview components.

## Key decisions

- **Editor and preview are separate:** Editor components update the configuration, while the mobile preview only renders it. This keeps editing logic out of the preview and makes it easier to test, reuse, or replace.
- **Configuration and UI state are separate:** The serializable `AppConfig` contains only the data needed to rebuild the home screen. Temporary editor state, such as the selected section, stays outside it and is not included in exported JSON.
- **State changes go through a reducer:** Editor actions are handled centrally with React Context and `useReducer`. This keeps updates predictable across the section list, controls, and preview without introducing an external state-management library.

## AI usage

I used OpenAI Codex as a pair-programming tool for implementation suggestions, test cases, refactoring, and documentation. `AGENTS.md` provided the repository-level workflow and architecture rules, and directed Codex to the build plan and more specific React and testing guidance in `docs/` when relevant. This kept its suggestions aligned with the project rather than letting the tool make architectural decisions independently. I reviewed the generated code and accepted, revised, or rejected suggestions based on correctness, accessibility, scope, and maintainability.

One example was the generated section-label helper:

```ts
function sectionLabel(section: Section) {
  if (section.type === "carousel") return ["Carousel", `${section.images.length} images`]
  if (section.type === "textarea") return ["Text", section.title || "Untitled"]
  return ["CTA", section.label || "Unlabelled"]
}
```

This worked with the three existing section types, but the final return assumed anything else must be a CTA. That could hide a bug if another section type was added later. I replaced it with an exhaustive switch, so adding a new section type without handling it here will cause a TypeScript error:

```ts
function sectionLabel(section: Section) {
  switch (section.type) {
    case "carousel":
      return ["Carousel", `${section.images.length} images`]
    case "textarea":
      return ["Text", section.title || "Untitled"]
    case "cta":
      return ["CTA", section.label || "Unlabelled"]
    default:
      return section satisfies never
  }
}
```

## Technology

React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, Embla Carousel, Zod, Vitest, and React Testing Library.
