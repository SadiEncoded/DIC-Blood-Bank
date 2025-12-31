'use client';

import { Container, Section } from '@/components/ui';
import { DonorMatching } from '@/features/donors/components/DonorMatching';
import { FinalizedView } from '@/features/donors/components/FinalizedView';
import Hero from '@/features/donors/components/Hero';
import PendingApproval from '@/features/donors/components/PendingApproval';
import { BloodRequestForm } from '@/features/donors/components/RequestForm';
import { Stepper } from '@/features/donors/components/Stepper';
import { WORKFLOW_STEPS } from '@/features/donors/constants';
import { useDonationWizard } from '@/features/donors/hooks/useDonationWizard';
import { AnimatePresence, motion } from 'framer-motion';

export default function RequestPage() {
  const wizard = useDonationWizard();

  return (
    <div className="min-h-screen bg-slate-50/30 selection:bg-rose-500/10 selection:text-rose-600">
      <Hero />
      
      {/* 2. Blood Request Section: The Main Workflow */}
      <Section className="relative z-30 -mt-16 md:-mt-32 pb-12">
        <Container className="px-0 md:px-4">
          {/* Unified Wizard Card */}
          <div className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] border-x border-t md:border border-slate-100 shadow-xl shadow-slate-200/50 min-h-[600px] flex flex-col">
             
             {/* Header: Continuous Stepper */}
             <div className="border-b border-slate-100 bg-white/50 backdrop-blur-sm relative z-20">
                <Stepper currentStep={wizard.currentStep} steps={WORKFLOW_STEPS} />
             </div>

             {/* Body: Dynamic Content */}
             <div className="flex-1 relative bg-white">
               <AnimatePresence mode="wait">
                 {wizard.isRequestStage && (
                   <motion.div
                     key="stage-1-request"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.3 }}
                   >
                       {/* Form handles its own internal layout/headers */}
                       <BloodRequestForm 
                          onSuccess={wizard.handleFormSuccess} 
                          initialValues={wizard.requestDetails || undefined}
                       />
                   </motion.div>
                 )}

                 {wizard.isVerificationStage && (
                   <motion.div
                     key="stage-2-verification"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="p-8 md:p-16"
                   >
                       <PendingApproval 
                         trackingId={wizard.trackingId}
                         onReset={() => {}} 
                         onComplete={wizard.handleVerificationComplete}
                       />
                   </motion.div>
                 )}

                 {wizard.isMatchingStage && (
                   <motion.div
                     key="stage-3-matching"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="p-8 md:p-16"
                   >
                      <DonorMatching 
                          trackingId={wizard.trackingId}
                          bloodType={wizard.requestDetails?.bloodType}
                          location={wizard.requestDetails?.location}
                          onSelectDonor={wizard.handleDonorSelect}
                          onRetry={wizard.handleRestartScan}
                       />
                   </motion.div>
                 )}

                 {wizard.isFinalizedStage && (
                   <motion.div
                     key="stage-4-finalized"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="p-8 md:p-16"
                   >
                       <FinalizedView donor={wizard.selectedDonor} onReset={wizard.handleReset} />
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
