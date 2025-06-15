/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import OnboardingService from '@/services/onboarding-service';
import { toast } from 'sonner';

interface OnboardingState {
    currentStep: number;
    isLoading: boolean;
    error: string | null;
    onboardingStatus: any;
    predefinedServices: any[];
    selectedServices: string[];
    profileData: {
        bio: string;
        phoneNumber: string;
        instagram: string;
        wechat: string;
        profilePictures: string[];
    };
}

interface OnboardingActions {
    // Navigation
    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;

    // Data management
    updateProfileData: (data: Partial<OnboardingState['profileData']>) => void;
    setSelectedServices: (services: string[]) => void;
    toggleService: (serviceId: string) => void;

    // API calls
    fetchOnboardingStatus: () => Promise<void>;
    fetchPredefinedServices: () => Promise<void>;
    updateProfile: () => Promise<boolean>;
    createServices: () => Promise<boolean>;
    completeOnboarding: () => Promise<boolean>;

    // Utility
    resetStore: () => void;
    clearError: () => void;
}

type OnboardingStore = OnboardingState & OnboardingActions;

const initialState: OnboardingState = {
    currentStep: 1,
    isLoading: false,
    error: null,
    onboardingStatus: null,
    predefinedServices: [],
    selectedServices: [],
    profileData: {
        bio: '',
        phoneNumber: '',
        instagram: '',
        wechat: '',
        profilePictures: [],
    },
};

export const useOnboardingStore = create<OnboardingStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            // Navigation actions
            setCurrentStep: (step: number) => {
                set({ currentStep: step });
            },

            nextStep: () => {
                const { currentStep } = get();
                if (currentStep < 3) {
                    set({ currentStep: currentStep + 1 });
                }
            },

            prevStep: () => {
                const { currentStep } = get();
                if (currentStep > 1) {
                    set({ currentStep: currentStep - 1 });
                }
            },

            // Data management
            updateProfileData: (data) => {
                set((state) => ({
                    profileData: { ...state.profileData, ...data },
                }));
            },

            setSelectedServices: (services) => {
                set({ selectedServices: services });
            },

            toggleService: (serviceId) => {
                set((state) => ({
                    selectedServices: state.selectedServices.includes(serviceId)
                        ? state.selectedServices.filter(id => id !== serviceId)
                        : [...state.selectedServices, serviceId],
                }));
            },

            // API calls
            fetchOnboardingStatus: async () => {
                set({ isLoading: true, error: null });
                try {
                    const status = await OnboardingService.getOnboardingStatus();
                    set({ onboardingStatus: status, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch onboarding status',
                        isLoading: false
                    });
                }
            },

            fetchPredefinedServices: async () => {
                set({ isLoading: true, error: null });
                try {
                    const services = await OnboardingService.getPredefinedServices();
                    set({ predefinedServices: services, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch services',
                        isLoading: false
                    });
                }
            },

            updateProfile: async () => {
                const { profileData } = get();
                set({ isLoading: true, error: null });

                try {
                    await OnboardingService.updateSellerProfile(profileData);
                    set({ isLoading: false });
                    toast.success('Profile updated successfully!');
                    return true;
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to update profile',
                        isLoading: false
                    });
                    toast.error('Failed to update profile');
                    return false;
                }
            },

            createServices: async () => {
                const { selectedServices } = get();

                if (selectedServices.length < 3) {
                    set({ error: 'Please select at least 3 services' });
                    toast.error('Please select at least 3 services');
                    return false;
                }

                set({ isLoading: true, error: null });

                try {
                    // Create services using the bulk approach
                    await OnboardingService.selectServices(selectedServices);
                    set({ isLoading: false });
                    toast.success('Services created successfully!');
                    return true;
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to create services',
                        isLoading: false
                    });
                    toast.error('Failed to create services');
                    return false;
                }
            },

            completeOnboarding: async () => {
                set({ isLoading: true, error: null });

                try {
                    await OnboardingService.completeOnboarding();
                    set({ isLoading: false });
                    toast.success('Onboarding completed successfully!');
                    return true;
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to complete onboarding',
                        isLoading: false
                    });
                    toast.error('Failed to complete onboarding');
                    return false;
                }
            },

            // Utility
            resetStore: () => {
                set(initialState);
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'onboarding-storage',
            partialize: (state) => ({
                currentStep: state.currentStep,
                profileData: state.profileData,
                selectedServices: state.selectedServices,
            }),
        }
    )
);