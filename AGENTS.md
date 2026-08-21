# Dustbound-catalog

Static Catalog, Events, and Feature flags feeds for Dustbound.

### Catalog

Any catalog changes to the catalog should be reflected in D:\sprites\Dustbound (built-in catalog) also. This is to ensure the app is bundled with the newest version of each.

### Sprite art

Display thumbs under `v1/sprites/` are generated from Dustbound masters (`src/Dustbound/Resources/Raw/sprites`) by `tools/sprite-thumbs` in the Dustbound repo. That CLI writes files only — it does not commit. Publishing is a separate catalog-repo commit.
