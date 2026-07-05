import axios from 'axios'

// Seamlessly fall back to your live Render API if Vite's client .env isn't loaded yet
const BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-rjze.onrender.com/api'

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

// Contact API
export const sendContactMessage = (data) => api.post('/contact', data)

// Resume API - Perfect with blob response mapping
export const downloadResume = () =>
  api.get('/resume/download', { responseType: 'blob' })

export const getDownloadCount = () => api.get('/resume/count')

// Admin API
export const adminLogin = (credentials) => api.post('/admin/login', credentials)
export const getMessages = () => api.get('/admin/messages')
export const deleteMessage = (id) => api.delete(`/admin/messages/${id}`)
export const markMessageRead = (id) => api.patch(`/admin/messages/${id}/read`)
export const getStats = () => api.get('/admin/stats')

export default api