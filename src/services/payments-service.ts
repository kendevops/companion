import api from './api';
import { PaymentStatus } from '@/types';

interface CreatePaymentData {
    purchaseId: string;
    paymentMethod: string;
}

interface UpdatePaymentData {
    status: PaymentStatus;
}

const PaymentsService = {
    // Get all payments for the current user (based on role)
    async getAllPayments() {
        return api.get('/payments');
    },

    // Get payment by ID
    async getPaymentById(id: string) {
        return api.get(`/payments/${id}`);
    },

    // Get payments by status
    async getPaymentsByStatus(status: PaymentStatus) {
        return api.get(`/payments/status/${status}`);
    },

    // Create a new payment (buyer only)
    async createPayment(data: CreatePaymentData) {
        return api.post('/payments', data);
    },

    // Update payment status (admin only)
    async updatePaymentStatus(id: string, data: UpdatePaymentData) {
        return api.patch(`/payments/${id}`, data);
    }
};

export default PaymentsService;