/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, UserRole } from '@/types';
import AuthService from '@/services/auth-service';
import { toast } from "react-hot-toast";
import OnboardingService from '@/services/onboarding-service';

// Define the auth store interface
interface AuthStore extends AuthState {
    onboardingRequired: boolean;
    onboardingStep: string | null;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    registerUser: (data: any) => Promise<boolean>;
    loginUser: (data: any) => Promise<boolean>;
    setOnboardingComplete: () => void;
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
                            updatedAt: response.user.updatedAt || new Date().toISOString()
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
                    console.log('Login response:', response);
                    set({
                        user: response.user,
                        isLoading: true, // Keep loading while we check onboarding
                    });

                    // If user is a seller, check onboarding status
                    if (response.user.role === UserRole.SELLER) {
                        try {
                            // Use the OnboardingService to get the status
                            const onboardingResponse = await OnboardingService.getOnboardingStatus();
                            console.log('Onboarding status:', onboardingResponse.data);

                            set({
                                isLoading: false,
                                onboardingRequired: !onboardingResponse.data.completed,
                                onboardingStep: onboardingResponse.data.nextStep || 'profile'
                            });
                        } catch (onboardingError) {
                            console.error('Failed to fetch onboarding status:', onboardingError);
                            // Default to requiring onboarding for sellers if check fails
                            set({
                                isLoading: false,
                                onboardingRequired: true,
                                onboardingStep: 'profile' // Default to first step
                            });
                        }
                    } else {
                        // For non-sellers, just finish loading
                        set({
                            isLoading: false,
                            onboardingRequired: false,
                            onboardingStep: null
                        });
                    }
                    toast.success(`Welcome back, ${response.user.name}!`);
                    return true;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.response?.data?.message || 'Login failed'
                    });
                    setTimeout(() => set({ error: null }), 1000);
                    return false;
                }
            },
            // Mark onboarding as complete
            setOnboardingComplete: () => {
                set({
                    onboardingRequired: false,
                    onboardingStep: null
                });
            }
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

// Helper to check if onboarding is required
export const isOnboardingRequired = () => {
    const { onboardingRequired } = useAuthStore.getState();
    return onboardingRequired;
};

// Helper to get the next onboarding step
export const getOnboardingStep = () => {
    const { onboardingStep } = useAuthStore.getState();
    return onboardingStep;
};