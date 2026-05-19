"use client";

import { useMemo, useRef, useState } from "react";

const defaultMeasurements = {
  trunkWidth: 105,
  trunkDepth: 78,
  trunkHeight: 43,
  boxWidth: 52,
  boxDepth: 38,
  boxHeight: 34,
};

const fieldGroups = [
  {
    title: "Bagasjerom",
    fields: [
      { key: "trunkWidth", label: "Bredde", suffix: "cm" },
      { key: "trunkDepth", label: "Dybde", suffix: "cm" },
      { key: "trunkHeight", label: "Høyde", suffix: "cm" },
    ],
  },
  {
    title: "Subwoofer/basskasse",
    fields: [
      { key: "boxWidth", label: "Bredde", suffix: "cm" },
      { key: "boxDepth", label: "Dybde", suffix: "cm" },
      { key: "boxHeight", label: "Høyde", suffix: "cm" },
    ],
  },
];

const faceIndexes = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 1, 5, 4],
  [1, 2, 6, 5],
  [2, 3, 7, 6],
  [3, 0, 4, 7],
];

const edgeIndexes = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(1, number) : 1;
}

function getOrientations(box) {
  const dimensions = [box.boxWidth, box.boxDepth, box.boxHeight].map(toNumber);
  const labels = ["bredde", "dybde", "høyde"];
  const orders = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];

  return orders.map((order) => ({
    width: dimensions[order[0]],
    depth: dimensions[order[1]],
    height: dimensions[order[2]],
    label: `${labels[order[0]]} × ${labels[order[1]]} × ${labels[order[2]]}`,
  }));
}

function cuboidPoints(width, depth, height) {
  return [
    [-width / 2, -depth / 2, 0],
    [width / 2, -depth / 2, 0],
    [width / 2, depth / 2, 0],
    [-width / 2, depth / 2, 0],
    [-width / 2, -depth / 2, height],
    [width / 2, -depth / 2, height],
    [width / 2, depth / 2, height],
    [-width / 2, depth / 2, height],
  ];
}

function projectPoint(point, yaw, pitch) {
  const yawRad = (yaw * Math.PI) / 180;
  const pitchRad = (pitch * Math.PI) / 180;
  const [x, y, z] = point;

  const zx = x * Math.cos(yawRad) - y * Math.sin(yawRad);
  const zy = x * Math.sin(yawRad) + y * Math.cos(yawRad);
  const py = zy * Math.cos(pitchRad) - z * Math.sin(pitchRad);
  const depth = zy * Math.sin(pitchRad) + z * Math.cos(pitchRad);

  return { x: zx, y: -py, depth };
}

function getStableSceneScale(trunk, box) {
  const maxWidth = Math.max(trunk.width, box.width);
  const maxDepth = Math.max(trunk.depth, box.depth);
  const maxHeight = Math.max(trunk.height, box.height);
  const footprintDiagonal = Math.hypot(maxWidth, maxDepth);
  const safeHorizontalRange = footprintDiagonal * 1.08;
  const safeVerticalRange = (footprintDiagonal + maxHeight) * 1.08;

  return Math.min(
    620 / Math.max(1, safeHorizontalRange),
    330 / Math.max(1, safeVerticalRange)
  );
}

