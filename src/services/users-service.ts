import api from './api';
import { User, Seller } from '@/types';

const UsersService = {
    // Get all users (admin only)
    async getAllUsers() {
        return api.get('/users');
    },

    // Get user by ID
    async getUserById(id: string) {
        return api.get(`/users/${id}`);
    },

    // Update user profile
    async updateUser(id: string, data: Partial<User>) {
        return api.patch(`/users/${id}`, data);
    },

    // Get all sellers
    async getSellers(query?: string) {
        return api.get('/users/sellers', {
            params: { query }
        });
    },

    // Get seller details
    async getSellerDetails(id: string) {
        return api.get(`/users/sellers/${id}`);
    },

    // Update seller profile (for sellers only)
    async updateSellerProfile(data: Partial<Seller>) {
        return api.patch('/users/profile/seller', data);
    },

    // Get dashboard statistics
    async getDashboardStats() {
        return api.get('/users/dashboard-stats');
    }
};

export default UsersService;