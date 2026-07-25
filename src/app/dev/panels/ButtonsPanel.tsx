import { Button } from "@/components/ui";
import type { Variants } from "@/types/app";
import ComponentPreview from "./ComponentPreview";

const BUTTON_VARIANTS: Variants[] = [
  "primary",
  "secondary",
  "ghost",
  "outline",
  "danger",
  "success",
  "link",
];

const ButtonsPanel = () => {
  return (
    <>
      <div className="dev-page-header">
        <div className="dev-page-eyebrow">Design system</div>
        <h1 className="dev-page-title">Buttons</h1>
        <p className="dev-page-lede">
          Seven variants, one shared <code>.btn</code> base class for
          layout/motion — see <code>components/ui/buttons/Button.tsx</code>.
        </p>
      </div>

      <section className="dev-section">
        <ComponentPreview name="All variants" tag="<Button variant={...} />">
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </ComponentPreview>

        <ComponentPreview name="Disabled" tag="<Button disabled />">
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          ))}
        </ComponentPreview>
      </section>
    </>
  );
};

export default ButtonsPanel;
