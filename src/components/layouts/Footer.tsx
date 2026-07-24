import NavigationLogo from "@/components/ui/images/NavigationLogo";
import { appConfig } from "@/packages/configs/app.config";
import FooterNavbar from "../features/navigation/footer/FooterNavbar";
import SocialLinks from "./SocialLinks";

/**
 * Footer.tsx
 * --------------------------------------------------------------
 * One responsive component for both breakpoints — mobile is a stacked
 * layout, desktop puts the brand block and nav columns side by side.
 * Same markup either way; see the @media block in navigation.css
 * (styles/ui/navigation.css) for the actual responsive behavior, kept
 * there alongside the header/drawer/dropdown nav styles as requested
 * rather than a separate footer.css.
 *
 * No "use client" — nothing here is interactive, so this stays a
 * Server Component and can import LucideIcon directly (safe here; see
 * the barrel-export landmine in AGENTS.md for why that's NOT true from
 * a Client Component).
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <NavigationLogo width={128} height={128} />
            <p className="site-footer-tagline">{appConfig.site.description}</p>
            <SocialLinks />
          </div>
          <FooterNavbar />
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-copyright">
            &copy; {year} {appConfig.site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
