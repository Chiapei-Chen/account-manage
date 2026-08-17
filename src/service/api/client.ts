import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    interviewerName: import.meta.env.VITE_INTERVIEWER_NAME,
  },
})

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean }

// 多個請求同時收到 401 時，讓它們共用同一個刷新流程，避免打出多次 refresh
let refreshPromise: Promise<string | null> | null = null

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const authStore = useAuthStore()
    const originalRequest = error.config as RetryableRequestConfig | undefined

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true
    refreshPromise ??= authStore.refreshAccessToken().finally(() => {
      refreshPromise = null
    })

    const newToken = await refreshPromise
    if (!newToken) {
      authStore.logout()
      router.replace({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
      return Promise.reject(error)
    }

    originalRequest.headers.set('Authorization', `Bearer ${newToken}`)
    return apiClient(originalRequest)
  },
)

export default apiClient
