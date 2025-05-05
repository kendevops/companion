import api from './api';
import { PurchaseStatus } from '@/types';

interface CreatePurchaseData {
    sellerId: string;
    serviceIds: string[];
}

interface UpdatePurchaseData {
    status: PurchaseStatus;
}

const PurchasesService = {
    // Get all purchases for the current user (based on role)
    async getAllPurchases() {
        return api.get('/purchases');
    },

    // Get purchase by ID
    async getPurchaseById(id: string) {
        return api.get(`/purchases/${id}`);
    },

    // Get purchases by status
    async getPurchasesByStatus(status: PurchaseStatus) {
        return api.get(`/purchases/status/${status}`);
    },

    // Create a new purchase (buyer only)
    async createPurchase(data: CreatePurchaseData) {
        return api.post('/purchases', data);
    },

    // Update purchase status
    async updatePurchaseStatus(id: string, data: UpdatePurchaseData) {
        return api.patch(`/purchases/${id}`, data);
    }
};

export default PurchasesService;