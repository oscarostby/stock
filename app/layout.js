import "./globals.css";

export const metadata = {
  title: "Instalyd | Billyd montert riktig",
  description:
    "Instalyd monterer billyd, subwoofer, skjerm, DSP og lyddemping. Ryddig arbeid, riktig oppsett og ærlig prisvurdering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
