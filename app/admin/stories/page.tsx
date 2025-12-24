import { getAllStories } from '@/lib/services/admin.service';
import { BookOpen, CheckCircle2, Edit, Plus, Trash2, User, XCircle } from 'lucide-react';
import Link from 'next/link';

export default async function AdminStoriesPage() {
  const stories = await getAllStories();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-poppins">Success Stories</h1>
          <p className="text-slate-500 mt-2 font-hind">Manage and showcase inspiring stories from our donors.</p>
        </div>
        <Link 
          href="/admin/stories/new" 
          className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
        >
          <Plus size={20} /> Add New Story
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Story Info</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Donor</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {stories.map((story: any) => (
              <tr key={story.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                      {story.image_url ? (
                        <img src={story.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <BookOpen size={20} />
                        </div>
                      )}
                    </div>
                    <div className="max-w-xs">
                      <div className="font-bold text-slate-900 font-poppins truncate">{story.title}</div>
                      <div className="text-xs text-slate-400 font-hind mt-0.5 truncate">{story.content}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <User size={14} className="text-rose-500" />
                    {story.profiles?.full_name || 'System User'}
                  </div>
                </td>
                <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                        {story.is_published ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold w-fit">
                                <CheckCircle2 size={10} /> Published
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold w-fit">
                                <XCircle size={10} /> Draft
                            </span>
                        )}
                        {story.is_featured && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold w-fit">
                                Featured
                            </span>
                        )}
                    </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/admin/stories/edit/${story.id}`}
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
            {stories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-slate-400 italic font-hind">
                  No stories found. Click "Add New Story" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
