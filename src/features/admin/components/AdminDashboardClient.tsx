'use client';

import ClientAnnouncementForm from '@/features/admin/components/ClientAnnouncementForm';
import ClientEventForm from '@/features/admin/components/ClientEventForm';
import PostForm from '@/features/admin/components/ClientPostForm';
import ClientStoryForm from '@/features/admin/components/ClientStoryForm';
import {
    deleteBloodRequest,
    deleteEvent,
    deletePost,
    deleteStory,
    getAdminDashboardData,
    toggleEventActive,
    togglePostPublish,
    toggleStoryPublish,
    updateDonorVerification,
    updateRequestStatus,
    verifyDonationAction
} from '@/features/admin/services';
import { createClient } from '@/lib/supabase/client';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Calendar as CalendarDays,
    ChevronRight,
    HeartHandshake,
    Menu,
    MessageSquare,
    Plus,
    Search,
    ShieldCheck,
    X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Modular Components
import { AdminSidebar, menuItems } from './dashboard/AdminSidebar';
import { DataTable } from './dashboard/DataTable';
import { DeleteConfirmModal } from './dashboard/DeleteConfirmModal';
import { MetricCard } from './dashboard/MetricCard';
import { RequestTable } from './dashboard/RequestTable';
import { VerificationTable } from './dashboard/VerificationTable';

