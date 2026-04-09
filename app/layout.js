import "./globals.css";

export const metadata = {
  title: "Instalyd | Bilstereo og CarPlay",
  description:
    "Instalyd monterer høyttalere, subwoofer, forsterker, DSP og CarPlay med ryddig finish og tydelig prisvurdering.",
};

export const viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
