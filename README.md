# Hintro Frontend Assignment

Responsive Hintro dashboard built with Next.js, React, TypeScript, and global token-based styling. The app follows the provided dashboard designs, uses the supplied mock API as the source of truth, supports both required user states, and stores feedback history in `localStorage`.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4 (via global CSS import)
- ESLint

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

The app reads the backend URL from `.env`:

```env
HINTRO_API_BASE_URL=https://mock-backend-hintro.vercel.app
```

### 3. Run the app

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## User States

The dashboard supports the two users required in the assignment:

- `u1` → empty / new-user state
- `u2` → active / populated state

Use either query param:

- `http://localhost:3000/?user=u1`
- `http://localhost:3000/?user=u2`

The selected value is sent to the API using the `x-user-id` header.

## API Endpoints Used

- `GET /api/auth/profile`
- `GET /api/auth/dashboard`
- `GET /api/call-sessions/stats`
- `GET /api/call-sessions?limit=10`

Base URL:

- `HINTRO_API_BASE_URL`

## Project Structure

- `app/page.tsx` – server entry page and user selection handling
- `app/api.ts` – typed API integration layer
- `app/dashboard-data.ts` – API-to-UI transformation and formatting helpers
- `app/dashboard-client.tsx` – main client coordinator
- `app/components/` – extracted dashboard sections, layout pieces, modals, icons, and feedback hook
- `app/globals.css` – global theme tokens, layout, responsive styling, and scrollbar styling

## Conventions

- API data is the only source of truth for dashboard content
- No fallback dashboard data is injected in place of API results
- Global visual values are tokenized in `app/globals.css`
- Dashboard UI is componentized to keep layout, sections, and modal logic separated
- Feedback entries and history are stored in browser `localStorage`
- Duration values from API responses are formatted into display strings like `14m 22sec`
- Recent-session timestamps are formatted into relative labels such as `2 days ago`

## Assumptions

- The provided mock backend remains available at `HINTRO_API_BASE_URL`
- `u1` returns empty-state data
- `u2` returns active/randomized data
- The assignment prioritizes Figma fidelity, responsive behavior, and correct API-driven states

## Validation

Run lint:

```bash
npm run lint
```


