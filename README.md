# Hintro Frontend Assignment

Responsive Hintro dashboard built with Next.js, TypeScript, React, and Tailwind CSS 4-style global theming. The UI follows the provided designs, uses the supplied mock API, supports both assignment users, and stores feedback locally in `localStorage`.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

The app uses the mock backend from `.env`:

```env
HINTRO_API_BASE_URL=https://mock-backend-hintro.vercel.app
```

### 3. Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## User Modes

The app supports the two users required in the assignment:

- `u1` → empty/new user state
- `u2` → active user with populated data

Use either:

- `http://localhost:3000/?user=u1`
- `http://localhost:3000/?user=u2`

The app sends the selected user through the `x-user-id` header.

## API Usage

Endpoints used:

- `GET /api/auth/profile`
- `GET /api/auth/dashboard`
- `GET /api/call-sessions/stats`
- `GET /api/call-sessions?limit=10`

## Conventions

- API data is the source of truth for dashboard content
- `u1` and `u2` are handled via query param + request header
- Time values from the API are formatted into UI-friendly strings
- Global design tokens live in `app/globals.css`
- Feedback and feedback history are stored in browser `localStorage`
- UI sections are componentized under `app/components`

## Assumptions

- The provided backend remains available at `HINTRO_API_BASE_URL`
- `u1` returns empty-state data
- `u2` returns active/randomized data
- The assignment prioritizes responsive UI, Figma fidelity, and correct API-driven states

## Validation

```bash
npm run lint
```
