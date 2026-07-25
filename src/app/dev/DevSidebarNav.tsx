"use client";

import { Button, Link } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import { type DevSection, useDevSection } from "./DevProvider";

const NAV_SECTIONS: {
  label: string;
  items: { label: string; id: DevSection }[];
}[] = [
  {
    label: "Reference",
    items: [{ label: "Overview", id: "overview" }],
  },
  {
    label: "Foundations",
    items: [
      { label: "Colors & tokens", id: "colors" },
      { label: "Styles", id: "styles" },
      { label: "Typography", id: "typography" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Links", id: "Links" },
      { label: "Buttons", id: "buttons" },
      { label: "Form controls", id: "forms" },
      { label: "Surfaces", id: "surfaces" },
    ],
  },
];

const DevSidebarNav = () => {
  const { activeSection, setActiveSection } = useDevSection();

  return (
    <nav className="dev-sidebar" aria-label="Design system reference">
      <div className="dev-sidebar-brand">
        <span className="dev-sidebar-eyebrow">Internal Reference</span>
      </div>

      {NAV_SECTIONS.map((section) => (
        <div className="dev-nav-group" key={section.label}>
          <div className="dev-nav-label">{section.label}</div>

          {section.items.map((item) => (
            <Button
              key={item.id}
              type="button"
              variant="outline"
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "dev-nav-link",
                activeSection === item.id && "active",
              )}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <span className="dev-nav-dot" />
              {item.label}
            </Button>
          ))}
        </div>
      ))}

      <div className="dev-sidebar-footer">
        <Link href="/" variant="primary">
          ← Back to site
        </Link>
      </div>
    </nav>
  );
};

export default DevSidebarNav;
