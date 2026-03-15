# 🌐 Atomity — Multi-Cloud Topology Dashboard

> A production-quality React single-page application that visualizes multi-cloud infrastructure costs through an interactive topology diagram — with animated connection lines, real-time cost breakdowns, and dark/light mode switching.

---

## 🎯 Feature Overview

This app implements the **Multi-Cloud Topology** visualization from the Atomity cloud optimization product. It provides a single, interactive dashboard view of cost breakdowns across four cloud providers:

| Provider | Position | Brand Color |
|----------|----------|-------------|
| **AWS** | Top-left | `#FF9900` (Orange) |
| **Azure** | Top-right | `#0078D4` (Blue) |
| **Google Cloud** | Bottom-left | `#4285F4` (Blue) |
| **On-Premise** | Bottom-right | `#6B7280` (Gray) |

### Key Interactions
- **Click** any provider node → focuses that provider's cost breakdown in the central panel
- **Click again** → deselects (toggle behavior)
- **Hover** on cost bars → highlights the bar with glow effect
- **Theme toggle** → smooth transition between dark and light mode
- **Provider chips** at the bottom → another way to toggle provider focus

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | React | 18 |
| **Build Tool** | Vite | 8 |
| **Language** | TypeScript | 5.x |
| **Animations** | Framer Motion | 12.x |
| **Data Fetching** | TanStack Query | v5 |
| **Styling** | Tailwind CSS | v4 |
| **Component Libraries** | **None** — all UI built from scratch | — |

---

## 📁 Project Structure

```
src/
├── tokens/
│   └── index.ts              # Design tokens (references CSS variables)
├── styles/
│   ├── variables.css          # CSS custom properties (light + dark themes)
│   └── index.css              # Global styles + Tailwind imports
├── hooks/
│   ├── useCloudData.ts        # TanStack Query hook with DummyJSON fetch + cost mapping
│   └── useTheme.tsx           # Theme context provider + hook
├── lib/
│   └── api.ts                 # Raw fetch function for DummyJSON API
├── components/
│   ├── Navbar.tsx             # Fixed navbar with scroll-blur effect
│   ├── HeroSection.tsx        # Full-viewport hero with staggered animations
│   ├── MultiCloudSection.tsx  # Orchestrator: grid layout + active state + summary bar
│   ├── ProviderNode.tsx       # Octagonal node with inline SVG logos
│   ├── ConnectionLines.tsx    # SVG overlay: animated paths + traveling particles
│   ├── CostPanel.tsx          # Central animated vertical bar chart
│   ├── AnimatedNumber.tsx     # Count-up animation component
│   ├── Badge.tsx              # Reusable pill badge (5 variants)
│   ├── Skeleton.tsx           # Shimmer loading placeholder
│   └── ThemeToggle.tsx        # iOS-style dark/light mode toggle
├── main.tsx                   # React root + QueryClient setup
└── App.tsx                    # Page composition
```

---

## 🎨 Token Architecture

All visual styling flows through a three-layer token system — **zero raw hex values in components**:

```
┌─────────────────────────┐
│  variables.css          │  ← CSS custom properties (:root + .dark)
│  Light & dark themes    │
└────────────┬────────────┘
             │ var(--color-*)
┌────────────▼────────────┐
│  tokens/index.ts        │  ← TypeScript constants referencing CSS vars
│  tokens.colors.*        │
│  providers.*            │
│  resourceTypes.*        │
└────────────┬────────────┘
             │ tokens.colors.accentPrimary
┌────────────▼────────────┐
│  Components             │  ← Consume tokens via style props
│  (ProviderNode, etc.)   │
└─────────────────────────┘
```

### CSS Variables (Light Theme)
```css
--color-bg-primary: #f4f5f7;
--color-surface: #ffffff;
--color-text-primary: #0d0f12;
--color-accent-primary: #22d46a;
--color-aws: #ff9900;
--color-azure: #0078d4;
--color-gcp: #4285f4;
--color-onprem: #6b7280;
```

### CSS Variables (Dark Theme — `.dark` class)
```css
--color-bg-primary: #080a0e;
--color-surface: #111318;
--color-text-primary: #f0f2f7;
--color-accent-primary: #22d46a;
```

---

## 🔌 API Strategy

The app fetches real data from DummyJSON and transforms it into cloud cost data:

```
DummyJSON API (/products?limit=40)
        │
        ▼
  Group by category
        │
        ▼
  Assign groups round-robin to 4 providers
        │
        ▼
  Calculate cost: sum(price × √stock) × scale factor
        │
        ▼
  Split into 5 resources using fixed factors:
    CPU (38%) | GPU (22%) | RAM (18%) | Storage (12%) | Network (10%)
        │
        ▼
  Derive trend, instance count, efficiency
        │
        ▼
  TanStack Query cache (5min stale, 10min GC, 2 retries)
```

---

## 🎬 Animation Approach

Animations are carefully orchestrated with **no simultaneous triggers**:

| Phase | Element | Animation | Timing |
|-------|---------|-----------|--------|
| 1 | Section header | Fade + slide up | `delay: 0s` |
| 2 | Provider nodes | Spring entry from corners | `delay: index × 0.12 + 0.3s` |
| 3 | Service icons | Scale bounce (staggered) | `delay: node + 0.5 + i × 0.1s` |
| 4 | Connection lines | `pathLength` 0 → 1 | `delay: index × 0.15 + 0.4s` |
| 5 | Particles | Travel along paths | After lines drawn (1.2s) |
| 6 | Bar chart | Height 4% → actual% | `delay: index × 0.09 + 0.5s` |
| 7 | Summary bar | Fade + slide up | `delay: 0.3s` (when in view) |

