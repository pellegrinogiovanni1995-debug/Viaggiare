'use client';
import { FormEvent, useState } from 'react';
type ApiResult = { mode?: 'demo' | 'ai'; proposal?: string; error?: string };
export default function Home() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError(''); setResult(null);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch('/api/trip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json() as ApiResult;
      if (!res.ok) throw new Error(data.error || 'Richiesta non riuscita.');
      setResult(data);
    } catch (err) { setError(err instanceof Error ? err.message : 'Errore imprevisto.'); }
    finally { setBusy(false); }
  }
  return <main className="shell">
    <nav className="topbar"><div className="brand">AI <span>TRAVEL DESIGNER</span></div><div className="pill">DESIGN YOUR NEXT JOURNEY</div></nav>
    <section className="hero"><div><div className="eyebrow">Travel, designed around you</div><h1>Il tuo prossimo viaggio, progettato intorno a te.</h1><p>Raccontaci che tipo di esperienza immagini. Ti aiuteremo a trasformare le tue idee in una proposta di viaggio chiara, personale e pronta per essere verificata.</p></div><aside className="heroCard"><div className="sun"/><div><h2>Meno ricerca. Più viaggio.</h2><p>Un primo itinerario, le domande giuste e i prossimi passi per costruire il tuo pacchetto.</p></div></aside></section>
    <section className="layout"><div className="panel"><h2>Progettiamo il tuo viaggio</h2><p className="sub">Inserisci i dettagli che conosci. Potrai affinare la proposta in seguito.</p>
      <form onSubmit={submit}><div className="fields">
        <div className="field full"><label htmlFor="destination">Dove vorresti andare? *</label><input id="destination" name="destination" placeholder="Es. Giappone, Andalusia, Costa Rica" required minLength={2} maxLength={120}/></div>
        <div className="field"><label htmlFor="startDate">Partenza</label><input id="startDate" name="startDate" type="date"/></div>
        <div className="field"><label htmlFor="endDate">Rientro</label><input id="endDate" name="endDate" type="date"/></div>
        <div className="field"><label htmlFor="travelers">Numero viaggiatori *</label><input id="travelers" name="travelers" type="number" min="1" max="20" defaultValue="2" required/></div>
        <div className="field"><label htmlFor="budget">Budget indicativo</label><input id="budget" name="budget" placeholder="Es. 2.000 € a persona" maxLength={80}/></div>
        <div className="field"><label htmlFor="travelStyle">Stile di viaggio *</label><select id="travelStyle" name="travelStyle" required defaultValue="Cultura e scoperta"><option>Cultura e scoperta</option><option>Mare e relax</option><option>Natura e avventura</option><option>Lusso e benessere</option><option>Famiglia</option><option>Viaggio di lavoro</option><option>Incentive e gruppi</option><option>Budget smart</option><option>Mix personalizzato</option></select></div>
        <div className="field"><label htmlFor="language">Lingua della proposta</label><select id="language" name="language" defaultValue="it"><option value="it">Italiano</option><option value="en">English</option><option value="de">Deutsch</option><option value="fr">Français</option><option value="es">Español</option></select></div>
        <div className="field full"><label htmlFor="notes">Che cosa non dovrebbe mancare?</label><textarea id="notes" name="notes" placeholder="Interessi, ritmo, alloggio, accessibilità, occasioni speciali, città di partenza…" maxLength={2000}/></div>
      </div><button className="primary" type="submit" disabled={busy}>{busy ? 'Prepariamo la proposta…' : 'Crea la mia proposta'}</button><p className="hint">Non inserire dati di pagamento o documenti personali. L'invio di questo modulo genera una proposta preliminare e non effettua una prenotazione.</p></form>
    </div><aside className="panel"><div className="status">ASSISTENTE DI VIAGGIO</div><h2>La tua idea prende forma</h2><p className="sub">Riceverai una proposta con una direzione di viaggio e i prossimi passaggi per verificarla.</p>
      {error && <div className="alert" role="alert">{error}</div>}
      {!result && !error && <div className="empty">La proposta apparirà qui dopo aver inviato il modulo. In questa versione iniziale non sono ancora collegati motori di ricerca live, fornitori o sistemi di prenotazione.</div>}
      {result && <><div className="pill" style={{display:'inline-block',marginBottom:12}}>{result.mode === 'ai' ? 'PROPOSTA GENERATA CON AI' : 'MODALITÀ DEMO — SENZA API AI'}</div><div className="result">{result.proposal}</div></>}
      <div className="alert">Trasparenza: prezzi, disponibilità e conferme saranno indicati come verificati solo quando un fornitore collegato li avrà restituiti.</div>
    </aside></section>
    <footer className="foot">AI Travel Designer & Concierge 3.0 · Prototipo iniziale. Prima dell'uso commerciale, configurare privacy, termini di vendita, contatti aziendali, fornitori, monitoraggio e ambiente di produzione.</footer>
  </main>;
}
