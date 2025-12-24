'use client';

import { upsertStory } from '@/lib/services/admin.service';
import { createClient } from '@/lib/utils/supabase/client';
import { ArrowLeft, BookOpen, Image as ImageIcon, Save, Star, Type, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function NewStoryPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [donors, setDonors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    donor_id: '',
    title: '',
    content: '',
    image_url: '',
    is_featured: false,
    is_published: true
  });

  // Fetch verified donors to select from
  useEffect(() => {
    const fetchDonors = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, blood_type')
        .eq('role', 'donor')
        .eq('is_verified', true);
      
      if (data) setDonors(data);
    };
    fetchDonors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.donor_id) {
        toast.error('Please select a donor');
        return;
    }
    setLoading(true);

    try {
      const res = await upsertStory(formData);
      if (res.success) {
        toast.success('Story shared successfully!');
        router.push('/admin/stories');
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to share story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        href="/admin/stories" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors mb-6 font-bold text-sm"
      >
        <ArrowLeft size={16} /> Back to Stories
      </Link>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-3xl font-bold text-slate-900 font-poppins">Share Success Story</h1>
          <p className="text-slate-500 mt-2 font-hind">Capture and share the profound impact of blood donation.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <User size={16} className="text-rose-500" /> Select Donor
              </label>
              <select
                required
                value={formData.donor_id}
                onChange={(e) => setFormData({ ...formData, donor_id: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind appearance-none text-slate-600"
              >
                <option value="">Select a donor...</option>
                {donors.map(donor => (
                    <option key={donor.id} value={donor.id}>
                        {donor.full_name} ({donor.blood_type})
                    </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <Type size={16} className="text-rose-500" /> Story Title
              </label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
                placeholder="e.g. A Life-Siving Gift"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <BookOpen size={16} className="text-rose-500" /> The Story Content
            </label>
            <textarea
              required
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind resize-none"
              placeholder="Tell the story of how this donation made a difference..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
              <ImageIcon size={16} className="text-rose-500" /> Feature Image URL
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-hind"
              placeholder="https://example.com/story-image.jpg"
            />
          </div>

          <div className="flex flex-col gap-4 ml-1">
            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="is_featured" className="text-sm font-bold text-slate-700 cursor-pointer flex items-center gap-2">
                <Star size={14} className="text-amber-500 fill-amber-500" /> Feature on homepage
                </label>
            </div>

            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="is_published" className="text-sm font-bold text-slate-700 cursor-pointer">
                Publish immediately
                </label>
            </div>
          </div>

          <div className="pt-6">
            <button
              disabled={loading}
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Sharing...' : (
                <>
                   <Save size={20} /> Save & Share Story
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
