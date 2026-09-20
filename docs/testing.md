# Testing Rules

Apply these rules when implementing or reviewing automated tests.

- Test user-visible behavior and the editor-to-state-to-preview flow rather than implementation details.
- Use accessible React Testing Library queries, preferring role and label queries.
- Use `userEvent` for user interaction.
- Cover the smallest meaningful happy path and failure or boundary case for non-trivial behavior.
- Keep tests deterministic and avoid snapshots when a focused assertion explains the expected behavior better.
