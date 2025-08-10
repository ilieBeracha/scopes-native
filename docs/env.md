## Environment Variables

Required (Expo runtime)
- `EXPO_PUBLIC_SUPABASE_URL` – Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon key

Where used
- `lib/supabase.js` initializes the client with AsyncStorage and session persistence.

Example `.env`
```bash
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Notes
- Keys prefixed with `EXPO_PUBLIC_` are embedded in the client app (safe for anon key).
- Do not commit secrets (service role keys) to the app or repo.


