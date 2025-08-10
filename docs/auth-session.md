## Auth & Session

Libraries
- `@supabase/supabase-js` with React Native `AsyncStorage` for persistence.

Client
```ts
// lib/supabase.js
createClient(url, anon, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false }
})
```

Register / Login
- Service: `service/auth.ts`
  - `registerProfile` – calls `supabase.auth.signUp` and stores metadata (`avatar_url`, `first_name`, `last_name`, `mfa_enabled`).
  - `loginProfile` – calls `supabase.auth.signInWithPassword`.

State Store
- `store/auth.tsx` (Zustand) holds `user` and `session`.

Session Hydration
- `app/index.tsx`: on startup, it
  - calls `supabase.auth.getSession()`
  - subscribes to `onAuthStateChange`
  - stores `user`/`session` in `useAuthStore`
  - routes to `/(protected)/home` if a session exists

Protecting Routes
- Place authenticated screens under `app/(protected)/` with a layout that guards access if desired.

Logout
```ts
await supabase.auth.signOut()
useAuthStore.getState().setSession(null)
useAuthStore.getState().setUser(null)
```

MFA
- UI toggle on register captures `mfa_enabled` (server-side MFA flow not implemented).


