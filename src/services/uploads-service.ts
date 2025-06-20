import api from './api';
import API_URL from './api-config';

const UploadsService = {
    // Upload profile picture (seller only)
    async uploadProfilePicture(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return api.post('/uploads/profile-picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // Remove profile picture (seller only)
    async removeProfilePicture(fileUrl: string) {
        return api.delete('/uploads/profile-picture', {
            data: { fileUrl },
        });
    },

    // Get full URL for uploaded file
    getFileUrl(filename: string) {
        // Handle null, undefined, or empty filename
        if (!filename || typeof filename !== 'string') {
            return '';
        }

        // If it's already a full URL, return as is
        if (filename.startsWith('http://') || filename.startsWith('https://')) {
            return filename;
        }

        // Get the base URL without /api
        const baseUrl = API_URL.replace('/api', '');

        // If filename starts with /uploads, use it directly
        if (filename.startsWith('/uploads/')) {
            return `${baseUrl}${filename}`;
        }

        // If it's just a filename, construct the full path
        return `${baseUrl}/uploads/${filename}`;
    }
};

export default UploadsService;