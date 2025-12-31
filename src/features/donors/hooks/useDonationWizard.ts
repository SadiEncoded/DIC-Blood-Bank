'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Donor } from '../types';
import { useRequestFlow } from './useRequestFlow';

const WORKFLOW_TOTAL_STEPS = 4;

export function useDonationWizard() {
  const flow = useRequestFlow(WORKFLOW_TOTAL_STEPS);
  
  // Wizard Data State
  const [requestDetails, setRequestDetails] = useState<any | null>(null);
  const [trackingId, setTrackingId] = useState<string>('');
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  // Handlers
  const handleFormSuccess = useCallback((id: string, details: any) => {
    setTrackingId(id);
    setRequestDetails(details);
    flow.nextStep();
  }, [flow]);
  
  const handleVerificationComplete = useCallback(() => {
    flow.nextStep();
  }, [flow]);

  const handleDonorSelect = useCallback((donor: Donor) => {
    setSelectedDonor(donor);
    flow.nextStep();
  }, [flow]);

  const handleRestartScan = useCallback(() => {
    flow.goToStep(1);
    // Optional: clear state? likely keep request details but reset donor
    setSelectedDonor(null);
  }, [flow]);

  const handleReset = useCallback(() => {
    sessionStorage.removeItem('dic_wizard_state');
    setTrackingId('');
    setRequestDetails(null);
    setSelectedDonor(null);
    flow.goToStep(1);
  }, [flow]);

  // Persistence Logic
  useEffect(() => {
    const saved = sessionStorage.getItem('dic_wizard_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.trackingId) {
          setTrackingId(parsed.trackingId);
          setRequestDetails(parsed.requestDetails);
          setSelectedDonor(parsed.selectedDonor);
          flow.goToStep(parsed.step || 1);
        }
      } catch (e) {
        console.error("Failed to restore wizard state", e);
      }
    }
  }, []); // Run once on mount

  useEffect(() => {
    if (trackingId) {
      sessionStorage.setItem('dic_wizard_state', JSON.stringify({
        trackingId,
        requestDetails,
        selectedDonor,
        step: flow.currentStep
      }));
    }
  }, [trackingId, requestDetails, selectedDonor, flow.currentStep]);

  // Safeguard: If on Finalized step but no donor selected, go back
  useEffect(() => {
    if (flow.isFinalizedStage && !selectedDonor) {
      // Allow a small grace period for hydration
      const timer = setTimeout(() => {
         // Re-check to avoid race condition with the restoration effect
         if (!selectedDonor) {
             console.warn("Invalid transition to Finalized Stage: No donor selected. Reverting...");
             flow.goToStep(3); 
         }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [flow.isFinalizedStage, selectedDonor, flow]);

  return {
    ...flow,
    requestDetails,
    trackingId,
    selectedDonor,
    handleFormSuccess,
    handleVerificationComplete,
    handleDonorSelect,
    handleRestartScan,
    handleReset
  };
}
