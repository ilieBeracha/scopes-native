CREATE TABLE public.teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  owner_id uuid NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(name)
);

CREATE TABLE public.team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid,
  profile_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(team_id, profile_id),
  FOREIGN KEY (team_id) REFERENCES public.teams(id),
  FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);