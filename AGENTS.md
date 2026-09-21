# Repository Instructions

## Plan workflow

- Treat `docs/plan.md` as the authoritative build plan.
- Implement one milestone or explicitly requested slice at a time; do not implement later milestones speculatively.
- Before editing, inspect the existing implementation and confirm the requested plan slice still fits the current code.
- After completing work, update `docs/progress.md` with status, completed work, decisions, deviations, and blockers.
- A slice is done only when its acceptance criteria are met, relevant checks pass, and the final diff has been reviewed for regressions.

## Reference rules

- For React implementation or review, read and follow `docs/react.md`.
- For test implementation or review, read and follow `docs/testing.md`.
- For pull requests, use `docs/pull-requests.md`.

## Architecture constraints

- Keep `AppConfig` serializable and separate from transient `EditorState`.
- Keep shared TypeScript definitions in `src/types` and runtime schemas in `src/schemas`.
- Use `CarouselSection`, `TextareaSection`, and `CTASection` terminology consistently.
- Do not add a backend, React Query, routing, or speculative abstractions unless requirements justify them.