function buildScene(trunk, box, yaw, pitch) {
  const trunkPoints = cuboidPoints(trunk.width, trunk.depth, trunk.height).map((point) => projectPoint(point, yaw, pitch));
  const boxPoints = cuboidPoints(box.width, box.depth, box.height).map((point) => projectPoint(point, yaw, pitch));
  const allPoints = [...trunkPoints, ...boxPoints];
  const minX = Math.min(...allPoints.map((point) => point.x));
  const maxX = Math.max(...allPoints.map((point) => point.x));
  const minY = Math.min(...allPoints.map((point) => point.y));
  const maxY = Math.max(...allPoints.map((point) => point.y));
  const scale = getStableSceneScale(trunk, box);
  const centerX = 360 - ((minX + maxX) / 2) * scale;
  const centerY = 230 - ((minY + maxY) / 2) * scale;
  const screen = (point) => ({ ...point, sx: point.x * scale + centerX, sy: point.y * scale + centerY });
  const trunkScreen = trunkPoints.map(screen);
  const boxScreen = boxPoints.map(screen);

  return {
    trunkEdges: edgeIndexes.map(([a, b]) => ({ a: trunkScreen[a], b: trunkScreen[b] })),
    trunkFaces: faceIndexes.map((indexes) => ({
      points: indexes.map((index) => trunkScreen[index]),
      depth: indexes.reduce((sum, index) => sum + trunkScreen[index].depth, 0) / indexes.length,
    })).sort((a, b) => a.depth - b.depth),
    boxFaces: faceIndexes.map((indexes, faceIndex) => ({
      faceIndex,
      points: indexes.map((index) => boxScreen[index]),
      depth: indexes.reduce((sum, index) => sum + boxScreen[index].depth, 0) / indexes.length,
    })).sort((a, b) => a.depth - b.depth),
  };
}

function pointsToString(points) {
  return points.map((point) => `${point.sx.toFixed(1)},${point.sy.toFixed(1)}`).join(" ");
}

