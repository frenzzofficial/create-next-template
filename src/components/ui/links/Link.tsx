import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/packages/utils/cn";

type LinkProps = NextLinkProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof NextLinkProps> & {
    label?: ReactNode;
    variant?: "primary" | "secondary" | "neutral";
    direction?: "left" | "right" | "center";
  };

const Link = ({
  label,
  children,
  variant = "primary",
  direction = "center",
  className,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      {...props}
      className={cn(
        "Link",
        `Link-${variant}`,
        variant === "primary" && `Link-${direction}`,
        className,
      )}
    >
      {label ?? children}
    </NextLink>
  );
};

export default Link;
