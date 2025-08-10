import { supabase } from "@/lib/supabase";
import { LoginUserData, RegisterUserData } from "@/types/service/auth";
import { Session, User } from "@supabase/supabase-js";

export async function loginProfile(user: LoginUserData) {
  console.log("Attempting login with:", {
    email: user.email,
    hasPassword: !!user.password,
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  if (error) {
    console.error("Supabase auth error:", error.message);
    console.error("Error status:", error.status);
    console.error("Full error object:", JSON.stringify(error, null, 2));
    throw error;
  }

  return { user: data.user, session: data.session as Session };
}

export async function registerProfile(user: RegisterUserData) {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        avatar_url: user.avatar_url,
        first_name: user.first_name,
        last_name: user.last_name,
        mfa_enabled: user.mfa_enabled,
      },
    },
  });

  if (error) {
    console.error("Error registering profile:", error);
    throw error;
  }

  return { user: data.user, session: data.session as Session };
}

export interface LoginProfileResponse {
  user: User | null;
  session: Session;
}

export const authService = {
  registerProfile,
  loginProfile,
};
