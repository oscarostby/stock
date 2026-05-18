import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { SubwooferFitCalculator } from "../components/subwoofer-fit-calculator";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Subwoofer-kalkulator - sjekk basskasse i bagasjerom",
  description:
    "Test mål på bagasjerom og subwoofer/basskasse i en enkel 3D-kalkulator. Dra med musen for å se om boksen passer i bilen.",
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
