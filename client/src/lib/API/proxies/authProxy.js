import apiClient, { ApiError } from "../api.client.js";

let accessToken = null;
let failedQueue = [];
let isRefreshing = false;

export const setAccessToken = (token) => {
    accessToken = token;
};

export default async function AuthProxy(path, options = {}) {
    try {
        const headers = new Headers(options.headers);

        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }

        options = { ...options, headers };
        const response = await apiClient(path, options);

        if (response.accessToken) {
            setAccessToken(response.accessToken);
        }

        return response;
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            if (error.erData && error.erData.code === "TOKEN_EXPIRED") {

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                       failedQueue.push({resolve, reject}); 
                    }).then(() => AuthProxy(path, options))
                    .catch((err) => Promise.reject(err));
                }

                isRefreshing = true;

                try {
                    const refreshPath = "/api/auth/refresh";
                    const refreshData = await apiClient(refreshPath, { method: "POST" });
                    
                    setAccessToken(refreshData.accessToken);

                    failedQueue.forEach((promise) => promise.resolve());
                    failedQueue = [];

                    return await AuthProxy(path, options);

                } catch (refreshError) {
                    failedQueue.forEach((prom) => prom.reject(refreshError));
                    failedQueue = [];
                    setAccessToken(null);
                    // window.location.href = "/login";
                    throw refreshError;
                    
                } finally {
                    isRefreshing = false;
                }
            }
        }
        throw error;
    }
}
