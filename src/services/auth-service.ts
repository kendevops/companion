import api from './api';
import { UserRole } from '@/types';

interface RegisterData {
    name: string;
    email: string;
    username: string;
    password: string;
    role: UserRole;
}

interface LoginData {
    email: string;
    password: string;
}

interface ForgotPasswordData {
    email: string;
}

interface ResetPasswordData {
    token: string;
    password: string;
}

interface OnboardingStatus {
    required: boolean;
    nextStep: string | null;
}

interface AuthResponse {
    access_token: string;
    user: {
        onboardingRequired: boolean;
        createdAt: string;
        updatedAt: string;
        id: string;
        name: string;
        email: string;
        username: string;
        role: UserRole;
    };
    onboarding: OnboardingStatus;
}

const AuthService = {
    // Register a new user
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);

        // Store the token and return the response
        localStorage.setItem('token', response.data.access_token);
        return response.data;
    },

    // Login with credentials
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);

        // Store the token and return the response
        localStorage.setItem('token', response.data.access_token);
        return response.data;
    },

    // Get the current user profile
    async getProfile() {
        return api.get('/auth/profile');
    },

    // Logout the user
    logout() {
        localStorage.removeItem('token');
    },

    // Check if the user is authenticated
    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    // Request a password reset
    async forgotPassword(data: ForgotPasswordData) {
        return api.post('/auth/forgot-password', data);
    },

    // Reset password with token
    async resetPassword(data: ResetPasswordData) {
        return api.post('/auth/reset-password', data);
    }
};

export default AuthService;