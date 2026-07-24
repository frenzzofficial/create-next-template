import { Card } from "@/components/ui";
import ComponentPreview from "./ComponentPreview";

const SurfacesPanel = () => {
  return (
    <>
      <div className="dev-page-header">
        <div className="dev-page-eyebrow">Design system</div>
        <h1 className="dev-page-title">Surfaces</h1>
        <p className="dev-page-lede">
          The centralized <code>&lt;Card /&gt;</code> — every card-shaped
          surface in the app (auth forms, contact form, profile) renders through
          this same component.
        </p>
      </div>

      <section className="dev-section">
        <ComponentPreview name="Static" tag='<Card variants="static" />'>
          <Card>
            <div className="card-header">
              <h3 className="card-title">Project Alpha</h3>
              <p className="card-description">
                A static, non-interactive surface.
              </p>
            </div>
          </Card>
        </ComponentPreview>

        <ComponentPreview
          name="Interactive"
          tag='<Card variants="interactive" />'
        >
          <Card variants="interactive">
            <div className="card-header">
              <h3 className="card-title">Project Beta</h3>
              <p className="card-description">
                Hover — lifts and gains a ring.
              </p>
            </div>
          </Card>
        </ComponentPreview>
      </section>
    </>
  );
};

export default SurfacesPanel;
