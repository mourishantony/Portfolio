import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const ADMIN_SECRET_PATH = import.meta.env.VITE_ADMIN_SECRET_PATH || 'admin-secret'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = `/${ADMIN_SECRET_PATH}`
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (username, password) =>
    api.post(`/${ADMIN_SECRET_PATH}/login`, { username, password }),
  verify: () => api.get(`/${ADMIN_SECRET_PATH}/verify`),
}

// Profile API
export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
}

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
}

// Hackathons API
export const hackathonsAPI = {
  getAll: () => api.get('/hackathons'),
  getOne: (id) => api.get(`/hackathons/${id}`),
  create: (data) => api.post('/hackathons', data),
  update: (id, data) => api.put(`/hackathons/${id}`, data),
  delete: (id) => api.delete(`/hackathons/${id}`),
}

// Skills API
export const skillsAPI = {
  getAll: () => api.get('/skills'),
  getOne: (id) => api.get(`/skills/${id}`),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
}

// Certificates API
export const certificatesAPI = {
  getAll: () => api.get('/certificates'),
  getOne: (id) => api.get(`/certificates/${id}`),
  create: (data) => api.post('/certificates', data),
  update: (id, data) => api.put(`/certificates/${id}`, data),
  delete: (id) => api.delete(`/certificates/${id}`),
}

// Contact API
export const contactAPI = {
  send: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markRead: (id) => api.patch(`/contact/${id}/read`),
  delete: (id) => api.delete(`/contact/${id}`),
}

export default api
