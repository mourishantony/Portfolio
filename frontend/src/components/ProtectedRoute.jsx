import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const adminPath = import.meta.env.VITE_ADMIN_SECRET_PATH || 'admin-secret'

  if (!isAuthenticated) {
    return <Navigate to={`/${adminPath}`} replace />
  }

  return children
}

export default ProtectedRoute
