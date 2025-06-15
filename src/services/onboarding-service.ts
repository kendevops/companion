/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';

interface OnboardingStatus {
    completed: boolean;
    steps: {
        profileDetails: boolean;
        serviceSelection: boolean;
    };
    seller: any;
}

interface UpdateProfileData {
    bio?: string;
    phoneNumber?: string;
    instagram?: string;
    wechat?: string;
    profilePictures?: string[];
}

interface PredefinedService {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    isActive: boolean;
}

interface CreateServiceData {
    predefinedServiceId: string;
    title: string;
    description?: string;
    price?: number;
}

const OnboardingService = {
    // Get onboarding status
    async getOnboardingStatus(): Promise<OnboardingStatus> {
        const response = await api.get('/onboarding/status');
        return response.data;
    },

    // Update seller profile (Step 1)
    async updateSellerProfile(data: UpdateProfileData) {
        const response = await api.patch('/onboarding/profile', data);
        return response.data;
    },

    // Get predefined services
    async getPredefinedServices(): Promise<PredefinedService[]> {
        const response = await api.get('/onboarding/predefined-services');
        return response.data;
    },

    // Select services (bulk approach)
    async selectServices(predefinedServiceIds: string[]) {
        const response = await api.post('/onboarding/select-services', {
            predefinedServiceIds,
        });
        return response.data;
    },

    // Create services from predefined (detailed approach)
    async createServicesFromPredefined(servicesData: CreateServiceData[]) {
        const response = await api.post('/onboarding/create-services', servicesData);
        return response.data;
    },

    // Complete onboarding
    async completeOnboarding() {
        const response = await api.post('/onboarding/complete');
        return response.data;
    },
};

export default OnboardingService;