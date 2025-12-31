'use client';

export function Sidebar() {
  return (
    <div className="hidden lg:block w-80 shrink-0">
       {/* Sidebar content */}
       <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
         <h4 className="font-bold text-slate-900 mb-4">Guidelines</h4>
         <ul className="space-y-3 text-sm text-slate-600">
           <li>• Provide accurate medical details</li>
           <li>• Upload valid prescription</li>
           <li>• Verify phone number</li>
         </ul>
       </div>
    </div>
  );
}
