"use client";

import ThemeToggle from "@/components/layouts/ThemeToggle";
import {
  useNavigationActions,
  useNavigationState,
} from "@/components/providers/NavigationProvider";
import { Button, Link } from "@/components/ui";
import { appConfig } from "@/packages/configs/app.config";

const NavbarDesktopAction = () => {
  const mobileMenuOpen = useNavigationState("mobileMenuOpen");
  const { toggleMobileMenu } = useNavigationActions();

  return (
    <div className="header-actions">
      <ThemeToggle />
      <Link href={appConfig.routes.auth.signin}>Sign In</Link>

      {/* Mobile Menu Toggle Burger Button */}
      <Button
        className={`mobile-toggle-btn ${mobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
        variant="ghost"
      >
        <span />
        <span />
        <span />
      </Button>
    </div>
  );
};

export default NavbarDesktopAction;
