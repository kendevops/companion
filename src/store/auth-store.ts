import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, UserRole } from '@/types';

// Define the auth store interface
interface AuthStore extends AuthState {
    login: (user: User) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

// Create the auth store with persistence
export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,

            // Login action
            login: (user: User) => {
                set({ user, error: null });
            },

            // Logout action
            logout: () => {
                set({ user: null, error: null });
            },

            // Update user action
            updateUser: (userData: Partial<User>) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                }));
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
    return !!user;
};

// Helper to check if user has a specific role
export const hasRole = (role: UserRole) => {
    const { user } = useAuthStore.getState();
    return user?.role === role;
};