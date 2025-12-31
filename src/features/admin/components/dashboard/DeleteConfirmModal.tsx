'use client';

import Portal from '@/components/common/Portal';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message?: string;
    isProcessing?: boolean;
}

export const DeleteConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message = "This action cannot be undone. Are you sure you want to proceed?",
    isProcessing = false
}: DeleteConfirmModalProps) => {
    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[110] overflow-y-auto">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-zinc-950/20 backdrop-blur-sm"
                        />
                        
                        {/* Container */}
                        <div className="flex min-h-screen items-center justify-center p-4 relative pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-[24px] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden pointer-events-auto"
                            >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-600">
                                    <AlertTriangle size={24} />
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-xl transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">{title}</h3>
                            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-8">{message}</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    disabled={isProcessing}
                                    className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={isProcessing}
                                    className="flex-1 px-4 py-3 bg-rose-600 text-white rounded-xl text-sm font-black uppercase tracking-wider hover:bg-rose-700 active:scale-95 transition-all shadow-lg shadow-rose-200 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isProcessing ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Trash2 size={16} />
                                            <span>Delete</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
};
