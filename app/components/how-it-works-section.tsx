import type { StepCard } from "../dashboard-data";
import { CallSparkIcon, InsightsIcon, UploadIcon } from "./icons";

export function HowItWorksSection({ steps }: { steps: StepCard[] }) {
  return (
    <section className="how-it-works">
      <h2 className="section-title">How it works</h2>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <article key={step.step} className="step-card">
            <span className="step-label">{step.step}</span>
            <div className="step-icon">
              {index === 0 ? <UploadIcon /> : index === 1 ? <CallSparkIcon /> : <InsightsIcon />}
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <button className="secondary-button">{step.buttonLabel}</button>
          </article>
        ))}
      </div>
    </section>
  );
}
