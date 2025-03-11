// config.js
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost'; // Default value if not set
export const apiPort = process.env.REACT_APP_API_PORT || 3000; // Default value if not set
export const allowedUserSub = process.env.REACT_APP_ALLOWED_USER_SUB;
export const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const baseUrl = `${apiUrl}:${apiPort}`;


