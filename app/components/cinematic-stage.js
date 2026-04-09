"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import carImageOne from "../../photo-1728060693031-5999c4ee6c3b.jpeg";
import carImageTwo from "../../wgAoH9.jpg";
import carImageThree from "../../skoda-superb-2017-hd-wallpaper-silhouette-dark-black-23-11-2024-1732393608-hd-wallpaper.jpg";
import carImageFour from "../../b-Tom356n.jpg";

const scenes = [
  {
    key: "bronze",
    image: carImageOne,
    alt: "Mørk bil i dramatisk lys",
    accent: "#c59f6c",
    accentStrong: "#d7b17d",
    accentSoft: "rgba(197, 159, 108, 0.16)",
    glowRgb: "197, 159, 108",
    label: "Scene 01",
    title: "Montering som ser hjemme ut i bilen.",
    description:
      "Høyttalere, subwoofer, forsterker, DSP og CarPlay montert med ryddig finish.",
    tags: ["Bilstereo", "CarPlay", "Oppgradering"],
  },
  {
    key: "steel",
    image: carImageTwo,
    alt: "Bilfront i mørk studio-belysning",
    accent: "#7f9ec5",
    accentStrong: "#95b3d8",
    accentSoft: "rgba(127, 158, 197, 0.18)",
    glowRgb: "127, 158, 197",
    label: "Scene 02",
    title: "Lyd, skjerm og detaljer tilpasset bilen du kjører.",
    description:
      "Løsningene skal fungere teknisk, men også se riktige ut når bilen er ferdig.",
    tags: ["OEM+", "Skjerm", "Finish"],
  },
  {
    key: "ember",
    image: carImageThree,
    alt: "Mørk silhuett av bil sett fra siden",
    accent: "#b8744d",
    accentStrong: "#cb8861",
    accentSoft: "rgba(184, 116, 77, 0.17)",
    glowRgb: "184, 116, 77",
    label: "Scene 03",
    title: "Oppgraderinger som passer uttrykket bilen allerede har.",
    description:
      "Vi prøver å få nytt utstyr til å sitte riktig visuelt, ikke bare få det koblet inn.",
    tags: ["OEM-look", "Integrasjon", "Tilpasning"],
  },
  {
    key: "sage",
    image: carImageFour,
    alt: "Bil i nattlys med mørk bakgrunn",
    accent: "#87a49f",
    accentStrong: "#9ab7b2",
    accentSoft: "rgba(135, 164, 159, 0.18)",
    glowRgb: "135, 164, 159",
    label: "Scene 04",
    title: "Bygd for daglig bruk, ikke bare for bilder.",
    description:
      "Ryddig arbeid, tydelig kontakt og løsninger som fungerer når du bruker bilen hver dag.",
    tags: ["Daglig bruk", "Ryddig arbeid", "Kontakt"],
  },
];

const themeKeys = [
  "--accent",
  "--accent-strong",
  "--accent-soft",
  "--theme-glow-rgb",
];

export function CinematicStage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(Math.floor(Math.random() * scenes.length));
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % scenes.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const activeScene = scenes[activeIndex];

    root.style.setProperty("--accent", activeScene.accent);
    root.style.setProperty("--accent-strong", activeScene.accentStrong);
    root.style.setProperty("--accent-soft", activeScene.accentSoft);
    root.style.setProperty("--theme-glow-rgb", activeScene.glowRgb);
  }, [activeIndex]);

  useEffect(() => {
    const root = document.documentElement;

    return () => {
      themeKeys.forEach((key) => root.style.removeProperty(key));
    };
  }, []);

  const activeScene = scenes[activeIndex];

  return (
    <div className="cinematic-stage" data-reveal="">
      <div className="cinematic-stage__frames" aria-hidden="true">
        {scenes.map((scene, index) => (
          <div
            className={`cinematic-stage__frame ${index === activeIndex ? "is-active" : ""}`}
            key={scene.key}
          >
            <Image
              src={scene.image}
              alt={scene.alt}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="cinematic-stage__topline">
        <span className="cinematic-stage__brand">Instalyd</span>

        <div className="cinematic-stage__controls" aria-label="Velg scene">
          {scenes.map((scene, index) => (
            <button
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Vis ${scene.label.toLowerCase()}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              key={scene.key}
            />
          ))}
        </div>
      </div>

      <div className="cinematic-stage__content">
        <div className="cinematic-stage__copy">
          <span className="story-shot__tag">{activeScene.label}</span>
          <p className="cinematic-stage__title">{activeScene.title}</p>
          <p className="cinematic-stage__text">{activeScene.description}</p>
        </div>

        <div className="cinematic-stage__meta">
          <span className="cinematic-stage__count">
            {String(activeIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
          </span>

          <div className="cinematic-stage__tags">
            {activeScene.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
