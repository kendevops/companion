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
            console.warn('Invalid filename provided to getFileUrl:', filename);
            return '';
        }

        // If it's already a full URL, return as is
        if (filename.startsWith('http://') || filename.startsWith('https://')) {
            return filename;
        }

        // If it already starts with /uploads, prepend base URL (without /api)
        if (filename.startsWith('/uploads')) {
            const baseUrl = API_URL.replace('/api', '');
            return `${baseUrl}${filename}`;
        }

        // If it's just a filename, construct the full path
        const baseUrl = API_URL.replace('/api', '');
        return `${baseUrl}/uploads/${filename}`;
      }
  };

export default UploadsService;