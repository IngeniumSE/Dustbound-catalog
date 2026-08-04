// One-shot generator — Dustbound-catalog first feed from C7S3 seed research
const fs = require("fs");
const path = require("path");

const schemaVersion = 1;
const catalogVersion = 2;

const variants = [
  { code: "Base", bonusSummary: "" },
  { code: "Gold", bonusSummary: "3× bonus XP from eliminations" },
  { code: "Gummy", bonusSummary: "+20% Sprite Dust on successful extraction" },
  { code: "Galaxy", bonusSummary: "+30% ammo when looting" },
  { code: "Holofoil", bonusSummary: "Squad-wide ~5% better chance to find rare Sprite Variants from chests" },
  { code: "Gem", bonusSummary: "−30% fall damage" },
  { code: "Quack", bonusSummary: "When Quack earns Sprite XP, other Sprites in inventory gain +50% of that XP" },
  { code: "Cube", bonusSummary: "Overdrive while in the Storm" },
];

const sprites = [
  { id: "water", name: "Water Sprite", rarity: "Rare", abilitySummary: "Replenish shield for user + nearby squad while in water" },
  { id: "earth", name: "Earth Sprite", rarity: "Rare", abilitySummary: "Chance of additional rare items from chests" },
  { id: "fire", name: "Fire Sprite", rarity: "Rare", abilitySummary: "Fiery burst after dealing enough damage" },
  { id: "fishy", name: "Fishy Sprite", rarity: "Rare", abilitySummary: "Faster swim; brief move-speed boost when damaged" },
  { id: "air", name: "Air Sprite", rarity: "Rare", abilitySummary: "Faster sprint, higher jump; nullifies fall damage" },
  { id: "duck", name: "Duck Sprite", rarity: "Epic", abilitySummary: "Emoting or Jamming replenishes shield" },
  { id: "ghost", name: "Ghost Sprite", rarity: "Epic", abilitySummary: "Cloak for a short duration on reload" },
  { id: "demon", name: "Demon Sprite", rarity: "Epic", abilitySummary: "Siphon health + shield on elimination" },
  { id: "king", name: "King Sprite", rarity: "Epic", abilitySummary: "Increased Pickaxe damage" },
  { id: "aura", name: "Aura Sprite", rarity: "Epic", abilitySummary: "Shock Rock charge after dealing enough damage" },
  { id: "striker", name: "Striker Sprite", rarity: "Epic", abilitySummary: "Overdrive on mantle / hurdle / wall scramble" },
  { id: "dream", name: "Dream Sprite", rarity: "Legendary", abilitySummary: "Random item each level-up; Legendary loot at max, then auto-extract / reset" },
  { id: "punk", name: "Punk Sprite", rarity: "Legendary", abilitySummary: "At high/mastery level, chance of unlimited ammo" },
  { id: "boss", name: "Boss Sprite", rarity: "Legendary", abilitySummary: "Boosts max Health and Shield" },
  { id: "seven", name: "Seven Sprite", rarity: "Legendary", abilitySummary: "Enemy foot trails visible to nearby squad" },
  { id: "llama", name: "Lootin' Llama Sprite", rarity: "Legendary", abilitySummary: "Opening ammo boxes can upgrade weapon" },
  { id: "peely", name: "Peeky Peely Sprite", rarity: "Legendary", abilitySummary: "Pings nearby rare Sprite variants / carriers; also reveals you" },
  { id: "zero_point", name: "Zero Point Sprite", rarity: "Mythic", abilitySummary: "Shield Bubble Jr. when using a healing item (excl. splashes/grenades)" },
  { id: "burnt_peanut", name: "Burnt Peanut", rarity: "Mythic", abilitySummary: "Chance of extra (sometimes Mythic) loot on eliminations" },
  { id: "grim", name: "Grim Sprite", rarity: "Mythic", abilitySummary: "Attackers are marked / scanned briefly" },
  { id: "batman", name: "Batman Sprite", rarity: "Mythic", abilitySummary: "Launch + deploy Bat Cape midair; better rare Sprite finds" },
  { id: "vini_jr", name: "Vini Jr. Sprite", rarity: "Mythic", abilitySummary: "Sprint enables destructive slide; slide-kick buffs fire rate / reload" },
  { id: "pollo", name: "Pollo Sprite", rarity: "Mythic", abilitySummary: "Eliminations slowly restore shield for user + nearby squad" },
  { id: "john_wick", name: "John Wick Sprite", rarity: "Mythic", abilitySummary: "After knock/elim, briefly reveal nearby enemies to squad" },
  { id: "ironmouse", name: "Ironmouse Sprite", rarity: "Mythic", abilitySummary: "While regenerating, gain Cloak and low gravity" },
];

// spriteId -> variant codes (seed matrix 2026-07-31)
const matrix = {
  water: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil", "Quack"],
  earth: ["Base", "Gold", "Gummy", "Galaxy", "Cube", "Quack"],
  fire: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil", "Cube", "Quack"],
  fishy: ["Base", "Gold", "Gummy", "Galaxy", "Cube"],
  air: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil"],
  duck: ["Base", "Gold", "Gummy", "Galaxy"],
  ghost: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil"],
  demon: ["Base", "Gold", "Gummy", "Galaxy"],
  king: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil"],
  aura: ["Base", "Gold", "Gummy", "Galaxy"],
  striker: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil"],
  dream: ["Base", "Gold", "Gummy", "Galaxy", "Cube"],
  punk: ["Base", "Gold", "Gummy", "Galaxy", "Cube"],
  boss: ["Base", "Gold", "Gummy", "Galaxy", "Cube"],
  seven: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil"],
  llama: ["Base", "Gold", "Gummy", "Galaxy", "Gem"],
  peely: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil"],
  zero_point: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil", "Cube", "Quack"],
  burnt_peanut: ["Base"],
  grim: ["Base", "Gold", "Gummy", "Galaxy", "Cube", "Holofoil"],
  batman: ["Base", "Gold", "Gummy", "Galaxy", "Holofoil", "Cube"],
  vini_jr: ["Base"],
  pollo: ["Base"],
  john_wick: ["Base"],
  ironmouse: ["Base"],
};

function recallDustCost(spriteId, variantCode) {
  if (variantCode === "Base") return 100;
  // Air specials often cheaper per guides; others ~4000 (patch-variable)
  if (spriteId === "air") return 2000;
  return 4000;
}

const collectibles = [];
for (const [spriteId, codes] of Object.entries(matrix)) {
  for (const variantCode of codes) {
    collectibles.push({
      id: `${spriteId}:${variantCode}`,
      spriteId,
      variantCode,
      seasonTag: "C7S3",
      availability: "live",
      recallDustCost: recallDustCost(spriteId, variantCode),
    });
  }
}

if (sprites.length !== 25) throw new Error(`expected 25 sprites, got ${sprites.length}`);
if (collectibles.length !== 110) throw new Error(`expected 110 collectibles, got ${collectibles.length}`);

const doc = {
  schemaVersion,
  catalogVersion,
  meta: {
    season: "C7S3",
    asOf: "2026-07-31",
    researched: "2026-08-03",
    source: "Dustbound seed research 02-seed-catalog-c7s3 (fortnitespritetracker matrix + Epic/Wiki abilities)",
    notes: "recallDustCost values are approximate and may change with patches; update via catalogVersion bumps.",
  },
  sprites,
  variants,
  collectibles,
};

const out = path.join(__dirname, "..", "v1", "catalog.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(doc, null, 2) + "\n", "utf8");
console.log(`Wrote ${out}`);
console.log(`sprites=${sprites.length} variants=${variants.length} collectibles=${collectibles.length}`);
