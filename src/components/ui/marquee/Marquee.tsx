export interface MarqueeProps {
  /** The list of keywords to display */
  keywords: string[];
  /** Seconds for one full loop */
  speed?: number;
  /** Scroll direction */
  direction?: "left" | "right";
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Extra classes for the outer wrapper */
  className?: string;
}

/**
 * Marquee
 * A single-component, self-contained scrolling marquee of keyword pills.
 * Styled entirely with shadcn/ui theme CSS variables, so it automatically
 * matches whatever theme (light/dark/custom) is set on your <html> root.
 */
const Marquee = ({
  keywords,
  speed = 25,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) => {
  if (!Array.isArray(keywords) || keywords.length === 0) return null;

  // Duplicate the list so the CSS translate loop is seamless.
  const items = [...keywords, ...keywords];

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pauseOnHover) e.currentTarget.style.animationPlayState = "paused";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pauseOnHover) e.currentTarget.style.animationPlayState = "running";
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-background py-6 ${className}`}
    >
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent" />

      <div
        role="marquee"
        className="marquee-track flex w-max items-center gap-3"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((word, i) => (
          <span
            key={`${word}-${i}-${keywords.length}`}
            className="flex-none whitespace-nowrap rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground"
          >
            {word}
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation-name: marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default Marquee;

/* Example usage:
<Marquee
  keywords={["React", "Next.js", "Tailwind", "shadcn/ui", "AI", "Automation", "SEO"]}
  speed={20}
  direction="left"
/>

Requires these CSS variables to be defined on your theme root (standard
shadcn/ui setup via `npx shadcn init` already provides them):
  --background, --foreground, --border, --muted, --muted-foreground
*/
