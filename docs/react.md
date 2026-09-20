# React Rules

Apply these rules when implementing or reviewing React application code.

- Use React Context + `useReducer` for shared editor state; do not introduce another state library without a requirement.
- Keep state at the lowest owner that needs it; shared editor state belongs in `EditorContext` and transient UI state stays local.
- Pass configuration to preview components through props rather than `EditorContext`.
- Keep editor and preview components separate.
- Prefer controlled inputs for editor fields so state and preview remain synchronized.
- Use effects only to synchronize with external systems, not to derive values that can be calculated during render.
- Compose existing components before adding abstractions or wrapper components.
- Use shadcn/ui primitives where appropriate instead of recreating generic primitives.
- Use stable IDs as keys for lists that can be inserted, removed, or reordered.
- Add memoization only after identifying a real render or computation problem.
- Give every input an accessible label and associate validation errors with the relevant field.
- Use native buttons and controls before custom interaction patterns.
- Preserve visible focus and keyboard operation for every editor action.
- Give icon-only controls accessible names that describe the action and target.