export function SubwooferFitCalculator() {
  const [measurements, setMeasurements] = useState(defaultMeasurements);
  const [yaw, setYaw] = useState(-32);
  const [pitch, setPitch] = useState(36);
  const dragRef = useRef(null);

  const fit = useMemo(() => {
    const trunk = {
      width: toNumber(measurements.trunkWidth),
      depth: toNumber(measurements.trunkDepth),
      height: toNumber(measurements.trunkHeight),
    };
    const orientations = getOrientations(measurements).map((orientation) => ({
      ...orientation,
      fits:
        orientation.width <= trunk.width &&
        orientation.depth <= trunk.depth &&
        orientation.height <= trunk.height,
      freeWidth: trunk.width - orientation.width,
      freeDepth: trunk.depth - orientation.depth,
      freeHeight: trunk.height - orientation.height,
    }));
    const best = orientations.find((orientation) => orientation.fits) || orientations[0];
    const volumeTrunk = trunk.width * trunk.depth * trunk.height;
    const volumeBox = toNumber(measurements.boxWidth) * toNumber(measurements.boxDepth) * toNumber(measurements.boxHeight);

    return {
      trunk,
      best,
      fits: orientations.some((orientation) => orientation.fits),
      usedPercent: Math.round((volumeBox / volumeTrunk) * 100),
    };
  }, [measurements]);

  const scene = useMemo(() => buildScene(fit.trunk, fit.best, yaw, pitch), [fit.trunk, fit.best, yaw, pitch]);

  function updateMeasurement(key, value) {
    setMeasurements((current) => ({ ...current, [key]: value }));
  }

  function startDrag(event) {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY };
  }

  function drag(event) {
    if (!dragRef.current) return;
    event.preventDefault();
    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;
    dragRef.current = { x: event.clientX, y: event.clientY };
    setYaw((current) => current + deltaX * 0.45);
    setPitch((current) => Math.max(12, Math.min(70, current - deltaY * 0.35)));
  }

  function stopDrag(event) {
    event?.currentTarget?.releasePointerCapture?.(event.pointerId);
    dragRef.current = null;
  }

  function preventViewerWheel(event) {
    event.preventDefault();
  }

  return (
    <section className="shop-container sub-fit sub-fit--page">
      <div className="sub-fit__copy">
        <p className="shop-eyebrow">Subwoofer-fit</p>
        <h1>Sjekk om subwooferen passer i bagasjerommet.</h1>
        <p>
          Legg inn mål på bagasjerommet og basskassen/subwooferen. Dra 3D-visningen med musen for å se rundt bilen og boksen.
        </p>
        <div className={fit.fits ? "sub-fit__result is-ok" : "sub-fit__result is-bad"}>
          <strong>{fit.fits ? "Ser ut til å passe" : "Passer trolig ikke"}</strong>
          <span>
            {fit.fits
              ? `Beste retning gir ca. ${Math.max(0, fit.best.freeWidth)} cm sideklarering, ${Math.max(0, fit.best.freeDepth)} cm dybde og ${Math.max(0, fit.best.freeHeight)} cm høyde.`
              : "Kassen er større enn bagasjerommet i minst én retning. Prøv andre mål, roter kassen fysisk, eller send oss bilmodell og mål."}
          </span>
        </div>
        <ul className="sub-fit__notes">
          <li>Dra med mus eller finger i 3D-feltet for å se rundt.</li>
          <li>Husk plass til kabler, forsterker, vinklet bakluke og festing.</li>
          <li>Dette er en målsjekk, ikke en garanti for alle ujevne bagasjerom.</li>
        </ul>
      </div>

      <div className="sub-fit__panel">
        <div className="sub-fit__fields">
          {fieldGroups.map((group) => (
            <fieldset key={group.title}>
              <legend>{group.title}</legend>
              <div>
                {group.fields.map((field) => (
                  <label key={field.key}>
                    {field.label}
                    <span>
                      <input
                        min="1"
                        name={field.key}
                        onChange={(event) => updateMeasurement(field.key, event.target.value)}
                        type="number"
                        value={measurements[field.key]}
                      />
                      <small>{field.suffix}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="sub-fit__viewer" aria-label="3D kalkulator for subwoofer i bagasjerom">
          <div className="sub-fit__viewer-head">
            <strong>Dra for å se rundt</strong>
            <span>
              {fit.usedPercent > 100
                ? `Større enn målt bagasjeromsvolum (${fit.usedPercent}%)`
                : `Tar ca. ${fit.usedPercent}% av målt bagasjeromsvolum`}
            </span>
          </div>
          <svg
            className="sub-fit__svg"
            role="img"
            viewBox="0 0 720 440"
            onPointerDown={startDrag}
            onPointerMove={drag}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            onLostPointerCapture={stopDrag}
            onWheel={preventViewerWheel}
          >
            <title>3D-visning av subwooferboks inni bagasjerom</title>
            <defs>
              <linearGradient id="subBoxFace" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor={fit.fits ? "#ff4b4f" : "#5b5b5b"} />
                <stop offset="1" stopColor={fit.fits ? "#9f0d14" : "#d71920"} />
              </linearGradient>
              <filter id="boxShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.35" />
              </filter>
            </defs>

            {scene.trunkFaces.map((face, index) => (
              <polygon key={`trunk-face-${index}`} points={pointsToString(face.points)} fill="rgba(255,255,255,0.05)" stroke="none" />
            ))}
            {scene.trunkEdges.map((edge, index) => (
              <line
                key={`trunk-edge-${index}`}
                x1={edge.a.sx}
                y1={edge.a.sy}
                x2={edge.b.sx}
                y2={edge.b.sy}
                stroke="rgba(255,255,255,0.72)"
                strokeDasharray={index > 7 ? "7 5" : undefined}
                strokeLinecap="round"
                strokeWidth="2.5"
              />
            ))}
            {scene.boxFaces.map((face) => (
              <polygon
                key={`box-face-${face.faceIndex}`}
                points={pointsToString(face.points)}
                fill="url(#subBoxFace)"
                filter="url(#boxShadow)"
                opacity={face.faceIndex === 0 ? 0.82 : 0.96}
                stroke="rgba(255,255,255,0.75)"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
            ))}
            <text x="360" y="220" dominantBaseline="middle" textAnchor="middle" className="sub-fit__svg-label">
              SUB
            </text>
          </svg>
          <div className="sub-fit__controls">
            <label><span>Roter: {Math.round(yaw)}°</span><input min="-180" max="180" type="range" value={yaw} onChange={(event) => setYaw(Number(event.target.value))} /></label>
            <label><span>Vinkel: {Math.round(pitch)}°</span><input min="12" max="70" type="range" value={pitch} onChange={(event) => setPitch(Number(event.target.value))} /></label>
          </div>
          <p className="sub-fit__orientation">Viser beste retning: {fit.best.label}</p>
        </div>
      </div>
    </section>
  );
}
