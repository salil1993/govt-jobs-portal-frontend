import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sarkari Jobs Portal - Government Job Listings',
  description: 'Find and apply for latest government job opportunities. Get job alerts, exam dates, and eligibility requirements all in one place.',
  keywords: 'government jobs, sarkari naukri, govt jobs, recruitment',
  openGraph: {
    title: 'Sarkari Jobs Portal',
    description: 'Find latest government job opportunities',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
