# ATC Website — Frontend Instructions

## 1. Project Overview

Build the official website for the Alan Turing Club (ATC), Bennett University.

This repository contains other services, but your responsibility is strictly limited to the frontend.

## 2. Scope — Frontend Only

- Work exclusively inside the `frontend/` directory.
- Do not modify anything in `backend/` or `database/`.
- Do not modify backend APIs, Go services, database schemas, or server configurations.
- Do not make changes outside `frontend/` unless explicitly instructed.
- Do not introduce backend functionality or infrastructure.

## 3. Tech Stack

- React
- TypeScript
- Vite
- CSS

Use the existing project setup.

Do not introduce additional frameworks, libraries, or dependencies without a clear reason. Discuss significant technical decisions before implementing them.

## 4. Design Philosophy

The website should have a minimalist, sophisticated, editorial design.

The visual identity should feel:
- Modern
- Minimal
- Architectural
- Typography-driven
- Distinctive rather than template-like

Avoid generic startup landing-page aesthetics.

### Colour Palette
- Primarily black, white, off-white, and neutral greys.
- Use colour only if explicitly approved.
- Avoid colourful gradients, neon colours, and unnecessary visual effects.

### Typography
- Bold, geometric, modern typography.
- The ATC logo should be an important visual reference.
- Typography should be treated as a major design element.
- Explore interesting scale, positioning, spacing, and composition.
- Avoid generic font pairings and default-looking layouts.

### Visual Elements
- Subtle geometric shapes, circles, lines, grids, and construction details.
- Intentional whitespace.
- Strong visual hierarchy.
- Sharp edges throughout.
- No rounded corners.
- No blur effects.

## 5. Landing Page

The landing page should:

- Occupy the full browser viewport on desktop.
- Have a minimal, light background.
- Display the club identity in the top-left.
- Display navigation in the top-right.
- Feature a large, creatively composed `ALAN TURING CLUB` title.
- Use asymmetrical typography and deliberate positioning.
- Avoid unnecessary descriptions, paragraphs, cards, and sections.

The landing page should feel like an editorial cover, not a conventional club website.

### Navigation

Use these navigation items:

- HOME
- EVENTS
- PROJECTS
- TEAM
- RESOURCES

Keep desktop navigation directly visible. Avoid unnecessary dropdowns and popup menus.

## 6. Animation and Interaction

- Use subtle, purposeful animations.
- Keep hover interactions simple.
- Avoid flashy transitions and excessive motion.
- Do not add button animations.
- Prioritise performance and accessibility.
- Respect reduced-motion preferences.

## 7. Responsive Design

The website must work properly on:
- Desktop
- Tablet
- Mobile

Do not simply shrink the desktop layout. Adapt typography, spacing, and composition appropriately for smaller screens.

## 8. Code Quality

- Use TypeScript properly.
- Prefer functional React components.
- Use reusable components when appropriate.
- Keep components focused and readable.
- Use semantic HTML.
- Keep styling organised.
- Avoid unnecessary abstractions.
- Avoid excessive dependencies.
- Do not leave unused imports, components, or assets.
- Do not use `any` unless genuinely necessary.

## 9. Development Workflow

Before making changes:
1. Inspect the existing frontend structure.
2. Understand the current implementation.
3. Identify which files actually need modification.

While implementing:
- Make focused changes.
- Avoid rewriting unrelated files.
- Preserve existing working functionality.
- Do not invent features or content.
- Do not change agreed design decisions without discussion.

After implementing:
- Check for TypeScript errors.
- Check for build errors.
- Test responsiveness.
- Verify that existing functionality still works.

## 10. How to Work With the User

- Do not make major design decisions independently.
- Discuss significant design changes before implementing them.
- Explain important implementation choices when asked.
- Prefer straightforward solutions over unnecessary complexity.
- Do not generate excessive code or unnecessary files.
- Do not assume that more animations or visual effects make a design better.
- Prioritise the agreed design direction over generic design conventions.

## Most Important Rule

Work only on the frontend.

Preserve the agreed ATC visual identity and do not modify backend or database files.