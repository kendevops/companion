// const API_URL = import.meta.env.VITE_API_URL ?? 'https://companion-backend-production.up.railway.app/api';

// export default API_URL;


const API_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'production'
        ? 'https://companion-backend-production.up.railway.app/api'
        : 'http://localhost:3001/api');

export default API_URL;