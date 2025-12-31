-- ==========================================
-- 🔹 0. INITIALIZATION
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 🔹 1. ENUM TYPES
-- ==========================================
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'blood_type_enum') THEN
        CREATE TYPE blood_type_enum AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
        CREATE TYPE urgency_level AS ENUM ('NORMAL', 'URGENT', 'CRITICAL');
        CREATE TYPE request_status AS ENUM ('PENDING', 'FULFILLED', 'CANCELLED');
        CREATE TYPE user_role AS ENUM ('admin', 'donor');
        CREATE TYPE audit_action AS ENUM ('CALL_CLICK', 'REQUEST_VIEW', 'WHATSAPP_CLICK');
    END IF;
END $$;

-- ==========================================
-- 🔹 2. SMART UTILITY FUNCTIONS
-- ==========================================

-- Standard Updated_At Function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Admin Check Helper (SECURITY DEFINER bypasses RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Record Life Saved Helper (SECURITY DEFINER bypasses RLS for inserts)
CREATE OR REPLACE FUNCTION public.record_life_saved(
  p_request_id UUID,
  p_patient_name TEXT,
  p_blood_type blood_type_enum,
  p_units INTEGER,
  p_hospital TEXT,
  p_location TEXT,
  p_donor_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_life_saved_id UUID;
BEGIN
  -- Only allow admins to call this function
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Only admins can record lives saved';
  END IF;

  -- Insert the life saved record
  INSERT INTO public.lives_saved (
    request_id,
    donor_id,
    patient_name,
    blood_type,
    units,
    hospital,
    location,
    saved_at
  ) VALUES (
    p_request_id,
    p_donor_id,
    p_patient_name,
    p_blood_type,
    p_units,
    p_hospital,
    p_location,
    NOW()
  )
  RETURNING id INTO v_life_saved_id;

  RETURN v_life_saved_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.record_life_saved(UUID, TEXT, blood_type_enum, INTEGER, TEXT, TEXT, UUID) TO authenticated;


-- ==========================================
-- 🔹 3. CORE TABLES
-- ==========================================

-- 3.1 PROFILES (The Heart)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT,
  blood_type blood_type_enum,
  location TEXT,
  age INTEGER CHECK (age >= 18),
  last_donation DATE,
  donation_count INTEGER DEFAULT 0 CHECK (donation_count >= 0),
  is_available BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  role user_role NOT NULL DEFAULT 'donor',
  last_profile_update TIMESTAMPTZ, -- For rate limiting
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.2 BLOOD REQUESTS (Tracking Logic)
CREATE TABLE public.blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT UNIQUE NOT NULL DEFAULT 'REQ-' || upper(substring(gen_random_uuid()::text FROM 1 FOR 6)),
  patient_name TEXT NOT NULL,
  blood_type blood_type_enum NOT NULL,
  units INTEGER NOT NULL DEFAULT 1 CHECK (units > 0),
  hospital TEXT NOT NULL,
  location TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  urgency urgency_level NOT NULL DEFAULT 'NORMAL',
  needed_by TIMESTAMPTZ NOT NULL,
  notes TEXT,
  status request_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.3 EVENTS (Marketing/Drive Campaigns)
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  bangla_title TEXT,
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Blood Drive',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.4 COMMUNITY POSTS (Modern Card UI)
CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  headline TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'General',
  color_theme TEXT DEFAULT 'rose',
  icon TEXT,
  read_time TEXT,
  display_date TEXT,
  key_points JSONB DEFAULT '[]'::jsonb,
  creator JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.5 STORIES (The "Perfected" Version)
CREATE TABLE public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Success Story',
  read_time TEXT DEFAULT '3 min read',
  color_theme TEXT DEFAULT 'rose',
  views_count INTEGER DEFAULT 0 CHECK (views_count >= 0),
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.6 AUDIT & CONTACT
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action audit_action NOT NULL,
  caller_ip TEXT,
  request_id UUID REFERENCES public.blood_requests(id) ON DELETE SET NULL,
  donor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.7 LIVES SAVED (Impact Tracking)
CREATE TABLE public.lives_saved (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES public.blood_requests(id) ON DELETE SET NULL,
  donor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  patient_name TEXT NOT NULL,
  blood_type blood_type_enum NOT NULL,
  units INTEGER NOT NULL DEFAULT 1 CHECK (units > 0),
  hospital TEXT NOT NULL,
  location TEXT NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 🔹 4. AUTOMATION & INDEXES
-- ==========================================

-- Timestamps
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_requests_updated BEFORE UPDATE ON public.blood_requests FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_events_updated BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_posts_updated BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_stories_updated BEFORE UPDATE ON public.stories FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Auto Profile Creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User_' || substring(NEW.id::text from 1 for 5)), 'donor');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexes for Performance
CREATE INDEX idx_profiles_available ON public.profiles(blood_type, location) WHERE is_available = true;
CREATE INDEX idx_profiles_role ON public.profiles(role); -- Faster admin checks
CREATE INDEX idx_requests_active ON public.blood_requests(status, needed_by);
CREATE INDEX idx_stories_featured ON public.stories(is_featured) WHERE is_featured = true;
CREATE INDEX idx_lives_saved_count ON public.lives_saved(saved_at); -- Fast global count queries

-- Views
CREATE OR REPLACE VIEW public.active_donors AS
SELECT * FROM public.profiles WHERE is_available = true AND is_verified = true;

-- ==========================================
-- 🔹 5. ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lives_saved ENABLE ROW LEVEL SECURITY;

-- 5.1 Public View Access
-- 5.1 Profile Access: Public can see basic donor info, owner/admin see all
CREATE POLICY "profiles_select_public" ON public.profiles FOR SELECT USING (is_available = true);
CREATE POLICY "profiles_select_self" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);

-- 5.2 Blood Requests: Publicly readable for tracking
CREATE POLICY "pub_read_requests" ON public.blood_requests FOR SELECT USING (true);
CREATE POLICY "pub_read_events" ON public.events FOR SELECT USING (is_active = true);
CREATE POLICY "pub_read_posts" ON public.community_posts FOR SELECT USING (is_active = true);
CREATE POLICY "pub_read_stories" ON public.stories FOR SELECT USING (is_published = true);

-- 5.2 User Self-Management
CREATE POLICY "self_update_profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "pub_insert_requests" ON public.blood_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "pub_insert_contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "pub_insert_audit" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- 5.3 Admin "God Mode"
CREATE POLICY "admin_manage_profiles" ON public.profiles FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "admin_manage_requests" ON public.blood_requests FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "admin_manage_events" ON public.events FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "admin_manage_posts" ON public.community_posts FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "admin_manage_stories" ON public.stories FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "admin_view_logs" ON public.audit_logs FOR SELECT TO authenticated USING (is_admin());

-- 5.4 Lives Saved Access
CREATE POLICY "Public can view lives saved" ON public.lives_saved FOR SELECT USING (true);
CREATE POLICY "admin_insert_lives_saved" ON public.lives_saved FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "admin_update_lives_saved" ON public.lives_saved FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "admin_delete_lives_saved" ON public.lives_saved FOR DELETE TO authenticated USING (is_admin());
