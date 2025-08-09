import { create } from "zustand";
import { authService } from "@/service/auth";
import { LoginUserData } from "@/types/service/auth";

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  login: (user: LoginUserData) => Promise<void>;
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),

  login: async (user: LoginUserData) => {
    try {
      const response = await authService.login(user);
      set({ user: response });
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Failed to login");
    }
  },
}));
