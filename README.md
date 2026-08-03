# Dustbound-catalog

Static Catalog API feed for [Dustbound](https://github.com/) (Fortnite Sprites checklist app).

## Feed URL (after GitHub Pages is enabled)

```text
https://<github-user>.github.io/Dustbound-catalog/v1/catalog.json
```

## Contract

- `schemaVersion` / `catalogVersion`
- `sprites[]`, `variants[]`, `collectibles[]`
- Collectible id: `{spriteSlug}:{variantCode}`
- `availability`: `live` | `vaulted`
- Never delete published Collectible ids

See Dustbound ADRs / schema tickets in the app repo.

## Publish workflow

1. Edit source or run `node scripts/generate-catalog.js` if regenerating from the matrix in that script.
2. Bump `catalogVersion` in `v1/catalog.json`.
3. Merge to `main`.
4. GitHub Pages serves the file.

## First feed

Generated 2026-08-03 from Dustbound research seed **02-seed-catalog-c7s3** (24 Sprites / 109 Collectibles, `C7S3`, as-of 2026-07-31). All rows `availability: live`. `recallDustCost` values are approximate.

## Enable GitHub Pages (one-time)

1. Create empty GitHub repo named `Dustbound-catalog` (public).
2. From this folder:

```bash
git remote add origin https://github.com/<github-user>/Dustbound-catalog.git
git push -u origin main
```

3. Repo **Settings → Pages →** Deploy from branch **`main`** / folder **`/`** (root).
4. Confirm `https://<github-user>.github.io/Dustbound-catalog/v1/catalog.json` returns JSON.
