# AI Travel Designer & Concierge 3.0 — starter project

Italian-language website starter for a travel-design service. It contains a responsive trip request form, server-side validation, optional OpenAI Responses API integration, explicit demo mode, initial PostgreSQL schema, launch checklist and test scaffolding.

> This is a starter/MVP scaffold, not a finished commercial booking platform. It does not persist requests, authenticate users, connect supplier inventory, send emails, take payments or book travel. Do not publish it as a live booking service until the checklist is completed.

## Requirements
- Node.js LTS (use the currently supported LTS for your hosting environment)
- npm
- Optional OpenAI API key for AI-generated preliminary proposals
- PostgreSQL for the future persistence layer

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000. Without `OPENAI_API_KEY`, the form works in demo mode and clearly labels the output as non-live. To enable AI-generated preliminary proposals, set `OPENAI_API_KEY` in `.env.local` and optionally set `OPENAI_MODEL` to a model enabled for your API project.

## Verify

```bash
npm test
npm run build
```

## Before production
1. Read `docs/LAUNCH_CHECKLIST.md` and `docs/ARCHITECTURE.md`.
2. Decide the commercial role and complete legal review for the intended markets.
3. Connect a database and implement persistence, auth, rate limits and data-retention controls.
4. Select suppliers on commercial and technical grounds, obtain sandbox and production access, and implement adapters.
5. Implement quote persistence/versioning, supplier price checks, booking state machine and exception reconciliation.
6. Add email, payment, monitoring, backup and recovery only after validating the business flow.
7. Complete security, privacy, functional and end-to-end tests; obtain formal go/no-go approval.

## Important security notes
- Never commit `.env.local` or API keys.
- Never expose `OPENAI_API_KEY` using a `NEXT_PUBLIC_` variable.
- Do not treat model output as a price source or booking confirmation.
- The provided SQL schema is a starting point; review it, add migrations and row-level/access controls according to your selected database and identity provider.
- This starter does not yet implement database persistence or user authentication.
