CREATE TABLE public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  avatar_url text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  mfa_enabled boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(email)
);

CREATE TABLE public.permissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resource text NOT NULL,
  action text NOT NULL,
  description text,
  
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(resource, action)
);

CREATE TABLE public.profiles_preferences (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL,
  distance_unit text NOT NULL,
  timezone text NOT NULL DEFAULT 'UTC',
  angle_unit text NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(profile_id),
  FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);

CREATE INDEX idx_profiles_preferences_profile_id ON public.profiles_preferences(profile_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    avatar_url,
    first_name,
    last_name,
    mfa_enabled
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''), -- fallback to empty string
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),  -- default empty
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),   -- default empty
    false
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
