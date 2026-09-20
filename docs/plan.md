# Mobile App Home Screen Editor

## Build Plan & Technical Architecture - v6

Aligned to the take-home brief and updated with shadcn/ui, brief-matching component terminology, a polished default configuration, editor-owned state, and a prop-driven mobile preview.

> **Guiding principle**
>
> Meet every requirement first. Use libraries where they reduce low-value implementation work, while keeping the application's state model, section architecture, validation, preview behavior, and tests clear and demonstrably yours.

### Build sequence

```text
Foundation & Architecture
        ↓
App Shell + Default Experience
        ↓
Section Management → Reordering
        ↓
Carousel → Textarea → CTA
        ↓
Import / Export
        ↓
Quality Pass → Documentation
```

# Part I - Architecture & Decisions

## 1. Direct alignment with the brief

The plan maps directly to the requested three section types and editor behaviors. Naming in the code should follow the brief so a reviewer can move easily between the requirements and implementation.

| Brief | Code |
| --- | --- |
| Carousel Section | `CarouselSection` |
| Textarea Section | `TextareaSection` |
| Call to Action (CTA) | `CTASection` |

### Required behavior covered

- Live preview for all edits.
- Multiple instances of every section type.
- Section add, remove, edit, and reorder.
- Carousel image URL add/edit/remove plus portrait, landscape, and square display.
- Textarea title/description editing plus independent hex colors.
- CTA label/link editing plus button and label hex colors.
- Responsive and user-friendly editor.
- JSON export and validated JSON import with graceful failure.
- Meaningful automated tests for core editor/preview behavior.
- Sensible defaults and graceful error handling.
- README with setup, approach, assumptions, tradeoffs, and AI usage.

> **Terminology decision**
>
> Use `TextareaSection` consistently even though `TextSection` could also be reasonable domain terminology. Matching the brief improves discoverability during review.

## 2. Recommended technology stack

| Area | Choice | Purpose |
| --- | --- | --- |
| Framework | React + Vite | Modern SPA setup matching the recommendation. |
| Language | TypeScript | Typed section unions, reducer actions, config, and component props. |
| Styling | Tailwind CSS | Responsive styling and consistent design primitives. |
| UI primitives | shadcn/ui | Accessible, customizable React primitives that save time in both editor and preview. |
| State | Context + `useReducer` | Idiomatic shared editor state without an external store. |
| Validation | Zod | Runtime validation of imported configuration and invalid external data. |
| Reordering | Up/down controls | Simple, accessible section reordering without an additional dependency. |
| Carousel | shadcn Carousel / Embla | shadcn's Carousel uses Embla and fits the brief's plugin allowance. |
| Testing | Vitest + RTL | Behavior-focused tests with strong Vite integration. |
| IDs | `crypto.randomUUID()` | Stable section identity without another dependency. |

### shadcn/ui usage

Use shadcn primitives wherever they save time or improve accessibility, including inside the mobile preview. Application-specific components still own the domain behavior and compose those primitives.

```text
Our application component
          ↓
  shadcn/ui primitive
          ↓
       Tailwind
```

Examples:

```text
CTASectionPreview       → Button
CarouselSectionPreview  → Carousel / CarouselContent / CarouselItem
Editor controls         → Input / Textarea / Select / Accordion / Button
```

Do not create custom generic Button/Input/Textarea components merely to duplicate shadcn. Keep application-specific components focused on editor and preview behavior.

## 3. State and preview architecture

The editor owns mutable state. The mobile preview receives the serializable `AppConfig` as a prop and renders it. This keeps the preview independent from Context and persistence.

```text
EditorProvider
     │
 EditorPage
     │
 ┌───┴───────────────────┐
 │                       │
EditorPanel          MobilePreview
 │                       ▲
useEditor()               │ AppConfig prop
 │                        │
EditorContext ─── config ─┘
```

### Context ownership

`EditorContext` remains under `features/editor` because the editor domain owns that mutable state. The number of consumers does not make it a global application concern.

### Preview ownership

`MobilePreview` and the section preview components may freely use shadcn/ui. They simply should not depend on `EditorContext` when a config/section prop is sufficient.

```tsx
<MobilePreview config={state.config} />

// Inside MobilePreview:
sections.map(section => (
  <SectionRenderer key={section.id} section={section} />
))
```

> **Extensibility seam**
>
> If persistence is added later, an API can load/save the same `AppConfig` without changing how `MobilePreview` renders it.

## 4. Types, schemas, and runtime boundaries

`types/` is the predictable home for shared TypeScript definitions. `schemas/` is the predictable home for executable runtime validation.

