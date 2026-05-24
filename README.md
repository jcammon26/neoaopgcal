# Roblox Game Damage Calculator

A Next.js app for calculating damage and optimizing builds in Roblox anime games. Three calculators in one project:

- **AOPG** — *A One Piece Game*. Accessories, active/passive buffs, six move-damage tables, multi-scale damage system.
- **Verse** — *Verse Piece*. Stat allocation, ghost rank, accessories with enhancement, traits, four move types (sword / fruit / fighting / spec).
- **Pirate** — newest calculator. 18-stat `BaseBuff` system, race/clan/trait + aura + avatar (with level scaling) + milestone tiles, click-any-stat-to-maximize.

## Tech

- Next.js 15 (Turbopack) + React 19 + TypeScript
- Tailwind CSS 4 + DaisyUI 5

## Install

```bash
git clone <repository-url>
cd aopg-calculator
npm install
```

(`yarn`, `pnpm`, and `bun` also work — pick whichever you have.)

## Run

```bash
npm run dev      # dev server with hot reload — http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Use

1. Open [http://localhost:3000](http://localhost:3000).
2. Pick a calculator from the home page (AOPG / Verse / Pirate).
3. Set your base stats, choose buffs, equip accessories. Numbers update live.
4. In the Pirate calculator, click any stat in the Stats Overview panel to auto-pick the race/clan/trait/aura/avatar/milestones combo that maximizes it.

## Project layout

```
src/app/
├── page.tsx          # home page (calculator picker)
├── aopg/             # AOPG calculator
│   ├── views/
│   ├── data/         # accessories/, buffs/active/, buffs/passive/, moves/
│   ├── hooks/
│   └── utils/
├── verse/            # Verse calculator
│   ├── views/
│   └── data/         # passive/, stat_related/, moves/
└── pirate/           # Pirate calculator
    ├── views/
    └── data/passive/ # races, clans, traits, auras, avatars
```

## Adding or editing data

See [customization.md](customization.md) for the full schema reference and step-by-step instructions for each calculator.

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/my-thing`.
3. Commit and push.
4. Open a PR.

## Contact

Discord: **kingcode99**

## License

Personal/educational use. Game data belongs to the respective Roblox game developers.
