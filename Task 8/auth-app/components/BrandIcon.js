/**
 * components/BrandIcon.js
 * Unique Aurum Auth logo — a geometric diamond-key motif
 */
export default function BrandIcon({ size = 52, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer octagon ring */}
      <polygon
        points="26,3 43,10 49,26 43,42 26,49 9,42 3,26 9,10"
        stroke="#c9a84c"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      {/* Inner diamond */}
      <polygon
        points="26,11 38,26 26,41 14,26"
        stroke="#c9a84c"
        strokeWidth="1.5"
        fill="rgba(201,168,76,0.08)"
      />
      {/* Key-hole circle */}
      <circle cx="26" cy="22" r="5" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      {/* Key-hole stem */}
      <rect x="24" y="26" width="4" height="7" rx="1" fill="#c9a84c" opacity="0.9" />
      {/* Crossbar */}
      <rect x="22" y="29" width="8" height="1.5" rx="0.75" fill="#c9a84c" opacity="0.9" />
      {/* Corner accents */}
      <line x1="26" y1="3" x2="26" y2="7" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
      <line x1="26" y1="45" x2="26" y2="49" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
      <line x1="3" y1="26" x2="7" y2="26" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
      <line x1="45" y1="26" x2="49" y2="26" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
