import { getAdminStats } from '@/lib/services/admin.service';
import {
    Activity,
    AlertCircle,
    ArrowRight,
    Calendar,
    CheckCircle2,
    Clock,
    Droplets,
    Plus,
    Users
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  const quickStats = [
    { label: 'Pending Requests', value: stats.pendingRequests, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Critical Needs', value: stats.criticalNeeds, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Verified Donors', value: stats.verifiedDonors, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Volunteers', value: stats.totalDonors, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-poppins">Admin Dashboard</h1>
        <p className="text-slate-500 mt-2 font-hind">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 font-poppins flex items-center gap-3">
                <Activity className="text-rose-500" /> Platform Overview
              </h2>
              <Link href="/admin/requests" className="text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-rose-200 transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-rose-500 transition-colors mb-4">
                        <Droplets size={20} />
                    </div>
                    <h4 className="font-bold text-slate-900 font-poppins text-lg">Blood Requests</h4>
                    <p className="text-sm text-slate-500 font-hind mt-2">Manage live hospital requisitions and donor matches.</p>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-emerald-200 transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors mb-4">
                        <Users size={20} />
                    </div>
                    <h4 className="font-bold text-slate-900 font-poppins text-lg">Donor Management</h4>
                    <p className="text-sm text-slate-500 font-hind mt-2">Verify new donors and update volunteer records.</p>
                </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 text-white">
            <h3 className="text-lg font-bold font-poppins mb-6">Quick Actions</h3>
            <div className="space-y-3">
                <Link href="/admin/events/new" className="w-full flex items-center gap-3 px-5 py-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                    <Calendar size={18} className="text-rose-400" />
                    <span className="font-bold text-sm">Post New Event</span>
                    <Plus size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/admin/stories/new" className="w-full flex items-center gap-3 px-5 py-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                    <Activity size={18} className="text-emerald-400" />
                    <span className="font-bold text-sm">Share Success Story</span>
                    <Plus size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
