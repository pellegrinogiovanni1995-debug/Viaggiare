-- Initial PostgreSQL schema. Review retention, access policies and jurisdiction before production.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TYPE quote_status AS ENUM ('draft','pending_review','sent','accepted','expired','rejected','cancelled');
CREATE TYPE booking_status AS ENUM ('not_started','pending_review','booking_pending','confirmed','failed','cancelled','reconciliation_required');
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  preferred_language varchar(12) NOT NULL DEFAULT 'it',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE trip_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  destination text NOT NULL,
  start_date date,
  end_date date,
  travelers integer NOT NULL CHECK (travelers BETWEEN 1 AND 20),
  budget_text varchar(80),
  travel_style varchar(80) NOT NULL,
  notes text,
  language varchar(12) NOT NULL DEFAULT 'it',
  status varchar(32) NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  currency char(3) NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'draft',
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE package_components (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  component_type varchar(40) NOT NULL,
  supplier_name text,
  description text NOT NULL,
  source_url text,
  source_checked_at timestamptz,
  price_amount numeric(12,2),
  currency char(3),
  availability_status varchar(30) NOT NULL DEFAULT 'unverified',
  conditions jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES trip_requests(id),
  package_id uuid REFERENCES packages(id),
  version integer NOT NULL DEFAULT 1,
  status quote_status NOT NULL DEFAULT 'draft',
  currency char(3) NOT NULL,
  subtotal numeric(12,2),
  taxes numeric(12,2),
  fees numeric(12,2),
  total numeric(12,2),
  validity_until timestamptz,
  price_verification_note text,
  approved_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(request_id, version)
);
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id uuid NOT NULL REFERENCES quotes(id),
  status booking_status NOT NULL DEFAULT 'not_started',
  supplier_reference text,
  confirmation_evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_error_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  consent_type varchar(80) NOT NULL,
  policy_version varchar(40) NOT NULL,
  granted boolean NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE audit_events (
  id bigserial PRIMARY KEY,
  actor_type varchar(30) NOT NULL,
  actor_id text,
  entity_type varchar(60) NOT NULL,
  entity_id text NOT NULL,
  action varchar(80) NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_trip_requests_created_at ON trip_requests(created_at DESC);
CREATE INDEX idx_quotes_request_id ON quotes(request_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_audit_events_entity ON audit_events(entity_type, entity_id, created_at DESC);
