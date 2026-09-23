# Build Progress

Source plan: [plan.md](./plan.md)

## Current status

- Current milestone: Milestone 9 - Quality Pass
- Status: In progress - workspace width cap complete
- Last updated: 2026-09-22

## Milestones

- [x] Milestone 1 - Foundation, Architecture & AI Harness
- [x] Milestone 2 - App Shell + Default Experience
- [x] Milestone 3 - Section Management
- [x] Milestone 4 - Reordering
- [x] Milestone 5 - Carousel Section
- [x] Milestone 6 - Textarea Section
- [x] Milestone 7 - CTA Section
- [x] Milestone 8 - Import / Export
- [ ] Milestone 9 - Quality Pass
- [ ] Milestone 10 - Documentation & Submission

## Completed work

- Tightened the mobile Textarea description line height from 20 to 16 pixels and
  reduced its title gap from 8 to 4 pixels.
- Replaced 11 Tailwind arbitrary spacing values with their exact canonical utilities.
- Capped the header content and editor workspace at 90rem while preserving the
  full-width page background and header divider.
- Increased section-delete and carousel-image-remove controls to 24-pixel click targets,
  and included the visible “CTA” text in the CTA add button's accessible name.
- Optimized the three default Unsplash image URLs to request automatic modern formats,
  900-pixel maximum widths, and moderate compression instead of full-resolution originals.
- Confirmed `AddSection.tsx`, `SectionList.tsx`, `SortableSection.tsx`, and
  `styles/globals.css` are empty and unreferenced.
