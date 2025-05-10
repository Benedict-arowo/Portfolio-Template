"use client"

import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api-client"

export function useApi() {
  const { isAuthenticated, token } = useAuth()

  // Check if user is authenticated before making requests
  const checkAuth = () => {
    if (!isAuthenticated || !token) {
      throw new Error("Authentication required")
    }
  }

  return {
    // Authenticated API methods
    auth: {\
      get: async <T>(url: string, params?: object): Promise<T> => {
        checkAuth()
        return api.get<T>(url, { params })
      },
      
      post: async <T>(url: string, data?: object): Promise<T> => {
        checkAuth()
        return api.post<T>(url, data)
      },
      
      put
  : async <T>(url: string, data?: object): Promise<T> =>
  checkAuth()
  return api.put<T>(url, data)
  ,
      
      patch: async <T>(url: string, data?: object): Promise<T> =>
  checkAuth()
  return api.patch<T>(url, data)
  ,
      
      delete: async <T>(url: string): Promise<T> =>
  checkAuth()
  return api.delete<T>(url)
  ,
}
,
    
    // Public API methods (no auth required)
    public:
{
  get: api.get, post
  : api.post,
      put: api.put,
      patch: api.patch,
      delete: api.delete,
}
,
    
    // Check if user is authenticated
    isAuthenticated,
  }
}
