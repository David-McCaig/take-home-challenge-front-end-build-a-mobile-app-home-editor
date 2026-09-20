# Repository Instructions

## Plan workflow

- Treat `docs/plan.md` as the authoritative build plan.
- Implement one milestone or explicitly requested slice at a time; do not implement later milestones speculatively.
- Before editing, inspect the existing implementation and confirm the requested plan slice still fits the current code.
- After completing work, update `docs/progress.md` with status, completed work, decisions, deviations, and blockers.
- A slice is done only when its acceptance criteria are met, relevant checks pass, and the final diff has been reviewed for regressions.

## Architecture constraints

- Use React Context + `useReducer` for shared editor state; do not introduce another state library without a requirement.
- Keep `AppConfig` serializable and separate from transient `EditorState`.
- Pass configuration to preview components through props rather than `EditorContext`.
- Keep editor and preview components separate.
- Keep shared TypeScript definitions in `src/types` and runtime schemas in `src/schemas`.
- Use `CarouselSection`, `TextareaSection`, and `CTASection` terminology consistently.
- Use shadcn/ui primitives where appropriate instead of recreating generic primitives.
- Use stable IDs for reorderable sections; never use array indexes as section identity.
- Do not add a backend, React Query, routing, or speculative abstractions unless requirements justify them.