export default function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const router = useRouter();

  const fetchData = async () => {
    try {
        const dashboardData = await getAdminDashboardData();
        if (dashboardData?.success) {
            setData(dashboardData);
        } else if (dashboardData) {
            // Dashboard data returned success: false
            setData({ error: dashboardData.error, details: dashboardData.details });
        } else {
            setData(null);
        }
    } catch (error) {
        console.error("❌ AdminDashboardClient: Fetch Error:", error);
        toast.error("Failed to load admin dashboard data.");
    } finally {
        setIsLoading(false);
    }
  };

  const updateLocalState = (type: string, id: string, payload: any = null, isDelete = false, isInsert = false) => {
      setData((prev: any) => {
          if (!prev) return prev;
          
          if (isInsert) {
              // Ignore if we already have it (debounce/race condition)
              if (prev[type]?.some((item: any) => item.id === id)) return prev;
              
              const newItems = [payload, ...(prev[type] || [])];
              // Update stats for specific inserts
              const newStats = { ...prev.stats };
              if (type === 'requests') newStats.pendingRequests = (newStats.pendingRequests || 0) + 1;
              if (type === 'donors') newStats.totalDonors = (newStats.totalDonors || 0) + 1;
              if (type === 'verifications') newStats.pendingVerifications = (newStats.pendingVerifications || 0) + 1;
              if (type === 'posts') newStats.activeEvents = (newStats.activeEvents || 0); // Placeholder
              
              return { ...prev, [type]: newItems, stats: newStats };
          }

          const section = prev[type] || [];
          if (isDelete) {
              const newStats = { ...prev.stats };
              if (type === 'requests') newStats.pendingRequests = Math.max(0, (newStats.pendingRequests || 0) - 1);
              if (type === 'verifications') newStats.pendingVerifications = Math.max(0, (newStats.pendingVerifications || 0) - 1);

              return { ...prev, [type]: section.filter((item: any) => item.id !== id), stats: newStats };
          }
          return {
              ...prev,
              [type]: section.map((item: any) => 
                  item.id === id ? { ...item, ...payload } : item
              )
          };
      });
  };

  useEffect(() => {
    fetchData();
    const supabase = createClient();

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setCurrentUser(user);
    };
    getUser();

    // Setup Realtime Subscriptions
    const channel = supabase
      .channel('admin_dashboard')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'blood_requests' },
        (payload) => {
          // Handle real-time updates for blood requests
          if (payload.eventType === 'INSERT') {
            updateLocalState('requests', payload.new.id, payload.new, false, true);
            toast.success(`New Blood Request from ${payload.new.patient_name}!`, {
                icon: '🩸',
                duration: 5000
            });
          } else if (payload.eventType === 'UPDATE') {
            updateLocalState('requests', payload.new.id, payload.new);
          } else if (payload.eventType === 'DELETE') {
            updateLocalState('requests', payload.old.id, null, true);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        (payload) => {
          // Process changes to user profiles, filtering for donors
          const isDonor = (payload.new as any)?.role === 'donor' || (payload.old as any)?.role === 'donor';
          if (!isDonor) return;

          if (payload.eventType === 'INSERT') {
            updateLocalState('donors', payload.new.id, payload.new, false, true);
            toast.info(`New Donor Registered: ${payload.new.full_name}`);
          } else if (payload.eventType === 'UPDATE') {
            updateLocalState('donors', payload.new.id, payload.new);
          } else if (payload.eventType === 'DELETE') {
            updateLocalState('donors', payload.old.id, null, true);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'donation_verifications' },
        (payload) => {
          // Update verification records instantly in the UI
          if (payload.eventType === 'INSERT') {
            updateLocalState('verifications', payload.new.id, payload.new, false, true);
            toast.info(`New Donation Verification Proof received!`, { icon: '🛡️' });
          } else if (payload.eventType === 'UPDATE') {
            updateLocalState('verifications', payload.new.id, payload.new);
          } else if (payload.eventType === 'DELETE') {
            updateLocalState('verifications', payload.old.id, null, true);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'article_posts' },
        (payload) => {
          // Handle real-time updates for community and educational posts
          if (payload.eventType === 'INSERT') {
            updateLocalState('posts', payload.new.id, payload.new, false, true);
          } else if (payload.eventType === 'UPDATE') {
            updateLocalState('posts', payload.new.id, payload.new);
          } else if (payload.eventType === 'DELETE') {
            updateLocalState('posts', payload.old.id, null, true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const startProcessing = (id: string) => {
    setProcessingIds((prev) => new Set(prev).add(id));
  };

  const stopProcessing = (id: string) => {
    setProcessingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleNewAction = () => {
    setEditingItem(null);
    setViewMode('create');
  };

  const handleFormSuccess = () => {
    setViewMode('list');
    setEditingItem(null);
    fetchData();
  };

  const handleFormCancel = () => {
    setViewMode('list');
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    setItemToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDeleteId) return;
    const id = itemToDeleteId;
    
    setIsDeleteModalOpen(false);
    startProcessing(id);
    try {
        let res: any;
        if (activeTab === 'posts') res = await deletePost(id);
        else if (activeTab === 'events') res = await deleteEvent(id);
        else if (activeTab === 'stories') res = await deleteStory(id);
        else if (activeTab === 'requests') res = await deleteBloodRequest(id);

        if (res?.success) {
            updateLocalState(activeTab, id, null, true);
            toast.success(`${activeTab.slice(0, -1)} deleted successfully`);
        } else {
            throw new Error(res?.error || "Failed to delete");
        }
    } catch (err: any) {
        toast.error(err.message || "Failed to delete item");
    } finally {
        stopProcessing(id);
        setItemToDeleteId(null);
    }
  };

  const handleToggleStatus = async (item: any) => {
    startProcessing(item.id);
    try {
        let res: any;
        let updatePayload: any = {};
        
        if (activeTab === 'posts') {
            res = await togglePostPublish(item.id, !item.is_active);
            updatePayload = { is_active: !item.is_active };
        }
        else if (activeTab === 'events') {
            res = await toggleEventActive(item.id, !item.is_active);
            updatePayload = { is_active: !item.is_active };
        }
        else if (activeTab === 'stories') {
            res = await toggleStoryPublish(item.id, !item.is_published);
            updatePayload = { is_published: !item.is_published };
        }

        if (res?.success) {
            updateLocalState(activeTab, item.id, updatePayload);
            toast.success("Status updated");
        } else {
            throw new Error(res?.error || "Failed to update status");
        }
    } catch (err: any) {
        toast.error(err.message || "Failed to update status");
    } finally {
        stopProcessing(item.id);
    }
  };

  const handleUpdateDonorStatus = async (donorId: string, currentStatus: boolean) => {
    startProcessing(donorId);
    try {
        const res = await updateDonorVerification(donorId, !currentStatus);
        if (res.success) {
            updateLocalState('donors', donorId, { is_verified: !currentStatus });
            toast.success(`Donor ${!currentStatus ? 'verified' : 'unverified'} successfully`);
        } else {
            throw new Error(res.error || "Failed to update status");
        }
    } catch (err: any) {
        toast.error(err.message || "Failed to update donor status");
    } finally {
        stopProcessing(donorId);
    }
  };

  const handleUpdateRequestStatus = async (requestId: string, status: any) => {
    startProcessing(requestId);
    try {
        const res = await updateRequestStatus(requestId, status);
        if (res.success) {
            updateLocalState('requests', requestId, { status });
            
            // Intelligent optimistic update for stats
            setData((prev: any) => {
                const request = prev.requests?.find((r: any) => r.id === requestId);
                const oldStatus = request?.status;
                
                // If status didn't actually change, return prev stats
                if (oldStatus === status) return prev;

                const newStats = { ...prev.stats };

                // Handle Pending Requests Count
                if (oldStatus === 'PENDING' && status !== 'PENDING') {
                    newStats.pendingRequests = Math.max(0, (newStats.pendingRequests || 0) - 1);
                } else if (oldStatus !== 'PENDING' && status === 'PENDING') {
                    newStats.pendingRequests = (newStats.pendingRequests || 0) + 1;
                }

                // Handle Lives Saved Count
                if (status === 'FULFILLED' && oldStatus !== 'FULFILLED') {
                    newStats.livesSaved = (newStats.livesSaved || 0) + 1;
                } else if (oldStatus === 'FULFILLED' && status !== 'FULFILLED') {
                    // If it was fulfilled and now cancelled/pending, decrease count
                    newStats.livesSaved = Math.max(0, (newStats.livesSaved || 0) - 1);
                }

                return { ...prev, stats: newStats };
            });
            
            toast.success(`Request status updated to ${status}`);
        } else {
            throw new Error(res.error || "Failed to update status");
        }
    } catch (err: any) {
        toast.error(err.message || "Failed to update request status");
    } finally {
        stopProcessing(requestId);
    }
  };

  const handleVerify = async (id: string, status: string) => {
    startProcessing(id);
    try {
        const res = await verifyDonationAction(id);
        if (res.success) {
            updateLocalState('verifications', id, { status });
            toast.success(`Donation ${status.toLowerCase()} successfully!`);
            fetchData();
        } else {
            throw new Error(res.error || `Failed to ${status.toLowerCase()} donation`);
        }
    } catch (err: any) {
        toast.error(err.message || "An unexpected error occurred");
    } finally {
        stopProcessing(id);
    }
  };

  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
              <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-zinc-500 font-medium">Loading Admin Console...</p>
              </div>
          </div>
      );
  }

  if (!data || data.error) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-zinc-200 dark:border-zinc-800">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <X size={32} />
                  </div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Access Denied</h1>
                  <p className="text-zinc-500 mb-8">
                      {data?.error || "You do not have permission to access the Admin Console. Please log in with an administrator account."}
                  </p>
                  
                  {data?.details && (
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg text-[10px] font-mono text-zinc-400 mb-8">
                        Error Code: {data.details}
                    </div>
                  )}

                  <div className="flex gap-3 justify-center">
                    <button onClick={() => router.push('/')} className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium hover:bg-zinc-200 transition-colors">Go Home</button>
                    <button onClick={() => router.push('/login')} className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors">Log In</button>
                  </div>

                  {currentUser && (
                    <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-left">
                        <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">Session Debug</p>
                        <div className="space-y-1 text-xs font-mono text-zinc-500">
                            <p className="truncate">User: {currentUser.email}</p>
                            <p>ID: {currentUser.id.substring(0, 8)}...</p>
                        </div>
                    </div>
                  )}
              </div>
          </div>
      );
  }

  const { requests, events, stories, posts, donors, verifications } = data;

  const getDataForTab = () => {
    let rawData: any[] = [];
    switch (activeTab) {
      case 'donors': rawData = donors || []; break;
      case 'events': rawData = events || []; break;
      case 'requests': 
        rawData = [...(requests || [])].sort((a, b) => {
            const priority: Record<string, number> = { 'CRITICAL': 0, 'URGENT': 1, 'NORMAL': 2 };
            const statusPriority: Record<string, number> = { 'PENDING': 0, 'FULFILLED': 1, 'CANCELLED': 2 };
            if (statusPriority[a.status] !== statusPriority[b.status]) {
                return (statusPriority[a.status] ?? 2) - (statusPriority[b.status] ?? 2);
            }
            const aUrgency = a.urgency?.toUpperCase();
            const bUrgency = b.urgency?.toUpperCase();
            return (priority[aUrgency] ?? priority[a.urgency] ?? 2) - (priority[bUrgency] ?? priority[b.urgency] ?? 2);
        });
        break;
      case 'stories': rawData = stories || []; break;
      case 'posts': rawData = (posts || []).filter((p: any) => p.post_type === 'article' || !p.post_type); break;
      case 'announcements': rawData = (posts || []).filter((p: any) => p.post_type === 'announcement'); break;
      case 'verifications': rawData = verifications || []; break;
      default: rawData = [];
    }

    if (!searchQuery) return rawData;

    const query = searchQuery.toLowerCase();
    return rawData.filter((item: any) => {
        const searchableText = [
            item.title,
            item.bangla_title,
            item.description,
            item.patient_name,
            item.full_name,
            item.hospital,
            item.location,
            item.email,
            item.content
        ].filter(Boolean).join(' ').toLowerCase();
        return searchableText.includes(query);
    });
  };

  const renderTableContent = () => {
      if (viewMode === 'create') {
          if (activeTab === 'posts') return <PostForm initialData={editingItem} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />;
          if (activeTab === 'announcements') return <ClientAnnouncementForm initialData={editingItem} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />;
          if (activeTab === 'events') return <ClientEventForm initialData={editingItem} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />;
          if (activeTab === 'stories') return <ClientStoryForm initialData={editingItem} donors={donors} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />;
          return (
             <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                 <p className="text-zinc-500">Form for {activeTab} not found.</p>
                 <button onClick={() => setViewMode('list')} className="mt-4 px-4 py-2 bg-zinc-100 rounded-lg text-sm">Go Back</button>
             </div>
          );
      }

      const tabData = getDataForTab();
       if (activeTab === 'overview') {
           const stats = data.stats || {};
           return (
               <div className="p-4 md:p-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-6">
                  <MetricCard label="Pending Blood Requests" value={stats.pendingRequests || 0} icon={MessageSquare} color="rose" />
                  <MetricCard label="Pending Donation Verifications" value={stats.pendingVerifications || 0} icon={ShieldCheck} color="blue" />
                  <MetricCard label="Verified Donors" value={stats.verifiedDonors || 0} icon={HeartHandshake} color="emerald" />
                  <MetricCard label="Active Events" value={stats.activeEvents || 0} icon={CalendarDays} color="orange" />
                  <MetricCard label="Lives Saved" value={stats.livesSaved || 0} icon={HeartHandshake} color="purple" />
               </div>
           )
       }

      if (!tabData || tabData.length === 0) {
        const icon = menuItems.find(i => i.id === activeTab)?.icon;
        return (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4 text-zinc-300">
                {icon && React.createElement(icon, { size: 32 })}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Section Empty</h3>
              <p className="text-zinc-500 max-w-[240px] mt-1 text-sm">No data available for {activeTab} yet. Start by adding a new record.</p>
              <button onClick={handleNewAction} className="mt-6 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">Add Record</button>
            </div>
          );
      }

      if (activeTab === 'requests') {
          return (
              <RequestTable 
                data={tabData}
                activeTab={activeTab}
                processingIds={processingIds}
                expandedRows={expandedRows}
                setExpandedRows={setExpandedRows}
                handleToggleStatus={handleToggleStatus}
                handleEdit={(item) => { setEditingItem(item); setViewMode('create'); }}
                handleDelete={handleDelete}
                handleUpdateDonorStatus={handleUpdateDonorStatus}
                handleUpdateRequestStatus={handleUpdateRequestStatus}
                setActiveTab={setActiveTab}
                setSearchQuery={setSearchQuery}
              />
          );
      }

      if (activeTab === 'verifications') {
          return (
              <VerificationTable 
                data={tabData}
                onSuccess={fetchData}
                processingIds={processingIds}
                handleUpdateStatus={handleVerify}
              />
          );
      }

      return (
          <DataTable 
            data={tabData}
            activeTab={activeTab as any}
            processingIds={processingIds}
            handleToggleStatus={handleToggleStatus}
            handleEdit={(item) => { setEditingItem(item); setViewMode('create'); }}
            handleDelete={handleDelete}
            handleUpdateDonorStatus={handleUpdateDonorStatus}
            handleUpdateRequestStatus={handleUpdateRequestStatus}
          />
      );
  };

  return (
    <>
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row font-sans selection:bg-rose-100 selection:text-rose-900">
        <AdminSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            setViewMode={setViewMode} 
            currentUser={currentUser} 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="h-16 md:h-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-8 flex items-center justify-between z-10 transition-all">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-zinc-500 hover:text-rose-600 md:hidden active:bg-zinc-100 rounded-full transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-200 dark:shadow-none shrink-0">
                        {menuItems.find(i => i.id === activeTab)?.icon && React.createElement(menuItems.find(i => i.id === activeTab)!.icon, { size: 16 })}
                    </div>
                    <div className="hidden xs:block">
                        <h1 className="text-sm md:text-lg font-bold text-zinc-900 dark:text-white capitalize leading-none">
                            {menuItems.find(i => i.id === activeTab)?.label || activeTab}
                        </h1>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                            <span>Admin</span>
                            <ChevronRight size={10} />
                            <span className="text-zinc-500">{viewMode}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 flex-1 justify-end md:justify-end md:flex-none ml-4 md:ml-0">
                    <div className="relative group flex-1 md:flex-none max-w-[200px] md:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-rose-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl text-sm focus:ring-1 focus:ring-rose-500 outline-none transition-all placeholder:text-zinc-400 font-medium"
                        />
                    </div>
                    {(activeTab === 'events' || activeTab === 'posts' || activeTab === 'stories') && viewMode === 'list' && (
                        <button
                            onClick={handleNewAction}
                            className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 bg-rose-600 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-rose-700 active:scale-95 transition-all shadow-lg shadow-rose-200 dark:shadow-none shrink-0"
                        >
                            <Plus size={20} className="md:size-[18px]" />
                            <span className="hidden md:inline ml-2 text-sm">Add New</span>
                        </button>
                    )}
                </div>
            </header>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-zinc-950 md:bg-zinc-50">
                <div className="p-0 md:p-8 pb-24 md:pb-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeTab}-${viewMode}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-transparent md:bg-white md:dark:bg-zinc-900 rounded-none md:rounded-[32px] border-none md:border border-zinc-200 dark:border-zinc-800 overflow-visible md:overflow-hidden shadow-none md:shadow-sm"
                        >
                            {renderTableContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </main>
    </div>
    
    <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => {
            setIsDeleteModalOpen(false);
            setItemToDeleteId(null);
        }}
        onConfirm={confirmDelete}
        title={`Delete ${activeTab.slice(0, -1)}`}
        message={`Are you sure you want to permanently delete this ${activeTab.slice(0, -1)}? This action cannot be undone.`}
        isProcessing={itemToDeleteId ? processingIds.has(itemToDeleteId) : false}
    />
    </>
  );
}
