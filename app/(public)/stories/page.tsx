import { getEnrichedStories } from '@/lib/services/stories.service';
import { Heart, Quote } from 'lucide-react';

export const metadata = {
  title: 'Success Stories | DIC Blood Bank',
  description: 'Read inspiring stories from our donors and the lives they have helped save.',
};

export default async function StoriesPage() {
  const stories = await getEnrichedStories();

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-bold mb-6">
            <Heart size={16} fill="currentColor" /> REAL IMPACT
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-poppins">
            Donor <span className="text-rose-600">Success Stories</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-hind">
            Explore the profound impact of every drop donated. These are real stories from our community of life-savers.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {stories.map((story) => (
              <div key={story.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-white flex flex-col">
                <div className="h-64 relative overflow-hidden">
                  {story.image_url ? (
                    <img src={story.image_url} alt={story.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <Heart size={48} />
                    </div>
                  )}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-xl text-xs font-bold text-rose-600 shadow-sm">
                    {story.blood_type} DONOR
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <Quote className="text-rose-200 mb-6" size={40} />
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 font-poppins leading-tight">
                    {story.title}
                  </h2>
                  <p className="text-slate-600 font-hind leading-relaxed mb-8 flex-1">
                    "{story.content}"
                  </p>
                  <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold">
                        {story.donor_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 font-poppins text-sm">{story.donor_name}</p>
                        <p className="text-xs text-slate-400 font-hind">{story.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1">Impact</p>
                      <p className="text-rose-600 font-black">{story.donations || 0} Donations</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {stories.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-hind">More heart-warming stories are being shared. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
