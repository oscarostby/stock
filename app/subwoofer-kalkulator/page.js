import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { SubwooferFitCalculator } from "../components/subwoofer-fit-calculator";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "3D subwoofer-kalkulator for bil og bagasjerom",
  description:
    "Gratis 3D subwoofer-kalkulator for bil: test mål på bagasjerom og basskasse før montering av subwoofer i Akershus og Buskerud.",
  keywords: [
    "subwoofer kalkulator",
    "basskasse kalkulator bil",
    "subwoofer passer i bagasjerom",
    "3D subwoofer kalkulator",
  ],
  path: "/subwoofer-kalkulator",
});

export default function SubwooferCalculatorPage() {
  return (
    <>
      <Header />
      <main className="shop-site calculator-page">
        <SubwooferFitCalculator />
      </main>
      <Footer />
    </>
  );
}
