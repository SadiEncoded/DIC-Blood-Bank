export interface Event {
  id: string;
  title: string;
  bangla_title?: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
  category: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
