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
        if (filename.startsWith('http')) {
            return filename;
        }

        return `${API_URL}${filename}`;
    }
};

export default UploadsService;