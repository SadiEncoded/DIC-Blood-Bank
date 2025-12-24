'use client';

import { Container, Section } from '@/components/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DonorMatching } from './components/DonorMatching';
import { FinalizedView } from './components/FinalizedView';
import Hero from './components/Hero';
import { PendingApproval } from './components/PendingApproval';
import { BloodRequestForm } from './components/RequestForm';
import { Stepper } from './components/Stepper';
import { WORKFLOW_STEPS } from './constants';
import { useRequestFlow } from './hooks/useRequestFlow';

const WORKFLOW_TOTAL_STEPS = 4;

export default function RequestPage() {
  const { currentStep, nextStep, isRequestStage, isVerificationStage, isMatchingStage, isFinalizedStage } = useRequestFlow(WORKFLOW_TOTAL_STEPS);
  /* 
   * State to hold request details for the Donor Matching stage.
   * In a real app, we might re-fetch this using the trackingId, but passing it is faster.
   */
  const [requestDetails, setRequestDetails] = useState<{ bloodType: string; location: string } | null>(null);
  const [trackingId, setTrackingId] = useState<string>('');

  // Simulation handlers
  const handleFormSuccess = (id: string, details: { bloodType: string; location: string }) => {
    setTrackingId(id);
    setRequestDetails(details);
    nextStep();
  };
  
  const handleAdminApproval = () => {
    // In real app, this would be a backend trigger or polling
    nextStep();
  };

  const handleDonorAcceptance = () => {
    nextStep();
  };

  return (
    <div className="min-h-screen bg-slate-50/30 selection:bg-rose-500/10 selection:text-rose-600">
      <Hero />
      
      {/* 2. Blood Request Section: The Main Workflow */}
      <Section className="relative z-30 -mt-24 md:-mt-32 pb-12">
        <Container>
          <div className="space-y-8">
            {/* The Main Stepper Tracker */}
             <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <Stepper currentStep={currentStep} steps={WORKFLOW_STEPS} />
             </div>

             {/* Dynamic Stage View */}
             <AnimatePresence mode="wait">
               {isRequestStage && (
                 <motion.div
                   key="stage-1-request"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                 >
                    <div className="bg-white rounded-[2.5rem] p-6 md:p-12 border border-slate-100">
                      <div className="max-w-4xl mx-auto">
                          <BloodRequestForm onSuccess={handleFormSuccess} />
                      </div>
                    </div>
                 </motion.div>
               )}

               {isVerificationStage && (
                 <motion.div
                   key="stage-2-verification"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.05 }}
                 >
                    <div className="bg-white rounded-[2.5rem] p-6 md:p-12 border border-slate-100">
                       <PendingApproval 
                         onReset={() => {}} 
                       />
                       
                       {/* Dev Tool Simulation */}
                       <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                         <p className="text-xs text-slate-500 mb-2 uppercase tracking-widest font-bold">Developer Simulation</p>
                         <button 
                           onClick={handleAdminApproval}
                           className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors"
                         >
                           Simulate Admin Approval ⚡
                         </button>
                       </div>
                    </div>
                 </motion.div>
               )}

               {isMatchingStage && (
                 <motion.div
                   key="stage-3-matching"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.05 }}
                 >
                    <div className="bg-white rounded-[2.5rem] p-6 md:p-12 border border-slate-100">
                       <DonorMatching 
                          trackingId={trackingId}
                          bloodType={requestDetails?.bloodType}
                          location={requestDetails?.location}
                       />

                       {/* Dev Tool Simulation */}
                       <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                         <p className="text-xs text-slate-500 mb-2 uppercase tracking-widest font-bold">Developer Simulation</p>
                         <button 
                           onClick={handleDonorAcceptance}
                           className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors"
                         >
                           Simulate Donor Acceptance ⚡
                         </button>
                       </div>
                    </div>
                 </motion.div>
               )}

               {isFinalizedStage && (
                 <motion.div
                   key="stage-4-finalized"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                 >
                    <div className="bg-white rounded-[2.5rem] p-6 md:p-12 border border-slate-100">
                       <FinalizedView />
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </Container>
      </Section>
    </div>
  );
}
