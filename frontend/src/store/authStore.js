import { create } from 'zustand'
import { authAPI } from '../services/api'

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (username, password) => {
    try {
      const response = await authAPI.login(username, password)
      const { access_token } = response.data
      localStorage.setItem('token', access_token)
      set({ token: access_token, isAuthenticated: true })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' }
    }
  },
  
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, isAuthenticated: false })
  },
}))

export default useAuthStore
