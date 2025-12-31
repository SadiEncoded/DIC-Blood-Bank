'use client';

import { LocationSelect } from '@/components/common/form/LocationSelect';
import { upsertEvent } from '@/features/admin/services';
import { Calendar, Image as ImageIcon, MapPin, Type } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface EventFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ClientEventForm({ initialData, onSuccess, onCancel }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: initialData?.id,
    title: initialData?.title || '',
    bangla_title: initialData?.bangla_title || '',
    description: initialData?.description || '',
    date: initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
    location: initialData?.location || '',
    image_url: initialData?.image_url || '',
    category: initialData?.category || 'Blood Drive',
    is_active: initialData?.is_active ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = {
          title: formData.title,
          bangla_title: formData.bangla_title,
          description: formData.description,
          date: new Date(formData.date).toISOString(),
          location: formData.location,
          image_url: formData.image_url,
          category: formData.category,
          is_active: formData.is_active,
      };

      if (formData.id) {
          payload.id = formData.id;
      }
      
      const result = await upsertEvent(payload);

      if (!result.success) throw new Error('Failed to save event');

      toast.success(initialData ? 'Event updated!' : 'Event created!');
      if (onSuccess) {
          onSuccess();
      } else {
          router.push('/admin/events');
          router.refresh();
      }
      
    } catch (err: any) {
      console.error('Error saving event:', JSON.stringify(err, null, 2));
      toast.error(err.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-5 md:p-10 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-xl md:text-3xl font-bold text-slate-900 font-poppins">{initialData ? 'Edit Event' : 'Create New Event'}</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 md:mt-2 font-hind">Fill in the details for the upcoming event.</p>
        </div>

        <form id="event-form" onSubmit={handleSubmit} className="p-5 md:p-10 space-y-4 md:space-y-8">
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
              <LocationSelect
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs md:text-sm font-bold text-slate-700 ml-1">Detailed Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 md:px-5 py-2.5 md:py-3.5 bg-slate-50 border-none rounded-xl md:rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind resize-none text-[13px] md:text-base"
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
                className="w-full px-4 md:px-5 py-2.5 md:py-3.5 bg-slate-50 border-none rounded-xl md:rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind text-[13px] md:text-base"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind appearance-none text-slate-600 cursor-pointer"
              >
                <option>Blood Drive</option>
                <option>Seminar</option>
                <option>Workshop</option>
                <option>Foundation Day</option>
                <option>Campaign</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-1 p-4 bg-slate-50 rounded-2xl w-fit">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
            />
            <label htmlFor="is_active" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
              Publish this event immediately
            </label>
          </div>
          
          <div className="flex justify-end pt-4">
             {/* Hidden implicit submit for Enter key */}
             <button type="submit" disabled={loading} className="hidden" />
          </div>
        </form>
    </div>
  );
}
