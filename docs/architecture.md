## Architecture Notes

Stack
- Expo + React Native + expo-router
- State: Zustand (`useAuthStore`)
- Backend: Supabase (auth, Postgres, RLS)

Key Paths
- `app/` – screens and layouts (file-based routes)
- `app/(protected)/` – authenticated area
- `components/` – UI components
- `service/` – API/services (Supabase auth)
- `store/` – global state stores
- `lib/` – client instances (Supabase)
- `supabase/` – migrations, seed, config

Auth Flow
1. Register/Login with Supabase
2. Trigger writes `public.profiles`
3. Session stored in AsyncStorage
4. `app/index.tsx` hydrates and routes

Database
- `profiles` base info
- `profiles_preferences` user settings (units)
- `permissions` static permission catalog

Security
- RLS enabled on `permissions` for read-only access to authenticated users.


