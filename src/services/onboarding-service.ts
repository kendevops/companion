import api from './api';

interface SellerProfileData {
    bio?: string;
    profilePictures: string[];
    contactDetails: {
        phoneNumber: string;
        instagram?: string;
        wechat?: string;
    };
}

interface ServiceData {
    title: string;
    description: string;
    price: number;
    isAvailable?: boolean;
}

interface SellerServicesData {
    services: ServiceData[];
}

const OnboardingService = {
    // Get the current onboarding status
    async getOnboardingStatus() {
        return api.get('/onboarding/status');
    },

    // Update seller profile
    async updateSellerProfile(data: SellerProfileData) {
        return api.post('/onboarding/profile', data);
    },

    // Add seller services
    async addSellerServices(data: SellerServicesData) {
        return api.post('/onboarding/services', data);
    },

    // Complete the onboarding process
    async completeOnboarding(completed: boolean = true) {
        return api.post('/onboarding/complete', { completed });
    }
};

export default OnboardingService;