import api from './api';
import { Service } from '@/types';

const ServicesService = {
    // Get all services
    async getAllServices(query?: string) {
        return api.get('/services', {
            params: { query }
        });
    },

    // Get service by ID
    async getServiceById(id: string) {
        return api.get(`/services/${id}`);
    },

    // Get services by seller
    async getServicesBySeller(sellerId: string) {
        return api.get(`/services/seller/${sellerId}`);
    },

    // Get current seller's services
    async getMyServices() {
        return api.get('/services/my-services');
    },

    // Create a new service (seller only)
    async createService(data: Omit<Service, 'id' | 'sellerId' | 'createdAt' | 'updatedAt'>) {
        return api.post('/services', data);
    },

    // Update a service (seller only)
    async updateService(id: string, data: Partial<Service>) {
        return api.patch(`/services/${id}`, data);
    },

    // Toggle service availability (seller only)
    async toggleServiceAvailability(id: string) {
        return api.patch(`/services/${id}/toggle-availability`);
    },

    // Delete a service (seller only)
    async deleteService(id: string) {
        return api.delete(`/services/${id}`);
    }
};

export default ServicesService;