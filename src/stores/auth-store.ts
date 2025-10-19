import { INITIAL_PROFILE_STATE } from "@/constants/auth-constant";
import { Profile } from "@/types/auth"
import { User } from "@supabase/supabase-js"
import { create } from "zustand"

type AuthState = {
    user: User | null;
    profile: Profile;
    setUser: (user: User | null) => void;
    setProfile: (profile: Profile) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    profile: INITIAL_PROFILE_STATE,
    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile }),

}));