## Setup

Prerequisites
- Node.js 18+
- npm 9+
- Expo CLI (`npm i -g expo`)
- Supabase CLI (`npm i -g supabase`)

Install
```bash
npm install
```

Environment
- Copy `.env.example` (if present) to `.env` and fill values, or set env in your shell.
- See [Environment Variables](./env.md).

Local Supabase
```bash
supabase start
supabase db reset --no-seed # optional first run; use --seed later
supabase db reset           # applies migrations and seeds
```

Run the app
```bash
npx expo start
# or
npm run ios
npm run android
npm run web
```

Project Scripts
- `npm start` – Start Metro bundler
- `npm run ios` / `android` / `web` – Platform shortcuts
- `npm run reset-project` – Reset starter template (unused for ongoing dev)


