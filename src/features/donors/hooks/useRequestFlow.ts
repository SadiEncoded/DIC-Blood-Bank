import { useState } from 'react';

export function useRequestFlow(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  return {
    currentStep,
    direction,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    // Helper booleans for the 4-stage workflow
    isRequestStage: currentStep === 1,
    isVerificationStage: currentStep === 2,
    isMatchingStage: currentStep === 3,
    isFinalizedStage: currentStep === 4,
  };
}
