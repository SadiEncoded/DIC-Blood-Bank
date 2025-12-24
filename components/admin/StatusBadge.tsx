import { Clock, History, LucideIcon, ShieldAlert, UserCheck } from 'lucide-react';

type StatusType = 'critical' | 'pending' | 'verified' | 'completed';

interface StatusConfig {
  label: string;
  style: string;
  icon: LucideIcon;
}

const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  critical: {
    label: 'CRITICAL',
    style: 'bg-rose-50 text-rose-700 border-rose-100',
    icon: ShieldAlert,
  },
  pending: {
    label: 'PENDING',
    style: 'bg-amber-50 text-amber-700 border-amber-100',
    icon: Clock,
  },
  verified: {
    label: 'VERIFIED',
    style: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    icon: UserCheck,
  },
  completed: {
    label: 'COMPLETED',
    style: 'bg-slate-50 text-slate-600 border-slate-200',
    icon: History,
  },
};

interface StatusBadgeProps {
  type: StatusType;
}

export function StatusBadge({ type }: StatusBadgeProps) {
  const config = STATUS_CONFIG[type] || STATUS_CONFIG.pending;
  const Icon = config.icon;

  return (
    <span
      className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold border tracking-wider ${config.style}`}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
}
