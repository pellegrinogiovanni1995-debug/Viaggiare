import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { TripRequestSchema } from '@/lib/trip-schema';
import { TRAVEL_DESIGNER_INSTRUCTIONS } from '@/lib/travel-prompt';
import { makeDemoProposal } from '@/lib/demo-proposal';

export const runtime = 'nodejs';
export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = TripRequestSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Controlla i campi richiesti e riprova.' }, { status: 400 });
    }
    const trip = parsed.data;
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ mode: 'demo', proposal: makeDemoProposal(trip) });
    }
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5',
      instructions: TRAVEL_DESIGNER_INSTRUCTIONS,
      input: `Prepara una proposta preliminare in lingua ${trip.language}. Dati ricevuti:\n${JSON.stringify(trip, null, 2)}\n\nNon sono collegate API di fornitori o disponibilità live: non inventare prezzi o conferme.`,
      max_output_tokens: 1200,
    });
    return NextResponse.json({ mode: 'ai', proposal: response.output_text || 'Non è stato possibile generare una proposta. Riprova.' });
  } catch (error) {
    console.error('trip_proposal_error', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Servizio temporaneamente non disponibile. Riprova più tardi.' }, { status: 500 });
  }
}
