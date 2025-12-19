import { useRef } from "react";
import "./NeonCard.css";

export default function NeonCard({
  children,
  isBlue,
  isWhite,
  isPink,
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  const cardClass = `
    neon-card
    ${isBlue ? "neon-card-blue" : ""}
    ${isWhite ? "neon-card-white" : ""}
    ${isPink ? "neon-card-pink" : ""}
  `;

  return (
    <div
      ref={cardRef}
      className={cardClass}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}

export { NeonCard };