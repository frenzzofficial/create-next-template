import type { IconSvgElement } from "@hugeicons/react";
import type { ComponentType, CSSProperties } from "react";

import type { AppIconsName } from "@/components/ui/images/AppIcons";
import type { navigationConfig } from "@/packages/configs/navigation.config";

/**
 * ---------------------------------------------------------------------------
 * Navigation Item
 * ---------------------------------------------------------------------------
 *
 * Generic navigation link used across headers, footers, sidebars and
 * mobile navigation.
 */
export type NavigationItem = {
  /** Visible navigation label. */
  label: string;

  /** Destination URL. */
  href: string;

  /** Registry-safe Lucide icon name. */
  icon?: AppIconsName;

  /** Whether the link points to an external destination. */
  external?: boolean;

  /** Optional nested navigation items. Expected to be one level deep. */
  children?: NavigationItem[];

  /** Optional description used by richer navigation presentations. */
  description?: string;
};

/**
 * A named group of navigation items.
 *
 * Used by footer columns, grouped navigation menus and other section-based
 * navigation layouts.
 */
export type NavigationSection = {
  /** Unique identifier when a section needs to be referenced by state/config. */
  id?: string;

  /** Visible section/group title. */
  title?: string;

  /** Visible label for sidebar/layout navigation sections. */
  label?: string;

  /** Hugeicons icon used by sidebar/layout navigation sections. */
  icon?: IconSvgElement;

  /** Navigation items belonging to this section. */
  items: NavigationItem[];

  /**
   * Component rendered when this section is active.
   *
   * Typically supplied as a next/dynamic(...) component for lazy loading.
   */
  component?: ComponentType;
};

/**
 * ---------------------------------------------------------------------------
 * Dropdown Navigation
 * ---------------------------------------------------------------------------
 */

/**
 * A single text-only link inside a dropdown category.
 *
 * Deliberately narrower than NavigationItem because dropdown links are
 * expected to remain one level deep.
 */
export type NavigationDropdownLink = {
  /** Visible link label. */
  label: string;

  /** Destination URL. */
  href: string;
};

/**
 * One category/column inside a desktop mega-dropdown or mobile accordion.
 */
export type NavigationDropdownCategory = {
  /** Category heading shown above the links. */
  category: string;

  /** Links belonging to this category. */
  items: NavigationDropdownLink[];
};

/**
 * ---------------------------------------------------------------------------
 * Header Navigation
 * ---------------------------------------------------------------------------
 */

/**
 * A top-level header navigation entry.
 *
 * A navigation tab is either:
 * - a normal link using `href`, or
 * - a dropdown trigger using `dropdown`.
 *
 * The presence of `dropdown` determines which rendering strategy the navbar
 * uses.
 */
export type NavigationTab = {
  /**
   * Stable identifier used by NavigationProvider to track which dropdown or
   * mobile accordion is currently active.
   */
  id: string;

  /** Visible tab title. */
  title: string;

  /** Destination for a plain navigation tab. */
  href?: string;

  /** Dropdown categories displayed for this tab. */
  dropdown?: NavigationDropdownCategory[];
};

/**
 ---------------------------------------------------------------------------
 * Navigation UI State
 * ---------------------------------------------------------------------------
 *
 * Transient UI state owned by NavigationProvider.
 *
 * This state should not be mixed with durable application state because it
 * represents the current state of a particular navigation/header instance.
 *
 * ONE shape is shared by every namespace ("navbar", "dashboard", a future
 * "docs-header", ...). A navbar instance only ever touches the
 * dropdown/drawer slices; a sidebar instance only ever touches the
 * collapse/mobile-panel slices. Sharing the shape (instead of a distinct
 * type per namespace) keeps `useNavigationAction(namespace)` a single
 * generic hook instead of needing a namespace -> action-shape overload map.
 */
export type NavigationState = {
  /** ID of the currently open desktop dropdown (mega-menu). */
  activeDropdown: string | null;

  /** ID of the currently expanded mobile dropdown/accordion category. */
  activeMobileCategory: string | null;

  /** Whether the mobile navigation drawer is open. */
  mobileMenuOpen: boolean;

  /** Whether a desktop sidebar is collapsed to an icon-only rail. */
  isCollapsed: boolean;

  /** Whether a mobile sidebar/panel drawer is open. */
  isMobileOpen: boolean;
};

