"use client";

import { useState } from "react";
import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import StepThree from "@/components/StepThree";
import StepNavigation from "@/components/StepNavigation";
import { StepOneOutput, StepTwoOutput } from "@/types/embed";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<StepOneOutput | null>(null);
  const [stepTwoData, setStepTwoData] = useState<StepTwoOutput | null>(null);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setStepOneData(null);
    setStepTwoData(null);
  };

  const canNext = () => {
    switch (currentStep) {
      case 1:
        return stepOneData !== null;
      case 2:
        return stepTwoData !== null;
      default:
        return false;
    }
  };

  return (
    <div className="container">
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#007bff", marginBottom: "10px" }}>
          🔒 Secure HTML Embed System
        </h1>
        <p style={{ color: "#666", fontSize: "18px" }}>
          Step-by-Step: Generate → Extract src → Use Directly in Next.js
        </p>
      </header>

      <StepNavigation
        currentStep={currentStep}
        onNext={handleNext}
        onPrev={handlePrev}
        onReset={handleReset}
        canNext={canNext()}
      />

      {currentStep === 1 && <StepOne onDataGenerated={setStepOneData} />}

      {currentStep === 2 && stepOneData && (
        <StepTwo inputData={stepOneData} onJsonGenerated={setStepTwoData} />
      )}

      {currentStep === 3 && stepTwoData && (
        <StepThree embedJson={stepTwoData} />
      )}

      <footer
        style={{
          marginTop: "50px",
          padding: "20px",
          textAlign: "center",
          color: "#666",
          borderTop: "1px solid #dee2e6",
        }}
      >
        <p>
          🔒 <strong>Secure HTML Embed Generator</strong> - Complete XSS
          Protection
        </p>
        <p style={{ fontSize: "14px", marginTop: "10px" }}>
          Free • Open Source • Self-Hosted Iframe Resizer • Production Ready
        </p>
      </footer>
    </div>
  );
}
