export interface DonorStory {
  id: string;
  donor_id: string;
  title: string;
  content: string;
  image_url?: string;
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
