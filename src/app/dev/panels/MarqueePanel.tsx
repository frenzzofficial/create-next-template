import { Marquee } from "@/components/ui";

const keywords = [
  "React",
  "Next.js",
  "Tailwind",
  "shadcn/ui",
  "AI",
  "Automation",
  "SEO",
  "Gsap",
  "Framer Motion",
  "Three.js",
  "WebGL",
];

const MarqueePanel = () => {
  return (
    <>
      <Marquee
        keywords={keywords}
        speed={20}
        direction="left"
        pauseOnHover={true}
        className="w-full"
      />
      <Marquee
        keywords={keywords}
        speed={20}
        direction="right"
        pauseOnHover={true}
        className="w-full"
      />
    </>
  );
};

export default MarqueePanel;
