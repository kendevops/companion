// User roles
export enum UserRole {
    ADMIN = "admin",
    SELLER = "seller",
    BUYER = "buyer"
}

// User interface
export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

// Admin specific fields
export interface Admin extends User {
    role: UserRole.ADMIN;
}

// Seller specific fields
export interface Seller extends User {
    role: UserRole.SELLER;
    profilePictures: string[];
    services: Service[];
    contactDetails: ContactDetails;
    verified: boolean;
    rating: number;
    reviews: Review[];
}

// Buyer specific fields
export interface Buyer extends User {
    role: UserRole.BUYER;
    purchases: Purchase[];
}

// Contact details interface
export interface ContactDetails {
    phoneNumber: string;
    instagram?: string;
    wechat?: string;
}

// Service interface
export interface Service {
    id: string;
    sellerId: string;
    title: string;
    description: string;
    price: number;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
}

// Review interface
export interface Review {
    id: string;
    buyerId: string;
    sellerId: string;
    serviceId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

// Purchase interface
export interface Purchase {
    id: string;
    buyerId: string;
    sellerId: string;
    serviceIds: string[];
    totalAmount: number;
    status: PurchaseStatus;
    createdAt: string;
    updatedAt: string;
}

// Purchase status
export enum PurchaseStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}

// ServiceRequest interface
export interface ServiceRequest {
    id: string;
    buyerId: string;
    sellerId: string;
    services: Service[];
    totalAmount: number;
    status: PurchaseStatus;
    createdAt: string;
    updatedAt: string;
}

// Payment interface
export interface Payment {
    id: string;
    purchaseId: string;
    amount: number;
    paymentMethod: string;
    status: PaymentStatus;
    createdAt: string;
}

// Payment status
export enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    REFUNDED = "refunded"
}

// Auth related types
export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

// API Response types
export interface ApiResponse<T> {
    status: "success" | "error";
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
}