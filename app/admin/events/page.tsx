import { getAllEvents } from '@/lib/services/admin.service';
import { Calendar, CheckCircle2, Edit, MapPin, Plus, Trash2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-poppins">Manage Events</h1>
          <p className="text-slate-500 mt-2 font-hind">Create and manage upcoming blood drives and seminars.</p>
        </div>
        <Link 
          href="/admin/events/new" 
          className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
        >
          <Plus size={20} /> Add New Event
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Event Info</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Date & Location</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {events.map((event: any) => (
              <tr key={event.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                      {event.image_url ? (
                        <img src={event.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Calendar size={20} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 font-poppins">{event.title}</div>
                      <div className="text-xs text-slate-400 font-hind mt-0.5">{event.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <Calendar size={14} className="text-rose-500" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400 font-hind">
                      <MapPin size={14} />
                      {event.location}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  {event.is_active ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                      <CheckCircle2 size={12} /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                      <XCircle size={12} /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/admin/events/edit/${event.id}`}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-slate-400 italic font-hind">
                  No events found. Click "Add New Event" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
