# Dustbound-catalog

Static Catalog + Events feeds for [Dustbound](https://github.com/IngeniumSE) (Fortnite Sprites checklist app).

## Feed URLs

```text
https://ingeniumse.github.io/Dustbound-catalog/v1/catalog.json
https://ingeniumse.github.io/Dustbound-catalog/v1/events.json
```

## Catalog contract

- `schemaVersion` / `catalogVersion`
- `sprites[]`, `variants[]`, `collectibles[]`
- Collectible id: `{spriteSlug}:{variantCode}`
- `availability`: `live` | `vaulted`
- Never delete published Collectible ids

## Events contract

- `schemaVersion` / `eventsVersion`
- `events[]` with: `id`, `title`, `summary?`, `startUtc`, `endUtc?`, `spriteIds?`, `collectibleIds?`, `sourceUrl?`
- **UTC only** in the feed (ISO-8601)
- Curate by hand; set `sourceUrl` for attribution; **do not scrape X**
- Bump `eventsVersion` on each publish

## Publish workflow

### Catalog
1. Edit source or run `node scripts/generate-catalog.js` if regenerating from the matrix in that script.
2. Bump `catalogVersion` in `v1/catalog.json`.
3. Merge to `main`.
4. GitHub Pages serves the file.

### Events
1. Edit `v1/events.json` (add/update Event rows; original titles/summaries; UTC times; `sourceUrl`).
2. Bump `eventsVersion`.
3. Merge to `main`.
4. GitHub Pages serves the file.

## First catalog feed

Generated 2026-08-03 from Dustbound research seed **02-seed-catalog-c7s3** (24 Sprites / 109 Collectibles, `C7S3`, as-of 2026-07-31). All rows `availability: live`. `recallDustCost` values are approximate.

## Events feed

`eventsVersion` 2 includes sample curated rows for Dustbound UI/dev (past / active / upcoming). Replace with real windows before store publish; always bump `eventsVersion` on publish.
