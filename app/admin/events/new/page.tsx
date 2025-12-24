'use client';

import { upsertEvent } from '@/lib/services/admin.service';
import { ArrowLeft, Calendar, Image as ImageIcon, MapPin, Save, Type } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    bangla_title: '',
    description: '',
    date: '',
    location: '',
    image_url: '',
    category: 'Blood Drive',
    is_active: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await upsertEvent(formData);
      if (res.success) {
        toast.success('Event created successfully!');
        router.push('/admin/events');
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        href="/admin/events" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors mb-6 font-bold text-sm"
      >
        <ArrowLeft size={16} /> Back to Events
      </Link>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-3xl font-bold text-slate-900 font-poppins">Create New Event</h1>
          <p className="text-slate-500 mt-2 font-hind">Fill in the details for the upcoming blood drive or seminar.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <Type size={16} className="text-rose-500" /> Event Title (English)
              </label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                placeholder="e.g. Annual Blood Drive 2024"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">ইভেন্টের শিরোনাম (বাংলা)</label>
              <input
                type="text"
                value={formData.bangla_title || ''}
                onChange={(e) => setFormData({ ...formData, bangla_title: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                placeholder="উদাঃ বার্ষিক রক্তদান কর্মসূচি ২০২৪"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <Calendar size={16} className="text-rose-500" /> Date & Time
              </label>
              <input
                required
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <MapPin size={16} className="text-rose-500" /> Location
              </label>
              <input
                required
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                placeholder="e.g. DIC Blood Bank Center"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Detailed Description</label>
            <textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind resize-none"
              placeholder="Provide a full description of the event..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <ImageIcon size={16} className="text-rose-500" /> Image URL
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind appearance-none text-slate-600"
              >
                <option>Blood Drive</option>
                <option>Seminar</option>
                <option>Workshop</option>
                <option>Foundation Day</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-1">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
            />
            <label htmlFor="is_active" className="text-sm font-bold text-slate-700 cursor-pointer">
              Publish this event immediately
            </label>
          </div>

          <div className="pt-6">
            <button
              disabled={loading}
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Creating...' : (
                <>
                   <Save size={20} /> Save & Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
