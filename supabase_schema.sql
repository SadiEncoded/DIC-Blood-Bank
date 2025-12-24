-- ==========================================
-- 🩸 DIC BLOOD BANK — FINAL SUPABASE SCHEMA (2025)
-- ==========================================

-- 🔹 0. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 🔹 1. ENUM TYPES
CREATE TYPE blood_type_enum AS ENUM (
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
);

CREATE TYPE urgency_level AS ENUM (
  'NORMAL', 'URGENT', 'CRITICAL'
);

CREATE TYPE request_status AS ENUM (
  'PENDING', 'FULFILLED', 'CANCELLED'
);

CREATE TYPE user_role AS ENUM (
  'admin', 'donor'
);

CREATE TYPE audit_action AS ENUM (
  'CALL_CLICK', 'REQUEST_VIEW', 'WHATSAPP_CLICK'
);

-- 🔹 2. UPDATED_AT FUNCTION
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 🔹 3. BLOOD REQUESTS
CREATE TABLE public.blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT UNIQUE NOT NULL
    DEFAULT 'REQ-' || upper(substring(gen_random_uuid()::text FROM 1 FOR 6)),
  patient_name TEXT NOT NULL,
  blood_type blood_type_enum NOT NULL,
  units INTEGER NOT NULL CHECK (units > 0),
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

CREATE TRIGGER trg_blood_requests_updated
BEFORE UPDATE ON public.blood_requests
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_requests_blood_type ON public.blood_requests(blood_type);
CREATE INDEX idx_requests_location ON public.blood_requests(location);
CREATE INDEX idx_requests_status ON public.blood_requests(status);
CREATE INDEX idx_requests_needed_by ON public.blood_requests(needed_by);

-- 🔹 4. PROFILES (AUTH + DONORS + ADMINS)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_profiles_updated
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_profiles_blood_type ON public.profiles(blood_type);
CREATE INDEX idx_profiles_location ON public.profiles(location);
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- 🔹 5. PUBLIC SAFE DONOR VIEW
CREATE OR REPLACE VIEW public.active_donors AS
SELECT
  id,
  full_name,
  blood_type,
  location,
  age,
  last_donation,
  donation_count,
  is_available,
  is_verified
FROM public.profiles
WHERE role = 'donor'
  AND is_available = TRUE
  AND is_verified = TRUE;

-- 🔹 6. AUDIT LOGS
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action audit_action NOT NULL,
  caller_ip TEXT,
  request_id UUID REFERENCES public.blood_requests(id) ON DELETE SET NULL,
  donor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_action ON public.audit_logs(action);
CREATE INDEX idx_audit_request ON public.audit_logs(request_id);

-- 🔹 7. CONTACT MESSAGES
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_user_created 
ON public.contact_messages(user_id, created_at);


-- 🔹 8. EVENTS
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  bangla_title TEXT,
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'General',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_events_updated
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 🔹 9. STORIES
CREATE TABLE public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_stories_updated
BEFORE UPDATE ON public.stories
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 🔹 10. AUTO PROFILE CREATION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    phone_number, 
    blood_type, 
    location, 
    age, 
    last_donation,
    role
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Anonymous Donor'),
    NEW.raw_user_meta_data->>'phone',
    (NEW.raw_user_meta_data->>'blood_type')::blood_type_enum,
    NEW.raw_user_meta_data->>'location',
    (NEW.raw_user_meta_data->>'age')::INTEGER,
    (NEW.raw_user_meta_data->>'last_donation')::DATE,
    'donor'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 🔹 11. ROW LEVEL SECURITY
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Blood Requests
CREATE POLICY "Public read blood requests"
ON public.blood_requests FOR SELECT USING (true);

CREATE POLICY "Public create blood requests"
ON public.blood_requests FOR INSERT WITH CHECK (true);

-- Profiles
CREATE POLICY "Users read own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Admins read all profiles"
ON public.profiles FOR SELECT
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Audit Logs
CREATE POLICY "Public insert audit logs"
ON public.audit_logs FOR INSERT WITH CHECK (true);

-- Contact Messages
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can read contact messages"
ON public.contact_messages FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update contact messages"
ON public.contact_messages FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete contact messages"
ON public.contact_messages FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);


-- Events
CREATE POLICY "Public read active events"
ON public.events FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "Admins manage events"
ON public.events FOR ALL
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Stories
CREATE POLICY "Public read published stories"
ON public.stories FOR SELECT
USING (is_published = TRUE);

CREATE POLICY "Admins manage stories"
ON public.stories FOR ALL
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
