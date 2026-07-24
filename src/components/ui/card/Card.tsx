import { cn } from "@/packages/utils/cn";

export type CardProps = {
  children: React.ReactNode;
  variants?: "interactive" | "static";
  /**
   * Omit the card's own padding — for cards with their own header/content/
   * footer sections managing spacing individually (see AuthForm.tsx for
   * a consumer that needs this).
   */
  flush?: boolean;
  className?: string;
};

const Card = ({
  children,
  variants = "static",
  flush = false,
  className,
}: CardProps) => {
  return (
    <div
      className={cn(
        "card",
        `card-${variants}`,
        flush && "card-flush",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
