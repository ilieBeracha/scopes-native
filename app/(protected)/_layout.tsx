import { useColorScheme } from "@/hooks/useColorScheme";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
  const colorScheme = useColorScheme();
  const session = useAuthStore((s) => s.session);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      useAuthStore.getState().setSession(session ?? null);
      useAuthStore.getState().setUser(session?.user ?? null);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
