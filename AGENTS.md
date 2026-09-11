# Dustbound-catalog

Static Catalog, Events, and Feature flags feeds for Dustbound.

### Catalog

Any catalog changes should also land in [IngeniumSE/Dustbound](https://github.com/IngeniumSE/Dustbound) (`src/Dustbound.Core/Catalog/Seed/catalog.json`) so the app seed and this feed stay in lockstep.

### Sprite art

Discover, generate, or ship new Sprite / Variant portraits: Dustbound `docs/agents/sprite-art.md`.

Display thumbs under `v1/sprites/` are generated from Dustbound masters (`src/Dustbound/Resources/Raw/sprites`) by `tools/sprite-thumbs` in the Dustbound repo. That CLI writes files only — it does not commit. Publishing is a separate catalog-repo commit.
