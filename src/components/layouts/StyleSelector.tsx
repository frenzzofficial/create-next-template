"use client";

import { ChevronDown } from "lucide-react";
import { useStyleTheme } from "../providers/StyleProvider";
import { Select } from "../ui";

const StyleSelector = () => {
  const { currentTheme, setTheme, themes } = useStyleTheme();

  return (
    <div className="relative p-4">
      <Select
        name="theme"
        value={currentTheme}
        label=""
        error=""
        defaultChecked={true}
        options={themes.map((theme) => ({
          label: theme.label,
          value: theme.name,
        }))}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          setTheme(event.target.value as typeof currentTheme)
        }
        className="pl-10 pr-10"
      />

      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};

export default StyleSelector;
