/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, UserRole } from '@/types';
import AuthService from '@/services/auth-service';
import { toast } from "react-hot-toast";

// Define the auth store interface
interface AuthStore extends AuthState {
    onboardingRequired: boolean;
    onboardingStep: string | null;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    registerUser: (data: any) => Promise<boolean>;
    loginUser: (data: any) => Promise<{ success: boolean; user: User | null; }>;
}

// Create the auth store with persistence
export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,
            onboardingRequired: false,
            onboardingStep: null,

            // Login action - store user data
            login: (user: User) => {
                set({ user, error: null });
            },

            // Logout action - clear user data and token
            logout: () => {
                AuthService.logout();
                set({ user: null, error: null });
            },

            // Update user data
            updateUser: (userData: Partial<User>) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                }));
            },

            // Register a new user
            registerUser: async (data: any) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await AuthService.register(data);
                    set({
                        user: {
                            ...response.user,
                            createdAt: response.user.createdAt || new Date().toISOString(),
                            updatedAt: response.user.updatedAt || new Date().toISOString(),
                            onboardingRequired: false
                        },
                        onboardingRequired: response.onboarding?.required || false,
                        onboardingStep: response.onboarding?.nextStep || null,
                        isLoading: false
                    });
                    toast.success('Registration successful!');
                    return true;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.response?.data?.message || 'Registration failed'
                    });
                    setTimeout(() => set({ error: null }), 1000);
                    return false;
                }
            },

            // Login a user
            loginUser: async (data: any) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await AuthService.login(data);
                    const user: User = {
                        ...response.user,
                        onboardingRequired: response.user.onboardingRequired ?? false,
                        createdAt: response.user.createdAt || new Date().toISOString(),
                        updatedAt: response.user.updatedAt || new Date().toISOString(),
                    };
                    set({ user, isLoading: false });
                    toast.success(`Welcome back, ${user.name}!`);

                    // Return user data including onboarding status
                    return { success: true, user };
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.response?.data?.message || 'Login failed'
                    });
                    return { success: false, user: null };
                }
            },
        }),
        {
            name: 'auth-storage', // localStorage key
        }
    )
);

// Helper to check if user is authenticated
export const isAuthenticated = () => {
    const { user } = useAuthStore.getState();
    return !!user && AuthService.isAuthenticated();
};

// Helper to check if user has a specific role
export const hasRole = (role: UserRole) => {
    const { user } = useAuthStore.getState();
    return user?.role === role;
};