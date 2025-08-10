## Database (Supabase)

Migrations
- Located in `supabase/migrations/`.
- Key tables:
  - `public.profiles` – user profile (created via trigger from `auth.users`).
  - `public.profiles_preferences` – per-profile units and settings.
  - `public.permissions` – static list of app permissions.

Triggers
- `public.handle_new_user` – on `auth.users` insert, creates a matching `public.profiles` row using `raw_user_meta_data` fields.

Permissions Table
- Unique constraint on `(resource, action)`.
- Indexes: `resource`, `action`.
- Timestamps: `created_at`, `updated_at` with update trigger.
- RLS: SELECT allowed for authenticated users. Writes via service role.

Seeding
- `supabase/seed.sql` inserts sample `auth.users`, `permissions`, and `profiles_preferences`.

Local Dev Commands
```bash
supabase db reset     # re-create schema and seed
supabase db push      # push new migrations
```

Notes
- Ensure columns referenced in triggers exist. If you remove a field from `profiles`, update the trigger accordingly.


