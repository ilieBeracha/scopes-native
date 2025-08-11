import { UnifiedAuth } from "@/components/UnifiedAuth";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      setSession(session ?? null);
      setUser(session?.user ?? null);
      if (session) {
        router.replace("/(protected)/home");
      }
      console.log("session", session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        setSession(session ?? null);
        setUser(session?.user ?? null);
        if (session) {
          router.replace("/(protected)/home");
        }
        console.log("session", session);
      }
    );

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [router, setSession, setUser]);

  return <UnifiedAuth />;
}