# Duck Chat Working Methodology

This document captures the working methodology for the Duck Chat repository. It is meant for contributors who want to understand how the project is organized and how to work safely in the codebase.

## Guiding Principles

- **Small changes, fast feedback.** Keep pull requests focused and minimal.
- **Respect realtime behavior.** The chat experience depends on WebSocket signaling and WebRTC data channels. Treat changes in these areas carefully.
- **Document configuration.** If you add or change environment variables, update the README so the setup remains clear.
- **Prefer existing patterns.** Follow existing modules, styles, and conventions in each sub-project.

## Project Layout

- `backend/` – Express app and WebSocket signaling server.
- `frontend/duck-chat/` – Vite React frontend.

## Local Workflow

1. **Install dependencies** in both the backend and frontend folders.
2. **Run the backend** first so the signaling server is available.
3. **Run the frontend** and open two browser sessions to validate matching.
4. **Keep changes scoped** to the smallest set of files possible.

## Branching & Commits

- Use short-lived branches.
- Prefer descriptive commits that explain the change.
- Avoid committing build artifacts (`dist/`, `node_modules/` are already ignored).

## Testing Expectations

The backend currently has no test suite. The frontend relies on Vite and ESLint scripts.

Recommended checks before a PR:

```bash
cd frontend/duck-chat
npm run lint
npm run build
```

If you add tests in the future, document how to run them here and in the README.

## Documentation Updates

When you introduce new behavior (especially for setup or runtime configuration), update:

- `README.md` for user-facing instructions.
- `documentation.md` for contributor-facing workflow notes.
