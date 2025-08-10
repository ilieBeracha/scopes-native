import { LoginUserData, RegisterUserData } from "@/types/service/auth";
import { supabase } from "@/utils/supabase";
import axios from "axios";

async function registerCommander(user: RegisterUserData) {
  user.user_role = "commander";
  try {
    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/signup/commander`,
      user
    );
    return res.data;
  } catch (error: any) {
    console.error("Error registering commander:", error.message);
    throw new Error("Failed to register commander");
  }
}
async function registerSquadCommander(user: RegisterUserData) {
  user.user_role = "squad-commander";
  try {
    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/signup/squad-commander`,
      user
    );
    return res.data;
  } catch (error: any) {
    console.error("Error registering squad commander:", error.message);
    throw new Error("Failed to register squad commander");
  }
}
async function registerSoldier(user: RegisterUserData) {
  user.user_role = "soldier";
  try {
    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/signup/soldier`,
      user
    );
    return res.data;
  } catch (error: any) {
    console.error("Error registering soldier:", error.message);
    throw new Error("Failed to register soldier");
  }
}

async function login(user: LoginUserData) {
  console.log("user", user);
  if (user.email && !user.password) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: user.email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: "https://www.scope-stats.com",
      },
    });
    if (error) {
      console.error("Error signing in with email:", error.message);
      throw new Error("Failed to sign in with email");
    }
    return data;
  }

  try {
    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
      user
    );
    console.log("res", res.data);
    return res.data.user;
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    throw new Error("Failed to login");
  }
}

async function handleSignInWithGoogle(response: any) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });
  if (error) {
    console.error("Error signing in with Google:", error.message);
    throw new Error("Failed to sign in with Google");
  }
  return data;
}

export const authService = {
  registerCommander,
  registerSoldier,
  registerSquadCommander,
  login,
  handleSignInWithGoogle,
};
