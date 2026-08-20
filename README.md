# Dustbound-catalog

Static Catalog, Events, Feature flags, and Lobby Hacks feeds for [Dustbound](https://github.com/IngeniumSE) (Fortnite Sprites checklist app).

## Feed URLs

```text
https://ingeniumse.github.io/Dustbound-catalog/v1/catalog.json
https://ingeniumse.github.io/Dustbound-catalog/v1/events.json
https://ingeniumse.github.io/Dustbound-catalog/v1/features.json
https://ingeniumse.github.io/Dustbound-catalog/v1/lobby-hacks.json
```

## Catalog contract

- `schemaVersion` / `catalogVersion` (current: schema **3**, bump `catalogVersion` on each publish)
- `seasons[]` with: `tag`, `startUtc`, optional `endUtc` (omit when end not confirmed), optional `spriteOrder` (Sprite id list for In-game checklist sort; schema 3+)
- `achievements{}` (schema 2+): catalog-driven Achievement availability (`completeSprites`, `completeVariants`, `completeSeasons`, `allCollectedAvailable`, `allTimeAvailable`, `disableAchievement`)
- `sprites[]`, `variants[]`, `collectibles[]`
- Collectible id: `{spriteSlug}:{variantCode}`
- `availability`: `live` | `vaulted`
- `recallDustCost`: Sprite Dust to recall/summon that Collectible
- `dropChancePercent` (optional): Sprite Chest drop chance as a percent number (e.g. `4.45` = 4.45%); omit when unknown
- Never delete published Collectible ids
- Season window is half-open: active when `startUtc <= now < endUtc` (omit `endUtc` when unknown). Adjacent seasons may share a boundary instant (e.g. C7S3 ends and C7S4 starts at the same UTC)
- App checklist defaults to Collectibles in active seasons unless the user picks season filters
- In-game checklist sort uses each Season’s `spriteOrder`; All Seasons sorts by Season tag descending, then that order

## Events contract

- `schemaVersion` / `eventsVersion`
- `events[]` with: `id`, `title`, `summary?`, `startUtc`, `endUtc?`, `spriteIds?`, `collectibleIds?`, `sourceUrl?`
- **UTC only** in the feed (ISO-8601)
- Omit `endUtc` when the window runs until the same clock time next day — the app treats missing end as `startUtc + 1 day`
- Curate by hand; set `sourceUrl` for attribution; **do not scrape X**
- Bump `eventsVersion` on each publish

## Features contract

- `schemaVersion` / `featuresVersion`
- `features` object keyed by id: booleans (`pairing`, `seasonHub`) and integers (`outboxHelpLimit`, `inboxHelpLimit`)
- Known ids: `pairing` (Pairing Inbox / Outbox / Leaderboards), `seasonHub` (Season hub host chip). Missing boolean keys are treated as **enabled** (fail-open)
- Set `pairing` to `false` to pause Pairing during maintenance without an app store release
- Set `seasonHub` to `false` to hide the Season hub chip (no paused card)
- `outboxHelpLimit` / `inboxHelpLimit` (default **3** when omitted) cap how many Help requests a user can seek and how many they can help with. Caps are independent. Negatives are treated as 0
- Bump `featuresVersion` on each publish

## Lobby Hacks contract

- `schemaVersion` / `lobbyHacksVersion` (schema **1**)
- `hacks[]` with required `id`, `code`, `reward`, `seasonTag`; optional `collectibleId` (`{spriteSlug}:{variantCode}`)
- Remote same-or-newer `lobbyHacksVersion` replaces (republish can drop a row). App seed only replaces cache when strictly newer
- Hub lists rows whose `seasonTag` matches the live Season pack. Used marks live on device, not in this file
- Bump `lobbyHacksVersion` on each publish

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

### Features
1. Edit `v1/features.json` (toggle flags).
2. Bump `featuresVersion`.
3. Merge to `main`.
4. GitHub Pages serves the file.

### Lobby Hacks
1. Edit `v1/lobby-hacks.json` (add/update rows; keep `id` stable).
2. Bump `lobbyHacksVersion`.
3. Merge to `main`.
4. GitHub Pages serves the file.

## First catalog feed

Generated 2026-08-03 from Dustbound research seed **02-seed-catalog-c7s3** (24 Sprites / 109 Collectibles, `C7S3`, as-of 2026-07-31). All rows `availability: live`. `recallDustCost` values are approximate.

## Events feed

`eventsVersion` 13 curated windows (Mastery Monday, New Sprites, Gem Hours, Mythic Sprite Hours, Fortnite: Unstable, Galaxy / Holo / Cube / Gem Hours, Fortnite: Override, Golden Hours). Always bump `eventsVersion` on publish.

## Features feed

`featuresVersion` 4 with `pairing: true`, `seasonHub: true`, `outboxHelpLimit: 3`, `inboxHelpLimit: 3`. Always bump `featuresVersion` on publish.

## Lobby Hacks feed

`lobbyHacksVersion` 1 — C7S4 launch codes. Always bump `lobbyHacksVersion` on publish.
