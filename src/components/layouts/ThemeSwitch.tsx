"use client";

import { ChevronDown, Palette } from "lucide-react";
import { useStyleTheme } from "@/components/providers/StyleProvider";

const ThemeSwitch = () => {
  const { currentTheme, setTheme, cycleTheme, themes } = useStyleTheme();

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className="relative">
        <Palette className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <select
          value={currentTheme}
          onChange={(event) =>
            setTheme(event.target.value as typeof currentTheme)
          }
          className="
            appearance-none
            rounded-lg
            border
            border-border
            bg-background
            py-2
            pr-10
            pl-10
            text-sm
            text-foreground
            outline-none
            transition-colors
            hover:border-primary
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        >
          {themes.map((theme) => (
            <option key={theme.name} value={theme.name}>
              {theme.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <button
        type="button"
        onClick={cycleTheme}
        className="
          rounded-lg
          bg-primary
          px-4
          py-2
          text-sm
          font-medium
          text-primary-foreground
          transition-all
          duration-200
          hover:scale-[1.02]
          hover:opacity-90
          active:scale-[0.98]
          focus:outline-none
          focus:ring-2
          focus:ring-primary/30
        "
      >
        Next Theme
      </button>
    </div>
  );
};

export default ThemeSwitch;
