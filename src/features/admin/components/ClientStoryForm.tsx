'use client';

import { upsertStory } from '@/features/admin/services';
import { BookOpen, Clock, Image as ImageIcon, Layers, Link as LinkIcon, Palette, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface StoryFormProps {
  initialData?: any;
  donors?: any[];
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ClientStoryForm({ initialData, donors = [], onSuccess, onCancel }: StoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: initialData?.id,
    donor_id: initialData?.donor_id || '',
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    content: initialData?.content || '',
    image_url: initialData?.image_url || '',
    category: initialData?.category || 'Success Story',
    read_time: initialData?.read_time || '3 min read',
    color_theme: initialData?.color_theme || 'rose',
    is_featured: initialData?.is_featured ?? false,
    is_published: initialData?.is_published ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.donor_id) {
        toast.error("Please select a donor");
        return;
    }

    setLoading(true);

    try {
      const payload: any = {
        donor_id: formData.donor_id,
        title: formData.title,
        subtitle: formData.subtitle,
        content: formData.content,
        image_url: formData.image_url,
        category: formData.category,
        read_time: formData.read_time,
        color_theme: formData.color_theme,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
      };

      if (formData.id) {
        payload.id = formData.id;
      }
      
      const result = await upsertStory(payload);

      if (!result.success) throw new Error('Failed to save story');

      toast.success(initialData ? 'Story updated!' : 'Story created!');
      onSuccess();
      
    } catch (err: any) {
      console.error('Error saving story:', err);
      toast.error(err.message || 'Failed to save story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden h-full flex flex-col">
        <div className="p-5 md:p-10 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
          <div className="flex items-center justify-between">
             <div>
                <h1 className="text-xl md:text-3xl font-bold text-slate-900 font-poppins">{initialData ? 'Edit Donor Story' : 'Create New Story'}</h1>
                <p className="text-xs md:text-sm text-slate-500 mt-1 md:mt-2 font-hind">Share inspiring stories of life-saving donations.</p>
             </div>
             <button onClick={onCancel} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
        </div>

        <form id="story-form" onSubmit={handleSubmit} className="p-5 md:p-10 space-y-5 md:space-y-8 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Donor Selection */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                        <User size={16} className="text-rose-500" />
                        Select Donor
                    </label>
                    <div className="relative">
                        <select
                            required
                            value={formData.donor_id}
                            onChange={(e) => setFormData({ ...formData, donor_id: e.target.value })}
                            className="w-full px-4 md:px-5 py-2.5 md:py-3.5 bg-slate-50 border-none rounded-xl md:rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind appearance-none text-[13px] md:text-base"
                        >
                            <option value="">Choose a donor profile...</option>
                            {donors.map((donor) => (
                                <option key={donor.id} value={donor.id}>
                                    {donor.full_name || donor.name} ({donor.blood_type})
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                        <BookOpen size={16} className="text-rose-500" /> Title
                    </label>
                    <input
                        required
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                        placeholder="e.g. A New Lease on Life"
                    />
                </div>

                 {/* Subtitle */}
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                        <Layers size={16} className="text-rose-500" /> Subtitle
                    </label>
                    <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                        placeholder="e.g. How one donation changed everything"
                    />
                </div>
                
                 {/* Category */}
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind cursor-pointer"
                    >
                        <option>Success Story</option>
                        <option>Community Impact</option>
                        <option>Donor Spotlight</option>
                        <option>Emergency Response</option>
                    </select>
                </div>

                {/* Color Theme */}
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                       <Palette size={16} className="text-rose-500" /> Color Theme
                    </label>
                    <select
                        value={formData.color_theme}
                        onChange={(e) => setFormData({ ...formData, color_theme: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind cursor-pointer"
                    >
                        <option value="rose">Rose (Red)</option>
                        <option value="blue">Blue</option>
                        <option value="purple">Purple</option>
                    </select>
                </div>
                
                 {/* Read Time */}
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                        <Clock size={16} className="text-rose-500" /> Read Time
                    </label>
                    <input
                        type="text"
                        value={formData.read_time}
                        onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                        placeholder="e.g. 5 min read"
                    />
                </div>

                {/* Image URL */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                        <ImageIcon size={16} className="text-rose-500" /> Image URL
                    </label>
                    <div className="relative">
                        <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="url"
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Detailed Story Content</label>
                    <textarea
                        required
                        rows={6}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 md:px-5 py-2.5 md:py-3.5 bg-slate-50 border-none rounded-xl md:rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind resize-none text-[13px] md:text-base"
                        placeholder="Write the inspiring details of the donor's experience..."
                    />
                </div>
                
                 {/* Toggles */}
                <div className="md:col-span-2 flex items-center gap-8 pt-2">
                     <div className="flex items-center gap-3 ml-1 p-4 bg-slate-50 rounded-2xl w-fit">
                        <input
                        type="checkbox"
                        id="is_published"
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                        />
                        <label htmlFor="is_published" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                        Publish Immediately
                        </label>
                    </div>

                     <div className="flex items-center gap-3 ml-1 p-4 bg-slate-50 rounded-2xl w-fit">
                        <input
                        type="checkbox"
                        id="is_featured"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                        />
                        <label htmlFor="is_featured" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                        Feature this story
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                 <button 
                    type="submit" 
                    disabled={loading}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-900/10"
                 >
                    {loading ? 'Saving...' : initialData ? 'Update Story' : 'Create Story'}
                 </button>
            </div>
        </form>
    </div>
  );
}
