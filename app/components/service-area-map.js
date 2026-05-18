"use client";

import { useMemo, useState } from "react";

const serviceZone = [
  [60.75, 9.05],
  [60.55, 10.10],
  [60.48, 11.35],
  [60.18, 12.05],
  [59.65, 12.15],
  [59.15, 11.25],
  [58.98, 10.20],
  [59.08, 9.15],
  [59.55, 8.85],
];

const mapUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=8.25%2C58.85%2C12.45%2C60.85&layer=mapnik";

const openMapUrl = "https://www.openstreetmap.org/#map=8/59.82/10.40";

function pointInPolygon(point, polygon) {
  const [lat, lng] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [latI, lngI] = polygon[i];
    const [latJ, lngJ] = polygon[j];
    const intersects =
      lngI > lng !== lngJ > lng && lat < ((latJ - latI) * (lng - lngI)) / (lngJ - lngI) + latI;

    if (intersects) inside = !inside;
  }

  return inside;
}

function formatCoordinate(value) {
  return value.toFixed(4).replace(".", ",");
}

export function ServiceAreaMap() {
  const [status, setStatus] = useState("Klikk for å sjekke om du er innenfor området.");
  const [isChecking, setIsChecking] = useState(false);
  const [location, setLocation] = useState(null);

  const userMapUrl = useMemo(() => {
    if (!location) return openMapUrl;
    return `https://www.openstreetmap.org/#map=11/${location.latitude}/${location.longitude}`;
  }, [location]);

  function checkLocation() {
    if (!navigator.geolocation) {
      setStatus("Nettleseren støtter ikke posisjon. Send kommune eller adresse i skjemaet.");
      return;
    }

    setIsChecking(true);
    setStatus("Henter posisjonen din …");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const inside = pointInPolygon([latitude, longitude], serviceZone);
        setLocation({ latitude, longitude, inside });
        setStatus(
          inside
            ? "Du ser ut til å være innenfor dekningsområdet vårt. Send gjerne forespørsel."
            : "Du ser ut til å være utenfor markert sone. Send oss likevel kommune/adresse, så vurderer vi det."
        );
        setIsChecking(false);
      },
      () => {
        setStatus("Kunne ikke hente posisjon. Du kan fortsatt sende kommune eller adresse i skjemaet.");
        setIsChecking(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/8">
      <div className="relative h-[28rem] bg-slate-200">
        <iframe
          title="Kart over Akershus og Buskerud"
          src={mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
        <div className="pointer-events-none absolute inset-0 z-10">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            <polygon
              points="19,12 45,16 73,24 88,46 82,74 55,88 26,82 14,58 10,34"
              fill="rgba(155,236,27,0.28)"
              stroke="rgba(199,255,57,0.98)"
              strokeWidth="1.4"
              strokeDasharray="3 2"
            />
          </svg>
          <div className="absolute left-[45%] top-[46%] h-3 w-3 rounded-full border-2 border-white bg-lime-400 shadow-lg" />
          <div className="absolute left-[51%] top-[34%] h-3 w-3 rounded-full border-2 border-white bg-lime-400 shadow-lg" />
          <div className="absolute left-[41%] top-[50%] h-3 w-3 rounded-full border-2 border-white bg-lime-400 shadow-lg" />
          <div className="absolute left-[65%] top-[31%] h-3 w-3 rounded-full border-2 border-white bg-lime-400 shadow-lg" />
          <span className="absolute left-[47%] top-[40%] rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-slate-950 shadow">Drammen</span>
          <span className="absolute left-[38%] top-[45%] rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-slate-950 shadow">Asker</span>
          <span className="absolute left-[49%] top-[28%] rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-slate-950 shadow">Bærum</span>
          <span className="absolute left-[61%] top-[25%] rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-slate-950 shadow">Lillestrøm</span>
        </div>
        <div className="pointer-events-none absolute left-4 top-4 z-20 max-w-[16rem] rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-700">Tegnet dekningsområde</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">Grønt felt = Akershus + Buskerud</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">Kartet kan fortsatt zoomes og flyttes. Sonen er tegnet oppå kartet, ikke som en rute.</p>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Interaktivt kart</p>
          <p className="mt-1 font-semibold text-slate-950">Sjekk om du er innenfor sonen</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Det grønne feltet er tegnet direkte oppå kartet for å vise sonen tydelig. Posisjonssjekken skjer trygt i nettleseren din.
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">{status}</p>
          {location ? (
            <p className="mt-1 text-sm text-slate-500">
              Din posisjon: {formatCoordinate(location.latitude)}, {formatCoordinate(location.longitude)} · {location.inside ? "innenfor sone" : "utenfor sone"}
            </p>
          ) : null}
        </div>
        <div className="grid gap-2 sm:justify-items-end">
          <button
            type="button"
            onClick={checkLocation}
            disabled={isChecking}
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isChecking ? "Sjekker …" : "Sjekk min posisjon"}
          </button>
          <a
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold !text-white"
            href={userMapUrl}
            target="_blank"
            rel="noreferrer"
          >
            {location ? "Åpne min posisjon" : "Åpne kart"}
          </a>
        </div>
      </div>
    </div>
  );
}
