## Deployment

Build with EAS
```bash
expo login
eas login
eas build:configure
eas build -p ios --profile production
eas build -p android --profile production
```

iOS Provisioning
- The App Store requires a Distribution provisioning profile (not Ad Hoc/Enterprise).
- Use EAS to manage credentials or upload your own via App Store Connect.
- If you see “Invalid Provisioning Profile … Ad Hoc/Enterprise”, rebuild with an App Store Distribution profile.

Store Submission
- After a successful `eas build`, submit:
```bash
eas submit -p ios --latest
eas submit -p android --latest
```

Environment for CI
- Provide `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` via EAS secrets.

Runtime Checks
- Verify auth session persistence works in production builds.
- Confirm RLS policies permit necessary reads from the client.


