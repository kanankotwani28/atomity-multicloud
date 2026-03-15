# ATOMITY — Frontend Engineering Challenge

A scroll-triggered frontend interpretation of Atomity's cloud optimization platform, built as a single-page React application with animated multi-cloud cost intelligence visuals.

## Live Links

- GitHub Repository: https://github.com/kanankotwani28/atomity-multicloud
- Live Demo: https://atomity-multicloud-9stv.vercel.app/

---

## Challenge Choice

I chose the **multi-cloud cost intelligence / platform visualization** feature and interpreted it as an interactive section focused on provider-level cost exploration, animated topology, and contextual infrastructure insights.

### Why I chose it

I picked this feature because it offered the strongest combination of:
- product storytelling
- interaction design
- data visualization
- animation craftsmanship
- frontend architecture

Rather than reproducing the source video literally, I treated it as a product reference and designed a more interactive experience where users can focus individual providers, inspect provider-specific cost details, and understand the relationship between a unified platform and distributed infrastructure.

---

## Project Overview

This project recreates a **unified cloud cost intelligence section** where users can:

- view a multi-cloud topology with AWS, Azure, Google Cloud, and On-Premise
- switch focus between providers
- inspect an aggregated or provider-specific cost panel
- reveal contextual provider popup cards on interaction
- experience a scroll-triggered, animated product section
- use the experience across desktop, tablet, and mobile layouts

The final interface uses a warm **orange-first visual system** across both light and dark themes, with gradients and token-based styling instead of a copied visual treatment.

---

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Framer Motion**
- **TanStack Query**
- **CSS with design tokens and CSS variables**

---

## Libraries Used and Why

### Framer Motion
Used for:
- scroll-triggered entrances
- staggered element reveals
- provider node animations
- popup card transitions
- hover and tap feedback
- animated panel interactions

I chose Framer Motion because it fits React naturally and made it easier to create smooth, intentional motion without overengineering the animation layer.

### TanStack Query
Used for:
- asynchronous data fetching
- response caching
- loading/error/success states
- avoiding unnecessary refetches

I chose TanStack Query because it provides modern, reliable caching behavior and made the API integration much cleaner than managing request state manually.

---

## Feature Interpretation

The source material suggested a polished product moment rather than a strict layout to copy. I interpreted that as a **central intelligence layer** surrounded by provider nodes, with cost visibility as the main product story.

Key ideas in the final implementation:
- a central cost panel that changes based on selected provider
- interactive provider nodes that surface focused snapshots
- a summary selector for switching provider context quickly
- gradient-driven surfaces and a consistent orange identity
- a layout that keeps the experience readable while still feeling dynamic

This allowed me to build something that still reflects the product idea while showing my own UI and animation decisions.

---

## Animation Approach

I treated animation as a tool for hierarchy, clarity, and product feel.

### Main animation choices

- **Scroll-triggered reveal**
  - The section animates when it enters the viewport instead of playing everything on initial page load.

- **Staggered entry**
  - Major interface elements appear in sequence so the section reads in a controlled order.

- **Interactive focus states**
  - Selecting a provider changes emphasis across the topology and updates associated data.

- **Fast contextual popups**
  - Provider cards appear quickly and are designed to feel responsive rather than delayed.

- **Reduced-motion support**
  - Motion is simplified for users who prefer reduced animation.

### Motion philosophy

I intentionally avoided excessive bounce, oversized transitions, or “animation for animation’s sake.” The goal was to make the section feel polished and product-grade, not flashy.

---

## Design Tokens and Styling Strategy

A core requirement of the challenge was avoiding scattered hardcoded values.  
To support that, I used a token-based styling approach built on CSS variables.

### Styling structure

- global CSS variables define theme values
- semantic tokens are exposed through a shared `tokens` object
- components reference tokens instead of raw colors directly

### Example categories

- background colors
- text colors
- border colors
- accent colors
- provider-specific colors
- gradients and derived accent surfaces

### Why this mattered

This made it easier to:
- support light and dark mode
- keep a consistent brand direction
- avoid color duplication
- update styles from a single source of truth
- build reusable components without tightly coupling them to raw color values

---

## Data Fetching and Caching

The section uses async data rather than hardcoding all displayed values directly into the UI layer.

### Data handling approach

A custom data hook powers the section and handles:
- loading state
- error state
- success state
- transformed display data for the cloud-cost experience

### Caching strategy

I used **TanStack Query** for caching.

This provides:
- a visible loading state on first request
- cached data on revisit
- reduced redundant fetches
- a cleaner async state model than manual `useEffect` + `useState` alone

This was important because one of the evaluation criteria was whether data re-fetching is handled thoughtfully and not triggered unnecessarily on every render.

---

## Modern CSS Features Used

I used modern CSS features where they improved the implementation naturally.

### Features included

- **CSS variables** for theme and design tokens
- **`clamp()`** for fluid spacing and typography
- **container queries** for component-level responsiveness
- **`:has()`** for contextual hover styling in the cost chart
- **`color-mix()`** for dynamic accent and surface variations
- **logical properties** such as `padding-block` and `margin-inline`
- **`prefers-reduced-motion`** handling
- **smooth scrolling** for anchor-based interactions

These features helped keep the implementation modern, flexible, and aligned with the challenge brief.

---

## Component Structure

The UI is broken into smaller, reusable components rather than one large file.

### Example structure

```bash
src/
  components/
    AnimatedNumber.tsx
    Badge.tsx
    ConnectionLines.tsx
    CostPanel.tsx
    HeroSection.tsx
    MultiCloudHeader.tsx
    MultiCloudSection.tsx
    MultiCloudSummaryBar.tsx
    Navbar.tsx
    ProviderLogo.tsx
    ProviderNode.tsx
    ProviderPopup.tsx
    Skeleton.tsx
    ThemeToggle.tsx
  hooks/
    ThemeProvider.tsx
    useCloudData.ts
    useTheme.ts
  styles/
    index.css
    variables.css
  tokens/
    index.ts
