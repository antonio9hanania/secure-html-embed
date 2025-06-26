"use client";

interface StepNavigationProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  canNext: boolean;
}

export default function StepNavigation({
  currentStep,
  onNext,
  onPrev,
  onReset,
  canNext,
}: StepNavigationProps) {
  return (
    <>
      {/* Step Indicator */}
      <div className="step-indicator">
        <div
          className={`step ${currentStep >= 1 ? "active" : ""} ${
            currentStep > 1 ? "completed" : ""
          }`}
        >
          1
        </div>
        <div
          className={`step-separator ${currentStep > 1 ? "active" : ""}`}
        ></div>
        <div
          className={`step ${currentStep >= 2 ? "active" : ""} ${
            currentStep > 2 ? "completed" : ""
          }`}
        >
          2
        </div>
        <div
          className={`step-separator ${currentStep > 2 ? "active" : ""}`}
        ></div>
        <div className={`step ${currentStep >= 3 ? "active" : ""}`}>3</div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <div>
          {currentStep > 1 && (
            <button className="button" onClick={onPrev}>
              ← Previous
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="button button-danger" onClick={onReset}>
            🗑️ Reset
          </button>

          {currentStep < 3 && (
            <button
              className="button button-success"
              onClick={onNext}
              disabled={!canNext}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </>
  );
}
