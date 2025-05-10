import axios from "axios";

// Create a custom axios instance
const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
	(config) => {
		// Get token from localStorage
		const token = localStorage.getItem("auth-token");

		// If token exists, add it to request headers
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Handle token expiration (401 Unauthorized)
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// In a real app, you would refresh the token here
				// For demo purposes, we'll just redirect to login
				if (typeof window !== "undefined") {
					localStorage.removeItem("auth-token");
					window.location.href = "/login";
				}

				return Promise.reject(error);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}

		// Handle other errors
		return Promise.reject(error);
	}
);

// Helper functions for common API operations
export const api = {
	// GET request
	get: async <T>(url: string, params?: object): Promise<T> => {
		const response = await apiClient.get<T>(url, { params: params });
		return response.data;
	},

	// POST request
	post: async <T>(url: string, data?: object): Promise<T> => {
		const response = await apiClient.post<T>(url, data);
		return response.data;
	},
	// PUT request
	put: async <T>(url: string, data?: object): Promise<T> => {
		const response = await apiClient.put<T>(url, data);
		return response.data;
	},
	// PATCH request
	patch: async <T>(url: string, data?: object): Promise<T> => {
		const response = await apiClient.patch<T>(url, data);
		return response.data;
	},
	// DELETE request
	delete: async <T>(url: string): Promise<T> => {
		const response = await apiClient.delete<T>(url);
		return response.data;
	},
};

export default apiClient;
