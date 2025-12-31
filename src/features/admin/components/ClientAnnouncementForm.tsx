'use client';

import { upsertPost } from '@/features/admin/services';
import {
    Loader2,
    MessageSquare,
    Upload,
    X
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface AnnouncementFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ClientAnnouncementForm({ initialData, onSuccess, onCancel }: AnnouncementFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    id: initialData?.id,
    title: initialData?.title || '',
    content: initialData?.content || '',
    image_url: initialData?.image_url || '',
    category: initialData?.category || 'Announcement',
    post_type: 'announcement',
    is_active: initialData?.is_active ?? true,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image_url: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Title and Content are required');
      return;
    }

    setLoading(true);
    try {
      const result = await upsertPost(formData);
      if (result.success) {
        toast.success(initialData ? 'Notice updated' : 'Notice published');
        onSuccess();
      } else {
        toast.error('Failed to save notice');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="text-rose-600"/>
          {initialData ? 'Edit Notice' : 'Post Official Notice'}
        </h3>
        <button onClick={onCancel} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-zinc-50/30">
        <form id="announcement-form" onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Notice Title</label>
            <input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 font-bold text-lg"
              placeholder="e.g. Blood Donation Camp at Dhaka College"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Content Message</label>
            <textarea
              required
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 text-base leading-relaxed"
              placeholder="What do you want to announce?..."
            />
          </div>

          <div className="space-y-3">
             <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Feature Image (Optional)</label>
             <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Paste image URL..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="flex-1 px-4 py-2 text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg outline-none"
                />
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  <Upload size={18} />
                </button>
             </div>
             {formData.image_url && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white">
                  <Image src={formData.image_url} alt="Preview" fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: '' })}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
             )}
          </div>
        </form>
      </div>

      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-between items-center shrink-0 px-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="w-4 h-4 accent-rose-600 rounded"
          />
          <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors">Publish to Community Feed</span>
        </label>

        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="px-5 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-800 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            form="announcement-form"
            disabled={loading || !formData.title}
            className="flex items-center gap-2 px-8 py-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 disabled:bg-zinc-300 font-bold transition-all shadow-lg shadow-rose-200 dark:shadow-none"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {initialData ? 'Save Changes' : 'Post Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
