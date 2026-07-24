"use client";
import { ChevronDown, Palette } from "lucide-react";
import { useStyleTheme } from "../providers/StyleProvider";

const StyleSelector = () => {
  const { currentTheme, setTheme, themes } = useStyleTheme();

  return (
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
  );
};

export default StyleSelector;