```text
src/
├── types/
│   ├── section.types.ts
│   ├── config.types.ts
│   └── editor.types.ts
│
└── schemas/
    ├── section.schema.ts
    └── config.schema.ts
```

### Section types

```ts
export interface BaseSection {
  id: string;
}

export interface CarouselSection extends BaseSection {
  type: "carousel";
  images: CarouselImage[];
  aspectRatio: "portrait" | "landscape" | "square";
}

export interface TextareaSection extends BaseSection {
  type: "textarea";
  title: string;
  description: string;
  titleColor: string;
  descriptionColor: string;
}

export interface CTASection extends BaseSection {
  type: "cta";
  label: string;
  href: string;
  buttonColor: string;
  labelColor: string;
}

export type Section =
  | CarouselSection
  | TextareaSection
  | CTASection;
```

### Runtime validation

```text
Imported JSON
     ↓
JSON.parse()
     ↓
appConfigSchema.safeParse()
     ↓
Valid AppConfig → replace editor config

Invalid / malformed
     ↓
show feedback
     ↓
preserve current config
```

> **Responsibility split**
>
> TypeScript describes what application code expects. Zod describes what runtime/external data is accepted. Internal-only `EditorState` and `EditorAction` need types but do not need schemas.

## 5. Default experience

The app should open in a useful, polished state rather than an empty canvas. This directly supports the brief's requirement for sensible defaults and lets the reviewer see all three required section types immediately.

```ts
const defaultConfig: AppConfig = {
  version: 1,
  sections: [
    createCarouselSection(),
    createTextareaSection(),
    createCTASection(),
  ],
};
```

### Recommended default content

- One Carousel Section with a small set of reliable sample image URLs.
- Landscape or square as the initial carousel aspect ratio.
- One Textarea Section with realistic storefront title and description.
- One CTA Section with a clear label such as 'Shop Now' and safe example link.
- Accessible, visually coherent default colors.
- Every newly added section also receives useful defaults.

### Reviewer experience

```text
Open app
   ↓
Immediately see a complete mobile home screen
   ↓
Edit any field
   ↓
See live preview change
   ↓
Add / reorder / remove sections
   ↓
Import / export configuration
```

> **Pragmatism**
>
> Use realistic sample content rather than Lorem ipsum. The goal is not elaborate branding; it is making the required behavior immediately understandable.

## 6. Updated project structure

```text
my-app/
├── public/
│
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── select.tsx
│   │   │   └── carousel.tsx
│   │   └── layout/
│   │       ├── AppHeader.tsx
│   │       ├── EditorPanel.tsx
│   │       └── PreviewPanel.tsx
│   │
│   ├── features/
│   │   ├── editor/
│   │   │   ├── components/
│   │   │   │   ├── SectionList.tsx
│   │   │   │   ├── AddSection.tsx
│   │   │   │   └── SectionEditorCard.tsx
│   │   │   ├── context/EditorContext.tsx
│   │   │   ├── hooks/useEditor.ts
│   │   │   ├── reducer/editorReducer.ts
│   │   │   └── defaults.ts
│   │   │
│   │   ├── carousel-section/
│   │   │   ├── CarouselSectionEditor.tsx
│   │   │   ├── CarouselSectionPreview.tsx
│   │   │   └── CarouselSection.test.tsx
│   │   │
│   │   ├── textarea-section/
│   │   │   ├── TextareaSectionEditor.tsx
│   │   │   ├── TextareaSectionPreview.tsx
│   │   │   └── TextareaSection.test.tsx
│   │   │
│   │   ├── cta-section/
│   │   │   ├── CTASectionEditor.tsx
│   │   │   ├── CTASectionPreview.tsx
│   │   │   └── CTASection.test.tsx
│   │   │
│   │   ├── preview/
│   │   │   ├── MobilePreview.tsx
│   │   │   └── SectionRenderer.tsx
│   │   │
│   │   └── config-transfer/
│   │       ├── importConfig.ts
│   │       ├── exportConfig.ts
│   │       └── configTransfer.test.ts
│   │
│   ├── pages/EditorPage/EditorPage.tsx
│   ├── types/
│   │   ├── section.types.ts
│   │   ├── config.types.ts
│   │   └── editor.types.ts
│   ├── schemas/
│   │   ├── section.schema.ts
│   │   └── config.schema.ts
│   ├── utils/ids.ts
│   ├── styles/globals.css
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── components.json             # shadcn config
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Do not create yet

- `routes/` - add only if a real second browser route appears.
- `services/` - add only when an API/external persistence layer appears.
- `store/` - unnecessary for Context + `useReducer`.
- Custom generic UI primitives that simply duplicate shadcn components.

## 7. Codex AI Infrastructure

Keep the AI harness intentionally small. `AGENTS.md` should define the repository workflow and architecture constraints, then reference focused documents for React and testing guidance.

```text
AGENTS.md
"What should Codex consistently do in THIS repository?"

