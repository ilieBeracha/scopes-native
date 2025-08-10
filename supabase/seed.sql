

INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    raw_app_meta_data,
    created_at,
    updated_at,
    aud,
    role
) VALUES
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'alice@example.com',
     crypt('password123', gen_salt('bf')), now(),
     '{"avatar_url": "https://example.com/alice.png", "first_name": "Alice", "last_name": "Anderson"}'::jsonb,
     '{"provider": "email", "providers": ["email"]}'::jsonb,
     now(), now(), 'authenticated', 'authenticated'),
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'bob@example.com',
     crypt('password123', gen_salt('bf')), now(),
     '{"avatar_url": "https://example.com/bob.png", "first_name": "Bob", "last_name": "Brown"}'::jsonb,
     '{"provider": "email", "providers": ["email"]}'::jsonb,
     now(), now(), 'authenticated', 'authenticated'),
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'charlie@example.com',
     crypt('password123', gen_salt('bf')), now(),
     '{"avatar_url": "https://example.com/charlie.png", "first_name": "Charlie", "last_name": "Clark"}'::jsonb,
     '{"provider": "email", "providers": ["email"]}'::jsonb,
     now(), now(), 'authenticated', 'authenticated');

-- Insert identities after users
INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    provider,
    identity_data,
    last_sign_in_at,
    created_at,
    updated_at
) VALUES
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'alice@example.com', 'email', 
     '{"sub": "00000000-0000-0000-0000-000000000001", "email": "alice@example.com"}'::jsonb, now(), now(), now()),
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'bob@example.com', 'email',
     '{"sub": "00000000-0000-0000-0000-000000000002", "email": "bob@example.com"}'::jsonb, now(), now(), now()),
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'charlie@example.com', 'email',
     '{"sub": "00000000-0000-0000-0000-000000000003", "email": "charlie@example.com"}'::jsonb, now(), now(), now());

-- Seed for permissions
INSERT INTO public.permissions (resource, action, description)
VALUES
  ('teams', 'create', 'Ability to create a new team'),
  ('teams', 'read', 'Ability to view team details'),
  ('teams', 'update', 'Ability to update team info'),
  ('teams', 'delete', 'Ability to delete a team'),
  
  ('profiles_preferences', 'create', 'Ability to create a new profile preferences'),
  ('profiles_preferences', 'update', 'Ability to change profile preferences'),
  ('profiles_preferences', 'read', 'Ability to view profile preferences'),
  ('profiles_preferences', 'delete', 'Ability to delete profile preferences');


-- Seed for profiles_preferences  
INSERT INTO public.profiles_preferences (profile_id, distance_unit, timezone, angle_unit)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'meters', 'UTC', 'moa'),
  ('00000000-0000-0000-0000-000000000002', 'yards', 'UTC', 'mils'),
  ('00000000-0000-0000-0000-000000000003', 'meters', 'UTC', 'moa');