/** Available keys in NavigationState. */
export type NavigationKey = keyof NavigationState;

/**
 * String key identifying which logical navigation instance a piece of UI
 * state belongs to. `NavigationProvider` lazily creates one isolated store
 * per namespace, so `useNavigationAction("navbar")` and
 * `useNavigationAction("dashboard")` never share or clobber each other's
 * state even though both read/write the same `NavigationState` shape.
 *
 * Derived from `navigationConfig.NAMESPACE` — the single source of truth
 * for well-known namespace strings — so the two never drift apart. The
 * `(string & {})` union member keeps those known values autocompletable
 * while still allowing arbitrary ad hoc namespaces (e.g. "docs-header",
 * "settings-sidebar") without a type-level allowlist edit every time.
 */
export type NavigationNamespace =
  | navigationConfig["NAMESPACE"][keyof navigationConfig["NAMESPACE"]]
  | (string & {});

/**
 * ---------------------------------------------------------------------------
 * Sidebar / Navigation Layout
 * ---------------------------------------------------------------------------
 */

/**
 * One entry in the application's left/sidebar navigation layout.
 *
 * This is intentionally different from NavigationItem because a layout
 * section can render a React component rather than simply navigating to a
 * URL.
 */
export type NavigationLayoutSection = {
  /** Unique ID used to match the section against `activePageId`. */
  id: string;

  /** Label shown in the sidebar, panel header and collapsed-rail tooltip. */
  label: string;

  /** Hugeicons icon reference used by the sidebar. */
  icon: IconSvgElement;

  /**
   * Component rendered in the right-side content panel when this section
   * becomes active.
   *
   * Pass a next/dynamic(...) reference when sections should lazy-load.
   */
  component: ComponentType;
};

/**
 * Complete list of sections used by the navigation layout.
 */
export type NavigationLayout = NavigationLayoutSection[];

/**
 * ---------------------------------------------------------------------------
 * Navigation Layout Context
 * ---------------------------------------------------------------------------
 */

/**
 * Public contract exposed by NavigationLayoutContext.
 *
 * Kept separate from the provider implementation so consumers can import
 * this type without importing the context/provider implementation itself.
 */
export type NavigationLayoutContextValue = {
  /** ID of the section currently rendered in the content panel. */
  activePageId: string;

  /**
   * Navigate to another section.
   *
   * Implementations should also close the mobile drawer.
   */
  setActivePageId: (id: string) => void;

  /** Whether the mobile sidebar drawer is currently open. */
  isMobileOpen: boolean;

  /** Manually open or close the mobile sidebar drawer. */
  setIsMobileOpen: (open: boolean) => void;

  /** Whether the desktop sidebar is collapsed to an icon-only rail. */
  isCollapsed: boolean;

  /** Manually set the desktop sidebar collapsed state. */
  setIsCollapsed: (collapsed: boolean) => void;

  /** Toggle the desktop sidebar between expanded and collapsed states. */
  toggleCollapsed: () => void;
};

/**
 * ---------------------------------------------------------------------------
 * Styling
 * ---------------------------------------------------------------------------
 */

/**
 * CSSProperties extended with a specific CSS custom property.
 *
 * Example:
 *
 * const style: CSSVariableStyle<"--sidebar-width"> = {
 *   "--sidebar-width": "280px",
 * };
 */
export type CSSVariableStyle<TVariableName extends `--${string}`> =
  CSSProperties & Record<TVariableName, string>;

/**
 * ---------------------------------------------------------------------------
 * Application Layout Data
 * ---------------------------------------------------------------------------
 */

/**
 * Complete layout/navigation data returned by the application layout API.
 */
export interface navigationDataType {
  header: {
    logo: {
      src: string;
      alt: string;
      href: string;
    };

    navigation: NavigationTab[];
  };

  footer: {
    copyright: string;

    /**
     * Footer navigation groups.
     *
     * Reuses NavigationSection so footer groups and other grouped navigation
     * structures share the same data contract.
     */
    navigation: NavigationSection[];
  };
}
