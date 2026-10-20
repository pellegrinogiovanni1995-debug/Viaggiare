# Launch checklist — AI Travel Designer & Concierge 3.0

## Commercial and legal (blocking)
- [ ] Decide whether the business sells own packages, resells operator packages, or intermediates third-party services.
- [ ] Define launch country/countries, legal entity, currencies and languages.
- [ ] Obtain legal review of package-travel obligations, insolvency protection, pre-contract information, terms, cancellations, refunds, taxes and consumer rights.
- [ ] Publish approved privacy notice, cookie policy/consent where required, terms and contact details.
- [ ] Define data retention/deletion and customer request process.
- [ ] Confirm supplier contracts, commercial rights, support process and production credentials.

## Technical
- [ ] Set a supported Node.js LTS version and install dependencies.
- [ ] Copy `.env.example` to `.env.local`; add OPENAI_API_KEY only on the server.
- [ ] Keep `.env.local` out of version control. Never use `NEXT_PUBLIC_` for secrets.
- [ ] Connect a managed PostgreSQL database and review/run `db/schema.sql`.
- [ ] Implement real persistence, authentication, rate limiting, CSRF/origin protections as appropriate, and abuse controls before public launch.
- [ ] Add privacy-safe logging, monitoring, backups and a tested restore process.
- [ ] Add email provider and verified sender domain before sending transactional mail.
- [ ] Implement supplier adapters only after sandbox access and production terms are approved.
- [ ] Implement idempotency/reconciliation and manual exception queue before automated bookings.
- [ ] Integrate payments only after the merchant/organizer role and payment flow are approved.

## Validation
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Test invalid input, unavailable AI, timeouts, stale offers, supplier failures, duplicate booking attempts and price changes.
- [ ] Run authorization and security tests; no unresolved critical/high findings.
- [ ] Test complete customer journey on mobile and desktop.
- [ ] Confirm all displayed prices and availability have source, timestamp, currency and status.
- [ ] Confirm no booking is called confirmed without supplier evidence.
- [ ] Pilot with limited users and record issues.
- [ ] Formal go/no-go approval from product, operations and legal owners.

## Current scaffold limitations
This starter provides a functional request UI and an optional OpenAI-generated preliminary proposal. It does not yet persist requests to the database, authenticate users, email quotes, connect supplier inventory, charge payments, or create real bookings. Demo mode is not a production booking system.
