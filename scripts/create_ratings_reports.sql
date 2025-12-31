
-- 1. Create User Ratings Table
CREATE TABLE public.user_ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INTEGER CHECK (score >= 1 AND score <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create User Reports Table
CREATE TYPE report_status_enum AS ENUM ('PENDING', 'RESOLVED', 'DISMISSED');

CREATE TABLE public.user_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    target_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    details TEXT,
    status report_status_enum DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Update Profiles Table
ALTER TABLE public.profiles 
ADD COLUMN average_rating DECIMAL(3, 2) DEFAULT 0,
ADD COLUMN rating_count INTEGER DEFAULT 0,
ADD COLUMN flag_count INTEGER DEFAULT 0;

-- 4. Enable RLS
ALTER TABLE public.user_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reports ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Ratings Policies
CREATE POLICY "Public can view ratings" ON public.user_ratings FOR SELECT USING (true);
CREATE POLICY "Users can rate others" ON public.user_ratings FOR INSERT TO authenticated WITH CHECK (auth.uid() = reviewer_id);
-- Ideally limit to 1 rating per user-pair or link to transaction, but keeping simple for now

-- Reports Policies
CREATE POLICY "Admins can view reports" ON public.user_reports FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can update reports" ON public.user_reports FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "Users can create reports" ON public.user_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);

-- 6. Trigger to Auto-Update Average Rating
CREATE OR REPLACE FUNCTION update_profile_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET 
        average_rating = (SELECT AVG(score) FROM public.user_ratings WHERE target_id = NEW.target_id),
        rating_count = (SELECT COUNT(*) FROM public.user_ratings WHERE target_id = NEW.target_id)
    WHERE id = NEW.target_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_update_rating
AFTER INSERT OR UPDATE ON public.user_ratings
FOR EACH ROW
EXECUTE FUNCTION update_profile_rating();

-- 7. Trigger to Auto-Update Flag Count
CREATE OR REPLACE FUNCTION update_flag_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET flag_count = (SELECT COUNT(*) FROM public.user_reports WHERE target_id = NEW.target_id)
    WHERE id = NEW.target_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_update_flag_count
AFTER INSERT ON public.user_reports
FOR EACH ROW
EXECUTE FUNCTION update_flag_count();
