/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import AuthService from '@/services/auth-service';

export function useForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const requestPasswordReset = async (email: string) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await AuthService.forgotPassword({ email });
            setSuccess('If your email is registered, you will receive a password reset link.');
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const resetStates = () => {
        setError(null);
        setSuccess(null);
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        success,
        requestPasswordReset,
        resetStates,
    };
}

export function useResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const resetPassword = async (token: string, password: string) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await AuthService.resetPassword({ token, password });
            setSuccess('Your password has been reset successfully. You can now log in with your new password.');
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const resetStates = () => {
        setError(null);
        setSuccess(null);
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        success,
        resetPassword,
        resetStates,
    };
}