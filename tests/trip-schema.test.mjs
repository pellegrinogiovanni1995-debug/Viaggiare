import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
// Lightweight source-level acceptance checks; full API tests should be added with the chosen DB/auth providers.
test('trip endpoint validates required fields and caps travelers', async () => {
  const source = await readFile(new URL('../lib/trip-schema.ts', import.meta.url), 'utf8');
  assert.match(source, /destination: z\.string\(\)\.trim\(\)\.min\(2\)/);
  assert.match(source, /travelers: z\.coerce\.number\(\)\.int\(\)\.min\(1\)\.max\(20\)/);
});
test('AI instructions prohibit fabricated booking confirmations', async () => {
  const source = await readFile(new URL('../lib/travel-prompt.ts', import.meta.url), 'utf8');
  assert.match(source, /Non dire che una prenotazione è confermata/);
  assert.match(source, /Non inventare prezzi/);
});
test('demo proposal explicitly says no live availability or booking', async () => {
  const source = await readFile(new URL('../lib/demo-proposal.ts', import.meta.url), 'utf8');
  assert.match(source, /nessuna ricerca live eseguita/);
  assert.match(source, /nessun servizio prenotato/);
});
