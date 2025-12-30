import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSignOutAlt, FaUser, FaProjectDiagram, FaTrophy, FaCertificate, FaTools, FaEnvelope } from 'react-icons/fa'
import { toast } from 'react-toastify'
import useAuthStore from '../store/authStore'
import StarBackground from '../components/StarBackground'

// Import admin components
import ProfileManager from '../components/admin/ProfileManager'
import ProjectsManager from '../components/admin/ProjectsManager'
import SkillsManager from '../components/admin/SkillsManager'
import HackathonsManager from '../components/admin/HackathonsManager'
import CertificatesManager from '../components/admin/CertificatesManager'
import MessagesManager from '../components/admin/MessagesManager'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const [activeTab, setActiveTab] = useState('profile')

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    const adminPath = import.meta.env.VITE_ADMIN_SECRET_PATH || 'admin-secret'
    navigate(`/${adminPath}`)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'skills', label: 'Skills', icon: FaTools },
    { id: 'hackathons', label: 'Hackathons', icon: FaTrophy },
    { id: 'certificates', label: 'Certificates', icon: FaCertificate },
    { id: 'messages', label: 'Messages', icon: FaEnvelope },
  ]

  return (
    <div className="min-h-screen">
      <StarBackground />
      
      {/* Header */}
      <header className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text-cyan">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all text-sm"
              >
                View Portfolio
              </motion.button>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all text-red-400"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'glass text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon />
                <span>{tab.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && <ProfileManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'skills' && <SkillsManager />}
            {activeTab === 'hackathons' && <HackathonsManager />}
            {activeTab === 'certificates' && <CertificatesManager />}
            {activeTab === 'messages' && <MessagesManager />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AdminDashboard