docs/react.md
"What React rules should Codex apply?"

docs/testing.md
"What testing rules should Codex apply?"
```

### Recommended structure

```text
my-app/
├── AGENTS.md
├── docs/
│   ├── react.md
│   └── testing.md
├── src/
└── README.md
```

### Project rules - AGENTS.md

- Keep `AppConfig` serializable and separate from transient `EditorState`.
- Keep shared TypeScript definitions in `src/types` and runtime schemas in `src/schemas`.
- Use brief terminology consistently: `CarouselSection`, `TextareaSection`, and `CTASection`.
- Do not add a backend, React Query, routing, or speculative abstractions unless requirements justify them.
- Reference `docs/react.md` for React implementation and review.
- Reference `docs/testing.md` for test implementation and review.

### React and testing rules

Keep focused guidance in `docs/react.md` and `docs/testing.md` rather than creating project-specific skills. Cover state ownership, effects, composition, controlled inputs, accessibility, list keys, sensible memoization, React Testing Library queries, `userEvent`, and behavior-focused tests.

For example, the stable-key rule belongs in `docs/react.md`, while behavior-focused query and interaction rules belong in `docs/testing.md`.

> **Rule of thumb**
>
> `AGENTS.md` defines the repository workflow and architecture constraints. `docs/react.md` and `docs/testing.md` hold supporting guidance without introducing a skill framework.

### README / AI usage note

Document the harness briefly because the brief explicitly asks how AI was used. Explain that Codex was given repository-level architecture and testing constraints so generated changes stayed consistent with the project's design, rather than allowing the tool to make architectural decisions independently.

Record meaningful examples of accepted, rejected, or corrected suggestions during development. Rejecting unnecessary routing/backend persistence or correcting an implementation that violates the editor/preview boundary is more useful than logging every prompt.

> **Scope**
>
> Start with `AGENTS.md`, `docs/react.md`, and `docs/testing.md`. Avoid turning the AI infrastructure into a separate project; its purpose is to improve consistency and demonstrate intentional AI-assisted engineering.

# Part II - Implementation Plan

## 8. Full implementation plan

### Milestone 1 - Foundation, Architecture & AI Harness

- Create Vite + React + TypeScript app.
- Install/configure Tailwind and shadcn/ui.
- Configure Vitest + React Testing Library.
- Install Zod.
- Add shadcn Carousel (Embla-backed) and required UI primitives.
- Implement `section.types.ts` using `CarouselSection`, `TextareaSection`, and `CTASection` terminology.
- Implement `AppConfig`, `EditorState`, and `EditorAction` types.
- Implement section/config Zod schemas.
- Implement `crypto.randomUUID()` helper and section factories.
- Implement `editorReducer`, `EditorContext`, `EditorProvider`, and `useEditor()`.
- Add the lightweight AI harness: repository-specific rules in `AGENTS.md` plus focused guidance in `docs/react.md` and `docs/testing.md`.
- Keep the harness scoped to reusable guidance; do not add automation or speculative AI infrastructure.

### Milestone 2 - App Shell + Default Experience

- Build header and Import/Export actions.
- Build responsive editor + persistent mobile preview layout.
- Create phone-frame preview shell.
- Seed default config with one Carousel, one Textarea, and one CTA section.
- Use realistic default content and coherent colors.
- Confirm first render demonstrates the full assignment.

### Milestone 3 - Section Management

- Render ordered `config.sections`.
- Add each section type from a chooser.
- Support multiple instances of every type.
- Delete sections safely.
- Use selected/expanded editor cards.
- Handle empty configuration.
- Test add/remove/stable identity.

### Milestone 4 - Reordering

- Add up/down controls to each section editor card.
- Reorder the canonical sections array.
- Keep editor and preview order synchronized.
- Use stable IDs, never array indexes as identity.
- Disable the up control on the first section and the down control on the last section.
- Provide accessible labels and native keyboard interaction.
- Test resulting order.

### Milestone 5 - Carousel Section

- Build `CarouselSectionEditor` and `CarouselSectionPreview`.
- Use shadcn Carousel / Embla for horizontal carousel mechanics.
- Add, edit, and remove image URLs.
- Support portrait, landscape, and square modes.
- Handle zero images, one image, broken URLs, and long lists gracefully.
- Test URL list and aspect-ratio behavior.

### Milestone 6 - Textarea Section

- Build `TextareaSectionEditor` and `TextareaSectionPreview`.
- Edit title and description.
- Edit independent title and description hex colors.
- Use shadcn Input/Textarea where appropriate.
- Handle empty/long content and invalid colors gracefully.
- Test live preview updates.

### Milestone 7 - CTA Section

- Build `CTASectionEditor` and `CTASectionPreview`.
- Edit label and link.
- Edit button and label hex colors.
- Use shadcn Button in the preview where appropriate.
- Prevent preview interaction from unexpectedly navigating the reviewer away.
- Validate/handle bad URL and color input.
- Test live preview updates.

### Milestone 8 - Import / Export

- Export `AppConfig` as formatted JSON file.
- Read and parse selected JSON file.
- Validate with `appConfigSchema` before replacing state.
- Differentiate malformed JSON from structurally invalid config.
- Reject unsupported config version/unknown section type.
- Preserve current work after failed import.
- Show concise error/success feedback.
- Test valid round-trip and invalid imports.

### Milestone 9 - Quality Pass

- Responsive desktop/tablet/mobile review.
- Keyboard navigation and visible focus.
- Labels, errors, semantic HTML, and contrast.
- Stress-test no sections, many sections, long content, invalid input, and broken images.
- Remove console warnings and TypeScript errors.
- Run full tests and production build.
- Manual end-to-end workflow.

### Milestone 10 - Documentation & Submission

- README local setup, dev, test, and build instructions.
- Explain Context + reducer and prop-driven preview.
- Explain `AppConfig` vs `EditorState` and `types/` vs `schemas/`.
- Document shadcn/Embla choices and the dependency-free reordering tradeoff.
- Document assumptions and future API/routing seams.
- Document AI tools, uses, accepted/rejected/corrected suggestions.
- Final public repo and clean-clone verification.

# Part III - Engineering Guidance

## 9. Testing strategy

Prioritize tests that prove the core editor → state → preview loop rather than chasing a coverage percentage.

```text
Edit title
    ↓