### Animation Design Principles
- ✅ Spring physics for node entry (`stiffness: 200, damping: 22`)
- ✅ Expo-out easing `[0.16, 1, 0.3, 1]` for bars and numbers
- ✅ Never animate everything at once — strict stagger ordering
- ✅ Hover = scale + shadow only (no color flash)
- ✅ Particles travel continuously via `<animateMotion>` — not pulsing in place
- ✅ `prefers-reduced-motion` kills all animations gracefully

---

## 🧩 Component Breakdown

### `ProviderNode` — The octagonal cloud node
- **Octagon shape** via `clip-path: polygon(30% 0%, 70% 0%, ...)`
- **Three service icons** inside (animated in with stagger)
- **Inline SVG logo** below — AWS smile, Azure shape, GCP dots, On-Prem rack
- **Cost display** with `AnimatedNumber` in provider brand color
- **Trend badge** — red ↑ for cost increase, green ↓ for decrease
- **Active state**: border glow + pulsing background + scale 1.06

### `ConnectionLines` — SVG animated paths
- Right-angle elbow paths from each corner to center panel
- `pathLength` animation draws the lines on scroll
- Dotted stroke (`strokeDasharray: 6 8`)
- 3 particles per path via `<animateMotion>`
- Active path: thicker stroke + SVG `feGaussianBlur` glow filter
- Dimmed paths: `opacity: 0.15`

### `CostPanel` — The central bar chart
- 5 vertical bars (CPU, GPU, RAM, Storage, Network)
- Bars animate height with expo-out easing
- Dollar cost above each bar (AnimatedNumber)
- Footer: Instances | Efficiency % | Share %
- Provider-colored border + box-shadow glow when active
- `AnimatePresence` remounts bars when provider changes (re-triggers animation)

### `AnimatedNumber` — Count-up component
- Uses Framer Motion's `animate()` utility (not CSS)
- Formats: ≥1000 → `$2.1k`, <1000 → `$842`
- `aria-live="polite"` for screen readers

---

## 🌓 Dark Mode

| Aspect | Implementation |
|--------|---------------|
| **Storage** | `localStorage` key `atomity-theme` |
| **Fallback** | `prefers-color-scheme` media query |
| **Mechanism** | `.dark` class on `<html>` + CSS variable swap |
| **Transition** | `transition: color 0.3s, background-color 0.3s` on all elements |
| **Toggle** | iOS-style pill button with Framer Motion spring thumb |

---

## 🏗 Modern CSS Features Used

| Feature | Where Used |
|---------|-----------|
| `clamp()` | Fluid typography, spacing, component sizes |
| `color-mix()` | Dynamic opacity on theme colors (10%, 30%, 50%) |
| Container queries | CostPanel — hides resource labels at narrow widths |
| `:has()` | Bar row highlights when child bar is hovered |
| Logical properties | `padding-block`, `padding-inline`, `margin-inline` |
| `clip-path` | Octagonal node shapes |

---

## ♿ Accessibility

- `<section aria-labelledby="multicloud-heading">` on topology section
- `<h2 id="multicloud-heading">` for heading association
- Provider nodes: `<button aria-pressed="true/false" aria-label="AWS — $3,200/mo. Click to focus.">`
- Bar chart: `role="img" aria-label="Resource cost bar chart"`
- AnimatedNumber: `<span aria-live="polite">`
- All interactive elements: visible `:focus-visible` outlines
- `prefers-reduced-motion`: all Framer Motion animations disabled

---

## 📱 Responsive Layout

| Breakpoint | Layout |
|-----------|--------|
| **Desktop (1280px+)** | 3-column grid — nodes at corners, chart center, SVG connection lines overlay |
| **Tablet (768–1023px)** | 2-column grid — top row (AWS + Azure), center (CostPanel full-width), bottom row (GCP + OnPrem) |
| **Mobile (<640px)** | Single column stack — AWS → Azure → CostPanel → GCP → OnPrem. Connection lines hidden |

---

## ⚖️ Tradeoffs

| Decision | Rationale |
|----------|-----------|
| **DummyJSON** as data source | Demonstrates TanStack Query + data transformation without requiring real cloud APIs |
| **Inline SVG** logos | Simplified provider logos — avoids external image dependencies, works offline |
| **`style` props** over CSS Modules | Direct token consumption; CSS Modules would improve perf at scale |
| **Connection lines hidden on mobile** | SVG viewBox coordinates don't map to stacked layouts |
| **Global `* { transition }` rule** | Smooth theme switching everywhere — minor perf cost |

---

## 🚀 What to Improve with More Time

- Real WebSocket connection for live cost streaming
- Drag-to-rearrange provider nodes
- Drill-down modal when clicking a cost bar (individual resource details)
- Animated transitions between responsive breakpoints
- E2E tests with Playwright
- Storybook for component documentation
- CSS Modules for better style isolation
- Service worker for offline support
- Accessibility audit with axe-core
- Performance profiling with React DevTools

---

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

```bash
npm run build
```

Deploy the `dist/` folder to **Vercel** or **Netlify** — no environment variables required.

---

## 📝 License

© 2025 Atomity GmbH