- Confirmed `App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, and
  `src/assets/hero.png` are unreferenced; retained the live favicon and deferred
  unrelated project-specific public assets.
- Added the dead scaffold cleanup and its verification gates to Milestone 9.
- Removed the confirmed dead scaffold files and unused Vite starter assets without
  adding replacement abstractions.
- Verified the cleanup with lint, all 22 tests, and the production build.
- Removed the unused Accordion and Select component modules plus the unreferenced
  public icon sprite; retained `src/lib/utils.ts` because shadcn configuration uses it.
- Verified the additional cleanup with lint, all 22 tests, and the production build.
- Hid the phone preview's scrollbar chrome while preserving its scroll behavior.
- Prevented older, slower file imports from overwriting the latest selected configuration.
- Added regression coverage proving the latest import wins when file reads finish out of order.
- Preserved CTA keyboard focus when committing links while keeping local URL drafts synchronized with canonical configuration changes.

- Implemented Carousel Section image URL add/edit/remove controls and aspect-ratio selection.
- Kept incomplete carousel URL drafts local and committed only schema-valid HTTP(S) URLs.
- Implemented the Embla-backed carousel preview with portrait, landscape, and square layouts plus empty and broken-image fallbacks.
- Added an editor-to-preview integration test covering URL updates, image list changes, aspect ratios, and the zero-image state.

- Implemented the shared `CarouselSection`, `TextareaSection`, `CTASection`, `Section`, and `CarouselImage` types.
- Implemented serializable `AppConfig` and transient `EditorState` / `EditorAction` types.
- Implemented strict section and app-config Zod schemas, including URL, supported-version, section-discriminator, and three- or six-digit hex-color validation.
- Restricted carousel image and CTA links to HTTP(S), with focused Vitest coverage for accepted and unsafe protocols.
- Reject imported configurations with duplicate section IDs or duplicate image IDs within a carousel.
- Added a native `crypto.randomUUID()` ID helper without introducing another dependency.
- Implemented the editor reducer, context provider, and guarded `useEditor()` hook with reducer coverage for add, update, remove, reorder, and config replacement.
- Built the responsive application header shell with static Import and Export actions.
- Built the responsive Widget Tree, Preview, phone frame, and Widget Editor shells from the provided reference design.
- Seeded the editor provider with a schema-valid default config containing one Carousel, Textarea, and CTA section with realistic content and coherent colors.
- Confirmed the first-render shell presents all three supported section types in the editor and mobile preview.
- Wired the widget tree and phone preview to render the canonical ordered `config.sections` array.
- Added Carousel, Textarea, and CTA creation with useful defaults, automatic selection, multiple-instance support, stable IDs, and safe deletion.
- Added selected-card, widget-editor prompt, and empty editor/preview states.
- Made each widget card fully selectable and added placeholder up/down controls for Milestone 4.
- Distinguished repeated sections by position in accessible card action names.
- Added reducer coverage for automatic selection and ID preservation.
- Added an RTL integration test covering repeated section creation, automatic selection, preview synchronization, and deletion.
- Replaced nested section-label conditionals with an exhaustive typed lookup.
- Made widget-tree labels and preview rendering exhaustive so new section types require explicit handling.
- Added the minimal pull request format and referenced it from `AGENTS.md`.
- Wired accessible native up/down controls to reorder the canonical sections array, with pointer cues on widget-tree actions and boundary controls disabled.
- Added integration coverage proving the widget tree and phone preview stay synchronized after reordering.
- Wired controlled title, description, and independent color inputs through the editor reducer to the live Textarea preview.
- Added clickable native-picker swatches beside visible hex color fields and kept invalid color drafts out of serialized editor state.
- Extracted the reusable `HexColorField` into shared editor components for Textarea and future CTA use.
- Kept hex-field drafts synchronized with externally changed color values and added regression coverage.
- Prevented invalid hex drafts from resurfacing when an external color value later reverts.
- Preserved multiline descriptions and made long Textarea content wrap safely in the phone preview.
- Added integration coverage for live Textarea text and color updates.
- Exercised visible hex fields with realistic per-keystroke interactions in integration coverage.
- Wired controlled CTA label, HTTP(S) link, and independent color inputs through the editor reducer.
- Reused the shared hex color field and canonical HTTP(S) schema so invalid drafts never enter serialized editor state.
- Rendered the CTA with the shadcn Button primitive as a non-navigating preview control.
- Allowed long CTA labels, including unbroken text, to wrap within the phone preview.
- Added integration coverage for CTA live-preview updates, delayed link validation, colors, and safe preview interaction.
- Added formatted JSON configuration downloads and JSON file selection from the application header.
- Validated imports through the existing strict `appConfigSchema`, with distinct malformed-JSON and invalid-configuration feedback.
- Preserved the active configuration on failed imports and replaced editor state only after successful validation.
- Added focused round-trip, unsupported-version, unknown-section, successful-import, and failed-import regression coverage.
- Removed the programmatically opened file input from keyboard navigation so Import remains the only visible focus target.
- Rendered carousel failure text only after an image load error so successful images have no hidden duplicate announcement.
- Prevented multiple unfinished carousel rows; Add image now focuses and validates the existing draft instead.

## Decisions and deviations

- Plan updated to v6: use accessible up/down section controls instead of dnd-kit.
- ClickUp-specific project management removed.
- Lightweight AI harness work moved into Milestone 1, using `AGENTS.md`, `docs/react.md`, and `docs/testing.md` instead of project-specific skills.
- Styling guidance remains with the React rules until it is substantial enough to justify a separate document.
- Carousel images use stable IDs plus URLs; accessibility text can be derived from editor context unless the product later requires authored alt text.
- Shell controls are intentionally static; state-backed selection, section editing, preview rendering, and actions remain in their planned milestones.
- Renamed the selected-widget surface to `WidgetEditorPanel` with a matching “Widget Editor” label.
- Workspace panels use a three-column desktop layout and stack vertically on tablet and mobile.
- Tablet and mobile panels size to their content, with tighter mobile spacing and a stable single-row header.
- Editor and preview files are grouped by product surface, with section editors and section previews owned by their respective surface.
- Textarea color fields accept three- or six-digit hex values without committing invalid drafts; imported colors remain protected by the existing Zod schema.
- Reducer tests cover ID preservation; factory ID generation is not duplicated in reducer coverage.
- CTA links validate and commit on blur; invalid drafts stay local, and the preview remains non-navigating.
- CTA link drafts track canonical URL changes without remounting the editor or disrupting keyboard focus.
- Import feedback uses an accessible status message, and successful imports clear selection through the existing reducer behavior.
- Import feedback uses shadcn Sonner toasts: errors remain dismissible until closed, while success messages dismiss automatically.
- New carousel URL drafts stay local while typing and commit in full on blur or when another image is added.
- Kept `src/index.css` as the single active global stylesheet; Vite does not require
  an `App.css` file.

## Blockers

None.
