import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'AI Travel Designer & Concierge',
  description: 'Progetta il tuo prossimo viaggio con un assistente di viaggio AI.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
