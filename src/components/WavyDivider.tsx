interface WavyDividerProps {
  fillColor?: string; // fill color of the wave itself
  className?: string;
  inverted?: boolean;
}

export default function WavyDivider({
  fillColor = "currentColor",
  className = "",
  inverted = false,
}: WavyDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${inverted ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block h-10 w-full md:h-14 lg:h-18"
      >
        {/* Scalloped artisan wave inspired by spice jar label contours */}
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 850,-10 1000,60 C1100,105 1160,50 1200,20 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
