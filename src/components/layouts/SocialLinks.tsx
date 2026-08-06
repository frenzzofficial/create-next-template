import { XIcon } from "lucide-react";
import { Link } from "@/components/ui";
import "@/styles/layouts/social-links.css";
import GithubIcon from "@/components/ui/svg/GithubIcon";
import LinkedinIcon from "@/components/ui/svg/LinkedinIcon";
import { appConfig } from "@/packages/configs/app.config";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: appConfig.socialMedia.github,
    Icon: GithubIcon,
    color: "#24292e",
  },
  {
    label: "X",
    href: appConfig.socialMedia.twitter,
    Icon: XIcon,
    color: "#000000",
  },
  {
    label: "LinkedIn",
    href: appConfig.socialMedia.linkedin,
    Icon: LinkedinIcon,
    color: "#0A66C2",
  },
];

const SocialLinks = () => {
  return (
    <ul className="site-footer-social">
      {SOCIAL_LINKS.map(({ label, href, Icon, color }) => (
        <li
          key={label}
          className="site-footer-social-item"
          style={
            {
              "--social-color": color,
            } as React.CSSProperties
          }
        >
          <span className="site-footer-tooltip">{label}</span>

          <Link
            type="none"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="site-footer-social-link"
            variant="neutral"
          >
            <Icon width={48} height={48} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
