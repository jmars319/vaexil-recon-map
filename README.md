# @vaexil/recon-map

Shared recon map engine for the Vaexil map sites. It holds the React/Next viewer components, the admin capture and public suggestion UI, and the supporting data/storage/validation layer that the map sites had been maintaining as byte-identical copies. This package is the single source of truth for that engine; the sites consume it and keep only their game-scoped data and app-local wiring.

## What's in it

Twenty-one engine modules, exported individually as `@vaexil/recon-map/<name>`:

- **Data / storage / validation:** `db`, `recon-asset-storage`, `recon-local-asset-storage`, `recon-viewer-data`, `repository-row`, `types`, `utils`, `validation`.
- **Components:** `recon-map-viewer`, `recon-map-surface`, `recon-map-controls`, `recon-map-viewer-types`, `recon-map-layer-data`, `recon-marker-detail-panel`, `recon-progress-storage`, `recon-coordinate-capture`, `recon-map-suggestion-form`, `recon-public-map-preview`, `recon-source-notes`, `recon-how-to-guides`, `ui`.
- **Seam types:** `source-types` (the source-review shapes the source-notes panel renders), and `ReconMarkerSuggestionAction` in `types`.

Everything is named exports; there are no default exports.

## Seams the apps own

The engine is import-closed except for two seams each app fills in:

1. **Source-review data.** `recon-source-notes` renders `ReconSourcePacket` / `ReconSourceCrossCheck` shapes but takes them as props. Each app keeps its own `data/recon/*` data; structural typing keeps it compatible.
2. **Server actions.** The suggestion flows are Next server actions that live in each app. Pass them in:
   - `ReconCoordinateCapture` — `submitAction` (admin marker suggestions).
   - `ReconPublicMapPreview` / `ReconMapViewer` — `suggestionAction` (public marker suggestions), threaded down to the lazily-loaded `ReconMapSuggestionForm`.

   Both actions have the shape `ReconMarkerSuggestionAction = (previousState: ActionState, formData: FormData) => Promise<ActionState>`.

## Distribution

Consumed as a git dependency pinned to a tag, with `dist/` committed so no install-time build runs on the consumer:

```jsonc
// in each app's package.json
"@vaexil/recon-map": "github:jmars319/vaexil-recon-map#v1.0.0"
```

`react`, `react-dom`, `next`, and `lucide-react` are peer dependencies supplied by the consuming app.

## Build

```
npm run verify   # typecheck + emit dist (.js + .d.ts, "use client" preserved)
```
