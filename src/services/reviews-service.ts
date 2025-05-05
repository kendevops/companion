import api from './api';

interface CreateReviewData {
    sellerId: string;
    serviceId: string;
    rating: number;
    comment: string;
}

interface UpdateReviewData {
    rating?: number;
    comment?: string;
}

const ReviewsService = {
    // Get all reviews
    async getAllReviews() {
        return api.get('/reviews');
    },

    // Get review by ID
    async getReviewById(id: string) {
        return api.get(`/reviews/${id}`);
    },

    // Get reviews by seller
    async getReviewsBySeller(sellerId: string) {
        return api.get(`/reviews/seller/${sellerId}`);
    },

    // Get reviews by service
    async getReviewsByService(serviceId: string) {
        return api.get(`/reviews/service/${serviceId}`);
    },

    // Get current user's reviews
    async getMyReviews() {
        return api.get('/reviews/my-reviews');
    },

    // Create a new review (buyer only)
    async createReview(data: CreateReviewData) {
        return api.post('/reviews', data);
    },

    // Update a review (buyer only or admin)
    async updateReview(id: string, data: UpdateReviewData) {
        return api.patch(`/reviews/${id}`, data);
    },

    // Delete a review (buyer only or admin)
    async deleteReview(id: string) {
        return api.delete(`/reviews/${id}`);
    }
};

export default ReviewsService;