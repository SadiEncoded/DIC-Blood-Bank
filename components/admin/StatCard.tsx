import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  color: string;
  trend?: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, color, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {label}
          </p>
          <p className={`text-2xl font-black font-mono ${color}`}>
            {value}
          </p>
        </div>
        <div className={`p-2 rounded-lg bg-slate-50 ${color.replace('text', 'text opacity-70')}`}>
          <Icon size={18} />
        </div>
      </div>
      {trend && (
        <div className="mt-2 text-[10px] font-medium text-slate-400 flex items-center gap-1">
          <span className="text-emerald-500 font-bold">{trend}</span> vs previous shift
        </div>
      )}
    </div>
  );
}
