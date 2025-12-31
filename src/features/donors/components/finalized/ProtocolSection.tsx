'use client';

import { motion } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';

const PROTOCOL_STEPS = [
    { t: "Initiate Emergency Contact", d: "Coordinate with the donor regarding the specific hospital wing and arrival time." },
    { t: "Prepare Documentation", d: "Ensure the blood requisition slips and patient ID are ready at the laboratory desk." },
    { t: "Verify Completion", d: "Once the procedure is finished, record the success in the registry below." }
];

export function ProtocolSection() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-slate-100 rounded-[1.5rem] p-6 shadow-sm"
        >
            <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                    <ClipboardCheck size={16} />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol</h3>
            </div>
            
            <div className="space-y-6">
                {PROTOCOL_STEPS.map((step, i) => (
                    <div key={i} className="flex gap-4 group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-slate-50 border border-slate-100 text-slate-900 text-[10px] font-black flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                            0{i + 1}
                        </div>
                        <div className="pt-0.5">
                            <p className="font-bold text-slate-800 text-sm mb-1 tracking-tight font-anek">{step.t}</p>
                            <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">{step.d}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
