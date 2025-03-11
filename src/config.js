// config.js
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost'; // Default value if not set
export const apiPort = process.env.REACT_APP_API_PORT; // Default value if not set
export const allowedUserSub = process.env.REACT_APP_ALLOWED_USER_SUB;
export const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

let finalUrl = apiUrl
if (apiPort !== undefined) {
    finalUrl = `${apiUrl}:${apiPort}`;
}

console.info(`Final URL = ${finalUrl}`)
export const baseUrl = finalUrl;


