import { SiteEffects } from "../../site-effects";

export const metadata = {
  title: "Login",
  description: "Intern login for Instalyd-kontor.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  },
};

export default async function InstalydOfficeLoginPage({ searchParams }) {
  const params = await searchParams;
  const hasError = params?.error === "1";
  const nextPath =
    typeof params?.next === "string" && params.next.startsWith("/instalyd-kontor")
      ? params.next
      : "/instalyd-kontor";

  return (
    <>
      <SiteEffects />

      <main className="office-login">
        <section className="section office-login__wrap">
          <div className="office-login__card" data-reveal="">
            <p className="eyebrow">Intern innlogging</p>
            <h1>Logg inn pa Instalyd-kontor.</h1>
            <p className="lead">Putt inn brukernavn og passord for aa komme inn.</p>

            {hasError ? (
              <p className="office-login__error">Feil navn eller passord. Prov igjen.</p>
            ) : null}

            <form
              className="contact-form office-form office-login__form"
              action="/instalyd-kontor/authenticate"
              method="post"
            >
              <input name="next" type="hidden" value={nextPath} />

              <label>
                <span>Navn</span>
                <input
                  autoCapitalize="none"
                  autoComplete="username"
                  name="username"
                  placeholder="Brukernavn"
                  required=""
                />
              </label>

              <label>
                <span>Passord</span>
                <input
                  autoComplete="current-password"
                  name="password"
                  placeholder="Skriv passord"
                  required=""
                  type="password"
                />
              </label>

              <button className="button" type="submit">
                Logg inn
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
