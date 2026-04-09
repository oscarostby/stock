import "./globals.css";

export const metadata = {
  title: "Instalyd | Bilstereo montert riktig",
  description:
    "Instalyd monterer bilstereo, subwoofer, DSP, skjerm og lyddemping med fokus på ryddig finish, riktig oppsett og ærlig prisvurdering.",
};

export const viewport = {
  themeColor: "#090b10",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
