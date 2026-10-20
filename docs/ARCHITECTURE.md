# Architecture and decisions

## MVP path
1. Website collects a minimal trip brief.
2. Server validates fields with Zod.
3. If OPENAI_API_KEY is configured, the server calls OpenAI Responses API for a preliminary proposal; otherwise the demo generator returns a clearly labelled non-live proposal.
4. Later iterations persist the request and connect approved supplier adapters through the backend.
5. Quote calculation must be deterministic and separate from AI text generation.
6. Booking confirmation must be based on a supplier response/reference, not model output.

## Recommended production modules
- Web UI (Next.js/TypeScript)
- Backend/API and authorization
- PostgreSQL data layer and migrations
- AI orchestration with structured outputs/tool calling
- Supplier adapter interface and individual provider adapters
- Deterministic quote calculator
- Booking state machine, idempotency and reconciliation
- Admin operations queue
- Transactional email and payment provider (after business model/legal review)
- Monitoring, audit and backup/restore

## Provider selection gate
Do not choose a supplier solely because it has a public API. Confirm commercial eligibility, country coverage, product coverage, production access, cancellation/change handling, support, fees, data rights and booking confirmation semantics.
