import axios from 'axios'

// Direct fallback to your verified live Render base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-rjze.onrender.com'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor to add auth token for admin routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Contact API - Matches backend endpoint mapping directly
export const sendContactMessage = (data) => api.post('/api/contact', data)

// Resume API - Structured to match backend asset routing
export const downloadResume = () =>
  api.get('/api/resume/download', { responseType: 'blob' })

export const getDownloadCount = () => api.get('/api/resume/count')

// Admin API
export const adminLogin = (credentials) => api.post('/api/admin/login', credentials)
export const getMessages = () => api.get('/api/admin/messages')
export const deleteMessage = (id) => api.delete(`/api/admin/messages/${id}`)
export const markMessageRead = (id) => api.patch(`/api/admin/messages/${id}/read`)
export const getStats = () => api.get('/api/admin/stats')

export default api