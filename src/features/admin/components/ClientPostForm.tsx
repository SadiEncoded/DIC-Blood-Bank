'use client';

import { upsertPost } from '@/features/admin/services';
import {
    AlignLeft,
    List,
    Loader2,
    MessageSquare,
    Minus,
    Plus,
    Trash2,
    Upload,
    X
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

// Define types locally to ensure self-containment for the form
interface BlogParagraph {
  type: 'text' | 'list' | 'highlight';
  heading?: string;
  body: string | string[];
}

interface FullContent {
  introduction: string;
  sections: {
    sectionTitle: string;
    content: BlogParagraph[];
  }[];
  conclusion: string;
}

interface PostFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PostForm({ initialData, onSuccess, onCancel }: PostFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  
  // Initialize state with safeguards
  const [formData, setFormData] = useState({
    id: initialData?.id,
    title: initialData?.title || '',
    headline: initialData?.headline || '',
    description: initialData?.description || '', // Short description
    image_url: initialData?.image_url || '',
    category: initialData?.category || 'General',
    read_time: initialData?.read_time || '5 min read',
    color_theme: initialData?.color_theme || 'rose',
    icon: initialData?.icon || 'Heart',
    is_active: initialData?.is_active ?? initialData?.is_published ?? false,
    // Complex content structure
    full_content: (initialData?.full_content as FullContent) || {
        introduction: '',
        sections: [],
        conclusion: ''
    }
  });

  // Helper to update full_content deep state
  const updateContent = (updater: (prev: FullContent) => FullContent) => {
      setFormData(prev => ({ ...prev, full_content: updater(prev.full_content) }));
  };

  const addSection = () => {
    updateContent(prev => ({
        ...prev,
        sections: [...prev.sections, { sectionTitle: '', content: [] }]
    }));
  };

  const removeSection = (index: number) => {
    updateContent(prev => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const updateSectionTitle = (index: number, title: string) => {
    updateContent(prev => {
        const newSections = [...prev.sections];
        if (newSections[index]) {
            newSections[index].sectionTitle = title;
        }
        return { ...prev, sections: newSections };
    });
  };

  const addParagraph = (sectionIndex: number, type: 'text' | 'list' | 'highlight' = 'text') => {
      updateContent(prev => {
          const newSections = [...prev.sections];
          if (newSections[sectionIndex]) {
              newSections[sectionIndex].content.push({
                  type,
                  body: type === 'list' ? [] : '', // Initialize based on type
                  heading: type === 'highlight' ? '' : undefined
              });
          }
          return { ...prev, sections: newSections };
      });
  };

  const removeParagraph = (sectionIndex: number, pIndex: number) => {
      updateContent(prev => {
          const newSections = [...prev.sections];
          if (newSections[sectionIndex]) {
              newSections[sectionIndex].content = newSections[sectionIndex].content.filter((_, i) => i !== pIndex);
          }
          return { ...prev, sections: newSections };
      });
  };

  const updateParagraph = (sectionIndex: number, pIndex: number, field: keyof BlogParagraph, value: any) => {
      updateContent(prev => {
          const newSections = [...prev.sections];
          if (newSections[sectionIndex] && newSections[sectionIndex].content[pIndex]) {
              const para = { ...newSections[sectionIndex].content[pIndex] };
              
              if (field === 'body' && para.type === 'list' && typeof value === 'string') {
                   // Handle splitting multiline text into list array
                   para.body = value.split('\n').filter(line => line.trim() !== '');
              } else {
                   (para as any)[field] = value;
              }
              
              newSections[sectionIndex].content[pIndex] = para;
          }
          return { ...prev, sections: newSections };
      });
  };

  // Convert list array back to newline string for textarea
  const getListBodyAsString = (body: string | string[]) => {
      return Array.isArray(body) ? body.join('\n') : body;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image_url: reader.result as string });
    };
    reader.readAsDataURL(file);
    toast.info("Image selected. Save to confirm upload.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Map form state to DB schema expected by service
      const payload = {
          ...formData,
      };

      const result = await upsertPost(payload);
      if (result.success) {
        toast.success(initialData ? 'Article updated' : 'Article created');
        onSuccess();
      } else {
        toast.error('Failed to save article');
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
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          {initialData ? <AlignLeft className="text-rose-600"/> : <Plus className="text-rose-600"/>}
          {initialData ? 'Edit Article' : 'Create New Article'}
        </h3>
        <button type="button" onClick={onCancel} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-600">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <form id="post-form" onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            
            {/* Basic Info Section */}
            <section className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Article Title</label>
                        <input
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none focus:ring-2 focus:ring-rose-500/20"
                            placeholder="e.g. Benefits of Blood Donation"
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-semibold">Short Headline</label>
                        <input
                            required
                            value={formData.headline}
                            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                            className="w-full px-4 py-2 border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none focus:ring-2 focus:ring-rose-500/20"
                            placeholder="e.g. Health & Life"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold">Short Description (Preview)</label>
                    <textarea
                        required
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 text-sm border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none focus:ring-2 focus:ring-rose-500/20"
                        placeholder="Brief summary shown on cards..."
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Category</label>
                         <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none"
                        >
                            <option value="General">General</option>
                            <option value="Benefits">Benefits</option>
                            <option value="Eligibility">Eligibility</option>
                            <option value="Awareness">Awareness</option>
                            <option value="Health">Health</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm font-semibold">Read Time</label>
                         <input
                            value={formData.read_time}
                            onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                            className="w-full px-4 py-2 border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none"
                            placeholder="e.g. 5 min read"
                        />
                    </div>
                     <div className="space-y-2">
                         <label className="text-sm font-semibold">Theme Color</label>
                         <select
                            value={formData.color_theme}
                            onChange={(e) => setFormData({ ...formData, color_theme: e.target.value })}
                            className="w-full px-4 py-2 border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none"
                        >
                            <option value="rose">Rose (Red)</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                        </select>
                    </div>
                     <div className="space-y-2">
                         <label className="text-sm font-semibold">Icon</label>
                         <select
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            className="w-full px-4 py-2 border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none"
                        >
                             <option value="Heart">Heart</option>
                             <option value="Droplet">Droplet</option>
                             <option value="Shield">Shield</option>
                             <option value="Clock">Clock</option>
                             <option value="AlertCircle">Alert</option>
                             <option value="CheckCircle">Check</option>
                        </select>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold">Cover Image</label>
                    <div className="flex gap-2">
                        <input 
                        type="text"
                        placeholder="Paste image URL..."
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        className="flex-1 px-4 py-2 text-sm border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none"
                        />
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                        <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 transition-colors text-sm font-medium"
                        >
                        <Upload size={16} />
                        </button>
                    </div>
                    {formData.image_url && (
                        <div className="relative group aspect-video w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100">
                        <Image src={formData.image_url} alt="Preview" fill className="object-cover" unoptimized />
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image_url: '' })}
                            className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={16} />
                        </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Rich Content Editor */}
            <section className="space-y-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Article Content</h4>
                
                {/* Introduction */}
                 <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2"><AlignLeft size={16} className="text-rose-500"/> Introduction</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.full_content.introduction}
                        onChange={(e) => updateContent(prev => ({ ...prev, introduction: e.target.value }))}
                        className="w-full px-4 py-3 text-sm border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none focus:ring-2 focus:ring-rose-500/20"
                        placeholder="Write the article introduction..."
                    />
                </div>

                {/* Dynamic Sections */}
                <div className="space-y-6">
                    {formData.full_content.sections.map((section, sIndex) => (
                        <div key={sIndex} className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-200 dark:border-zinc-700/50 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm font-mono text-xs font-bold text-zinc-400">
                                    {(sIndex + 1).toString().padStart(2, '0')}
                                </div>
                                <input
                                    value={section.sectionTitle}
                                    onChange={(e) => updateSectionTitle(sIndex, e.target.value)}
                                    className="flex-1 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg font-bold text-lg outline-none focus:ring-2 focus:ring-rose-500/20"
                                    placeholder="Section Title"
                                />
                                <button 
                                    type="button" 
                                    onClick={() => removeSection(sIndex)}
                                    className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Paragraphs in Section */}
                            <div className="space-y-3 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700 ml-4">
                                {section.content.map((para, pIndex) => (
                                    <div key={pIndex} className="relative group">
                                         <div className="flex gap-2 items-start">
                                            <div className="flex flex-col gap-1 mt-1">
                                                <button 
                                                    type="button"
                                                    title="Text"
                                                    onClick={() => updateParagraph(sIndex, pIndex, 'type', 'text')}
                                                    className={`p-1 rounded ${para.type === 'text' ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900' : 'text-zinc-400 hover:bg-zinc-100'}`}
                                                >
                                                    <AlignLeft size={14} />
                                                </button>
                                                <button 
                                                    type="button"
                                                    title="List"
                                                    onClick={() => updateParagraph(sIndex, pIndex, 'type', 'list')}
                                                    className={`p-1 rounded ${para.type === 'list' ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900' : 'text-zinc-400 hover:bg-zinc-100'}`}
                                                >
                                                    <List size={14} />
                                                </button>
                                                <button 
                                                    type="button"
                                                    title="Highlight"
                                                    onClick={() => updateParagraph(sIndex, pIndex, 'type', 'highlight')}
                                                    className={`p-1 rounded ${para.type === 'highlight' ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900' : 'text-zinc-400 hover:bg-zinc-100'}`}
                                                >
                                                    <MessageSquare size={14} />
                                                </button>
                                            </div>

                                            <div className="flex-1 space-y-2">
                                                {para.type === 'highlight' && (
                                                    <input
                                                        value={para.heading || ''}
                                                        onChange={(e) => updateParagraph(sIndex, pIndex, 'heading', e.target.value)}
                                                        className="w-full px-3 py-1.5 text-sm font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-md outline-none"
                                                        placeholder="Highlight Title (e.g. Myth)"
                                                    />
                                                )}
                                                <textarea
                                                    rows={para.type === 'list' ? 4 : 2}
                                                    value={getListBodyAsString(para.body)}
                                                    onChange={(e) => updateParagraph(sIndex, pIndex, 'body', e.target.value)}
                                                    className={`w-full px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-rose-400 transition-colors ${para.type === 'list' ? 'font-mono text-xs' : ''}`}
                                                    placeholder={para.type === 'list' ? "Enter list items (one per line)" : "Paragraph text..."}
                                                />
                                            </div>

                                            <button 
                                                type="button" 
                                                onClick={() => removeParagraph(sIndex, pIndex)}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 text-rose-400 hover:bg-rose-50 rounded transition-all"
                                            >
                                                <Minus size={14} />
                                            </button>
                                         </div>
                                    </div>
                                ))}

                                <div className="flex gap-2 pt-2">
                                    <button 
                                        type="button" 
                                        onClick={() => addParagraph(sIndex, 'text')}
                                        className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:border-zinc-300 transition-colors flex items-center gap-1"
                                    >
                                        <Plus size={12}/> Text
                                    </button>
                                     <button 
                                        type="button" 
                                        onClick={() => addParagraph(sIndex, 'list')}
                                        className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:border-zinc-300 transition-colors flex items-center gap-1"
                                    >
                                        <Plus size={12}/> List
                                    </button>
                                     <button 
                                        type="button" 
                                        onClick={() => addParagraph(sIndex, 'highlight')}
                                        className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:border-zinc-300 transition-colors flex items-center gap-1"
                                    >
                                        <Plus size={12}/> Highlight
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <button
                        type="button"
                        onClick={addSection}
                        className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> Add New Section
                    </button>
                </div>

                 {/* Conclusion */}
                 <div className="space-y-2 pt-4">
                    <label className="text-sm font-semibold flex items-center gap-2"><AlignLeft size={16} className="text-rose-500"/> Conclusion</label>
                    <textarea
                        required
                        rows={3}
                        value={formData.full_content.conclusion}
                        onChange={(e) => updateContent(prev => ({ ...prev, conclusion: e.target.value }))}
                        className="w-full px-4 py-3 text-sm border dark:border-zinc-800 dark:bg-zinc-950 rounded-lg outline-none focus:ring-2 focus:ring-rose-500/20"
                        placeholder="Write the conclusion..."
                    />
                </div>
            </section>
        </form>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center shrink-0">
         <div className="flex items-center gap-2">
           <input
            type="checkbox"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
          />
          <label htmlFor="is_active" className="text-sm font-medium cursor-pointer select-none">Publish immediately</label>
         </div>

         <div className="flex gap-3">
             <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-800 font-medium">
                Cancel
            </button>
            <button
                type="submit"
                form="post-form"
                disabled={loading || !formData.title}
                className="flex items-center gap-2 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:bg-zinc-300 disabled:cursor-not-allowed font-bold shadow-md shadow-rose-200 dark:shadow-none transition-all"
            >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {initialData ? 'Save Changes' : 'Create Article'}
            </button>
         </div>
      </div>
    </div>
  );
}
