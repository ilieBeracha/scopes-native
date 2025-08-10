import { authService } from "@/service/auth";
import { LoginUserData, RegisterUserData } from "@/types/service/auth";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
  registerProfile: (user: RegisterUserData) => Promise<void>;
  loginProfile: (p: { email: string; password: string }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  session: null,
  setSession: (session: Session | null) => set({ session }),

  registerProfile: async (user: RegisterUserData) => {
    try {
      const response = await authService.registerProfile(user);
      set({ user: response.user });
      set({ session: response.session });
    } catch (error) {
      set({ session: null });
      set({ user: null });
      console.error("Error registering profile:", error);
      throw new Error("Failed to register profile");
    }
  },
  loginProfile: async (user: LoginUserData) => {
    try {
      const response = await authService.loginProfile(user);
      set({ user: response.user });
      set({ session: response.session });
    } catch (error: any) {
      set({ session: null });
      set({ user: null });
      console.error("Error logging in profile - Full error:", error);
      console.error("Error message:", error?.message);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
  },
}));
