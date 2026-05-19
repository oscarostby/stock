import Image from "next/image";
import logoImage from "../assets/images/brand/logo.png";

export function BrandMark({ className = "", compact = false, priority = false }) {
  return (
    <div
      className={`brand-mark${compact ? " brand-mark--compact" : ""}${className ? ` ${className}` : ""}`}
      role="img"
      aria-label="Instalyd.no bilstereo og CarPlay"
    >
      <Image
        src={logoImage}
        alt=""
        priority={priority}
        sizes={compact ? "112px" : "(max-width: 720px) 220px, 360px"}
      />
    </div>
  );
}