Preview title changes

Add section
    ↓
Editor + preview contain section

Reorder sections
    ↓
Preview order changes

Import valid JSON
    ↓
Configuration restored

Import invalid JSON
    ↓
Error shown + existing config preserved
```

### Recommended test layers

- Reducer/domain tests for add, update, remove, and reorder by stable ID.
- Feature integration tests for Carousel, Textarea, and CTA live updates.
- Config-transfer tests for valid round-trip, malformed JSON, and invalid schema.
- Focused accessibility assertions where they protect important behavior.

> **Pair-programming benefit**
>
> These tests make a likely follow-up extension safer: a new section type, duplicate action, persistence, extra setting, or second preview screen can be added while quickly checking regressions.

## 10. Future extension seams

### Backend persistence

```text
# Add only when required
src/services/configService.ts

loadConfig()
   ↓
appConfigSchema validation
   ↓
AppConfig
   ↓
EditorContext

saveConfig(config: AppConfig)
```

### New section type

```text
Update section.types.ts
        ↓
Update section.schema.ts
        ↓
Add default factory
        ↓
Add Editor + Preview
        ↓
Register rendering
        ↓
Tests
```

### Multiple mobile screens

```ts
interface AppScreen {
  id: string;
  name: string;
  sections: Section[];
}

interface AppConfig {
  version: 2;
  screens: AppScreen[];
}
```

Do not pre-build these extensions. The evaluation asks for clean seams that are straightforward to extend, not unused infrastructure.

# Part IV - Submission

## 11. Final submission checklist

- App opens with a polished default Carousel + Textarea + CTA configuration.
- Carousel scrolls horizontally and supports add/edit/remove image URLs.
- Carousel supports portrait, landscape, and square views.
- Textarea title/description and both hex colors update live.
- CTA label/link/button color/label color update live.
- Multiple instances of every section type can be added.
- Sections can be removed and reordered.
- Preview always reflects canonical section order and edits.
- Valid JSON export/import round-trips.
- Malformed/invalid imports fail gracefully and preserve current work.
- Responsive layout is usable and keyboard/focus behavior is reasonable.
- Core editor/preview behavior has meaningful automated tests.
- No TypeScript errors, console warnings, or production-build failures.
- README documents setup, approach, assumptions, tradeoffs, and AI usage.
- Public repository can be cloned and run from README instructions.

> **Final principle**
>
> Use shadcn/ui and focused libraries to save time on solved UI mechanics. Spend the take-home effort on the parts the brief is actually evaluating: component design, state management, live behavior, input handling, UX, tests, extensibility, and judgment.
