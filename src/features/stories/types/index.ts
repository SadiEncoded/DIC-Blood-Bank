export interface DonorStory {
  id: string;
  donor_id: string;
  title: string;
  subtitle?: string;
  content: string;
  image_url?: string;
  category: string;
  read_time: string;
  color_theme: 'rose' | 'blue' | 'purple';
  views_count: number;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

export interface EnrichedDonorStory extends DonorStory {
  // Joined from profiles
  donor_name?: string;
  blood_type?: string;
  donations?: number;
  location?: string;
  is_verified?: boolean;
}
