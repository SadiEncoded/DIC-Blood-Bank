'use client';

import { AlertCircle, ArrowLeft } from 'lucide-react';

export function ExpiredSession() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100">
                <AlertCircle size={32} className="text-slate-300" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-anek tracking-tight">Session Expired</h2>
            <p className="text-slate-500 mt-2 font-medium">No donor data was found in the current state.</p>
            <button 
                onClick={() => window.location.reload()} 
                className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-600 hover:text-rose-700 transition-colors"
            >
                <ArrowLeft size={14} /> Return to Registry
            </button>
        </div>
    );
}
