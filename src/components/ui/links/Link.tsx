import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/packages/utils/cn";
import type { LinkVariants, Position } from "@/types/app";

type LinkProps = NextLinkProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof NextLinkProps> & {
    label?: ReactNode;
    variant?: LinkVariants;
    direction?: Omit<Position, "top" | "bottom">;
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
        "link",
        `link-${variant}`,
        variant === "primary" && `link-${direction}`,
        className,
      )}
    >
      {label ?? children}
    </NextLink>
  );
};

export default Link;
