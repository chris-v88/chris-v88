# TODO

> This is a list of tasks and issues to be addressed in the project - reviewed by Claude AI

**Overall:** a solid personal project. It already has habits many juniors skip — strict TypeScript,
ESLint, Prettier, Husky, PR branches, feature flags with expiry dates, and a small UI kit.

The weak spots are the usual ones for a project that grew piece by piece:

| Problem | Example |
| --- | --- |
| 🪦 Dead code | 4 components that are never rendered |
| 📄 Stale docs | `/docs` describes a flag that no longer exists |
| 📋 Copy-paste | The same link buttons repeated 6 times |
| 🐛 Uncaught bugs | No tests or CI to catch them |

**Contents**

1. [Bugs that are live right now](#-bugs-that-are-live-right-now)
2. [Architecture](#%EF%B8%8F-architecture)
3. [Suggested directory structure](#-suggested-directory-structure)
4. [Hard-coded values](#-hard-coded-values)
5. [Type safety](#-type-safety)
6. [Outdated documentation](#-outdated-documentation)
7. [Leftover config](#-leftover-config)
8. [What to do, in order](#-what-to-do-in-order)
9. [How to grow as an engineer](#-how-to-grow-as-an-engineer)

---

## 🐛 Bugs that are live right now

### 1. The JS bundle is 828 KB for a one-page portfolio

> [!CAUTION]
> `npm run build` → `index.js  827.72 kB │ gzip: 230.22 kB`

The wildcard import in [`Icon.tsx`](src/components/ui/Icon.tsx) and
[`SimpleCard.tsx`](src/components/ui/SimpleCard.tsx) pulls in **every** Lucide icon.

```tsx
// ❌ Before: ships the whole icon library
import * as LucideIcons from 'lucide-react';

// ✅ After: ships only the ~12 icons you use
import { Calendar, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, X, Youtube } from 'lucide-react';

const icons = { Calendar, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, X, Youtube };
export type IconName = keyof typeof icons;
```

- [ ] Replace the wildcard import with an explicit icon map
- [ ] Re-run `npm run build` and confirm the size drop

### 2. The "hidden" links aren't hidden any more

> [!WARNING]
> `ENABLE_HIDDEN_LINK` expired on **2026-07-20**. Your own rule says an expired flag is forced **on**,
> so `/config` and `/wiki` are visible to every visitor.

```json
// src/data/flags.json
{ "name": "ENABLE_HIDDEN_LINK", "enabled": true, "expires": "2026-07-20" }
```

- [ ] Remove the flag, as you did for `ENABLE_REWRITE_2026`, **or**
- [ ] Rethink what "expired" means for a feature that's supposed to stay hidden

### 3. Two projects show broken images

`Scam Detector` and `Web Game Series` have `"image": null`, but `Project.image` is typed as `string`.
The `as Project[]` cast in [`Projects.tsx`](src/pages/Projects.tsx) hides the mismatch
(see [Type safety](#-type-safety)).

```tsx
// ✅ Make the type honest, then guard the render
image: string | null;

{project.image && <img src={project.image} alt={project.title} />}
```

- [ ] Fix the type and show a placeholder when there's no image

### 4. React key warning in `Hero`

In [`Hero.tsx`](src/pages/Hero.tsx), the `<>` fragment inside `.map` has no key.
A key on the child elements doesn't count.

```tsx
// ❌ Before
{techStack.map((tech, i) => (
  <>
    <Text key={tech}>…</Text>
  </>
))}

// ✅ After
import { Fragment } from 'react';

{techStack.map((tech, i) => (
  <Fragment key={tech}>
    <Text>…</Text>
  </Fragment>
))}
```

- [ ] Use a keyed `Fragment`

### 5. The modal backdrop is probably solid black

`bg-opacity-*` is Tailwind v3 syntax; it was removed in v4.

```diff
  // src/components/ui/Modal.tsx
- className="... bg-black bg-opacity-50 ..."
+ className="... bg-black/50 ..."
```

> [!NOTE]
> Not checked in a browser yet.

- [ ] Fix in [`Modal.tsx`](src/components/ui/Modal.tsx)

### 6. The favicon path is wrong

`//w-logo.png` is a protocol-relative URL, so the browser asks a **host** named `w-logo.png` for it.

```diff
  <!-- index.html -->
- <link rel="icon" type="image/svg+xml" href="//w-logo.png" />
+ <link rel="icon" type="image/png" href="/w-logo.png" />
```

- [ ] Fix in [`index.html`](index.html)

### 7. `HiddenMenu` opacity looks like a typo

`hover:opacity-5` makes the button nearly vanish on hover, and `opacity-3` is almost invisible.

```diff
  // src/components/HiddenMenu.tsx
- 'hover:opacity-5'
+ 'hover:opacity-100'

- closed: 'opacity-3',
+ closed: 'opacity-30',
```

- [ ] Confirm the intended values in [`HiddenMenu.tsx`](src/components/HiddenMenu.tsx)

---

## 🏛️ Architecture

### Dead and duplicated code

| What | Where | Action |
| --- | --- | --- |
| `ProjectCard`, `ProjectModal`, `ExperienceCard`, `SimpleCard` | `src/components/` | Never rendered → delete (move the `Project` type first) |
| Inline card + modal | [`Projects.tsx`](src/pages/Projects.tsx) | Re-implements the two components above |
| A third `formatDate` | `ExperienceCard.tsx` | Keep only [`helpers.ts`](src/utils/helpers.ts) |
| Work vs. education cards | [`Experience.tsx`](src/pages/Experience.tsx) | ~90% the same → extract `<TimelineCard />` |
| Code / Live Demo / Video buttons | `Projects.tsx`, **6×** | Extract `<ProjectLinks />` |

A data-driven `ProjectLinks` replaces the copy-paste:

```tsx
// features/projects/ProjectLinks.tsx
const LINKS = [
  { key: 'github',  icon: 'Github',       label: 'Code',      tone: 'info' },
  { key: 'live',    icon: 'ExternalLink', label: 'Live Demo', tone: 'info' },
  { key: 'youtube', icon: 'Youtube',      label: 'Video',     tone: 'caution' },
] as const;
```

> [!TIP]
> Once you rewrite something, delete the old version **in the same PR**. Git keeps the history.

- [ ] Delete the unused components
- [ ] Extract `ProjectLinks`
- [ ] Extract `TimelineCard`

---

## 📁 Suggested directory structure

`pages/` holds two different kinds of thing:

- **Sections** of one page → `Hero`, `Experience`, `Projects`, `Contact`
- **Routes** → `Config`, `Wiki`, `Docs`

```text
src/
├── app/              App.tsx, routes.ts
├── routes/           Home, Config, Wiki, Docs
├── features/
│   ├── projects/     ProjectsSection, ProjectCard, ProjectModal, ProjectLinks, project.types.ts
│   ├── experience/   ExperienceSection, TimelineCard
│   └── flags/        featureFlags.ts, FeatureFlag.tsx, useFlag.ts
├── components/ui/    design-system parts only (Button, Card, Text, Icon, Modal)
├── content/          typed data (about.ts, projects.ts, …)
└── config/           site.ts (resume path, social links)
```

> **Rule:** group code by *feature*, not by *kind of file*.
> That way `ProjectCard` stops living in `components/projects/` while `ui/index.ts` re-exports it.

### Routes are listed in two places

The routes in [`App.tsx`](src/App.tsx) and the rewrites in [`vercel.json`](vercel.json) must be
kept in sync by hand. One catch-all rewrite removes that:

```json
"rewrites": [
  { "source": "/version", "destination": "/version.json" },
  { "source": "/(.*)", "destination": "/index.html" }
]
```

A router library isn't worth it until you have real nested routes.

- [ ] Move files into the new layout
- [ ] Replace the per-route rewrites with one catch-all

---

## 🔒 Hard-coded values

> [!IMPORTANT]
> The resume path `/docs/Chris-Vo_resume-04-2026.pdf` appears **4 times**
> (`Hero`, `Navbar` ×2, `Footer`). Every new resume means editing 4 files.

```ts
// src/config/site.ts
export const site = {
  resume: '/docs/Chris-Vo_resume-04-2026.pdf',
  github: 'https://github.com/chris-v88',
  linkedin: 'https://www.linkedin.com/in/chrisvo3/',
} as const;
```

**Colors:** `#A51919` and `#22388C` are hard-coded in `Card`, `colors.ts`, `Text`, `Wiki` and
`Config`, even though `--rw-btn-primary` already exists in [`index.css`](src/index.css).
Tailwind v4 lets you define them once:

```css
/* src/index.css */
@theme {
  --color-brand: #a51919;
  --color-brand-dark: #8b1515;
  --color-pill: #22388c;
}
```

```diff
- className="bg-[#A51919] hover:bg-[#8B1515]"
+ className="bg-brand hover:bg-brand-dark"
```

- [ ] Create `site.ts` and use it everywhere
- [ ] Delete the old PDFs (`-01-2026`, `-02-2026`) in `public/docs/`
- [ ] Add `@theme` tokens and replace the hex literals
- [ ] Fix `body { background: #fff }`, which fights the dark theme

---

## 🧷 Type safety

Type safety stops at the JSON boundary. Every `data.json as Type[]` is an **unchecked claim** —
that's how [bug #3](#3-two-projects-show-broken-images) got through.

```ts
// ❌ Before: src/pages/Projects.tsx, the compiler trusts you blindly
const projects = projectsData.projects as Project[];

// ✅ After: src/content/projects.ts, the compiler checks every entry
export const projects = [
  { id: '6', title: 'Scam Detector', image: null /* … */ },
] satisfies Project[];
```

Alternatively, validate the JSON at runtime with [zod](https://zod.dev), which you already list on
your resume.

- [ ] Convert `src/data/*.json` → `src/content/*.ts`

---

## 📄 Outdated documentation

> [!WARNING]
> [`Docs.tsx`](src/pages/Docs.tsx) still describes `ENABLE_REWRITE_2026` and an `isRewrite()` check
> inside `Button`. Both have been removed.
>
> Documentation that's wrong is worse than none.

- [ ] Keep docs next to the code they describe (e.g. `features/flags/README.md`), **or**
- [ ] Add "docs updated?" to your PR checklist

---

## 🧹 Leftover config

| File | Issue | Fix |
| --- | --- | --- |
| [`tailwind.config.js`](tailwind.config.js) | Ignored by v4 unless loaded with `@config` | Delete |
| [`postcss.config.js`](postcss.config.js) | `autoprefixer` is redundant in v4 | Remove the plugin |
| [`.husky/pre-commit`](.husky/pre-commit) | Lints the whole repo; `lint-staged` is configured but unused | Run `npx lint-staged` |
| [`Button.tsx`](src/components/ui/Button.tsx) | `any` + `eslint-disable` | Type it as a button-or-link union |

---

## ✅ What to do, in order

### Step 1 — Quick fixes · ~1 hour

- [ ] Bugs 1–7
- [ ] Catch-all rewrite
- [ ] Delete the dead components and old PDFs

### Step 2 — Safety net

- [ ] GitHub Actions: `lint`, `tsc -b` and `build` on every PR

```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run build   # runs tsc -b first
```

- [ ] [Vitest](https://vitest.dev) — start with [`featureFlags.ts`](src/utils/featureFlags.ts), a pure function with branching logic

```ts
// src/utils/featureFlags.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isFlagActive, setFlagOverride } from './featureFlags';

describe('isFlagActive', () => {
  beforeEach(() => localStorage.clear());

  it('returns false for unknown flags', () => {
    expect(isFlagActive('NOPE')).toBe(false);
  });

  it('forces true once expired, ignoring overrides', () => {
    vi.setSystemTime(new Date('2099-01-01'));
    setFlagOverride('ENABLE_HIDDEN_LINK', false);
    expect(isFlagActive('ENABLE_HIDDEN_LINK')).toBe(true);
  });
});
```

- [ ] One smoke test that renders `<App />`

### Step 3 — Structure

- [ ] Feature-folder layout
- [ ] Typed content files
- [ ] `site.ts` config

### Step 4 — Polish

- [ ] Design tokens in `@theme`
- [ ] A `cn()` helper:

  ```ts
  export const cn = (...classes: (string | false | null | undefined)[]) =>
    classes.filter(Boolean).join(' ');
  ```

- [ ] Focus trapping in the modal
- [ ] Project cards are clickable `<div>`s, so keyboard users can't open them → use a `<button>` or a link

### Step 5 — README

The current [`README.md`](README.md) is your GitHub **profile**. A reviewer or hiring manager wants:

```md
# chris-v88 — Portfolio

## Stack
React 19 · TypeScript · Vite · Tailwind v4 · Vercel

## Run
npm install && npm run dev

## Architecture
…

## Decisions
- Why feature flags with expiry → …
- Why no router → …
```

- [ ] Rewrite the README

---

## 🌱 How to grow as an engineer

> [!TIP]
> Every bug above would have shown up with `npm run build` and the browser console open.

1. **Finish the cleanup.** You did this well for the rewrite flag; make it a habit for every flag and rewrite.
2. **Check your assumptions.** Look at the bundle size, the console warnings and the type casts.
3. **Write down _why_, not _what_.** A short `docs/decisions.md` ("why feature flags with expiry",
   "why no router") is the kind of thinking interviewers look for in senior candidates.
   See [ADRs](https://adr.github.io/) for a lightweight format.
4. **Ship small PRs that each do one thing.** Your recent history (`clean up hero`, `clean up exp`, …)
   is already heading that way. Add a one-line description of the reason for each.
