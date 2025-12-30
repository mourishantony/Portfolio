import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { profileAPI } from '../../services/api'

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    whatsapp: '',
    github: '',
    linkedin: '',
    twitter: '',
    resume_link: '',
    profile_image: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.getProfile()
      setProfile(response.data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await profileAPI.updateProfile(profile)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-20">Loading...</div>
  }

  return (
    <div className="glass rounded-xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Manage Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white mb-2 font-semibold">Full Name *</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">Title *</label>
            <input
              type="text"
              name="title"
              value={profile.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="Backend Developer"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-white mb-2 font-semibold">Bio *</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">Email *</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">WhatsApp *</label>
            <input
              type="text"
              name="whatsapp"
              value={profile.whatsapp}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">GitHub URL</label>
            <input
              type="url"
              name="github"
              value={profile.github}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">Twitter URL</label>
            <input
              type="url"
              name="twitter"
              value={profile.twitter}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="https://twitter.com/username"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">Resume Link (Google Drive)</label>
            <input
              type="url"
              name="resume_link"
              value={profile.resume_link}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">Profile Image URL</label>
            <input
              type="url"
              name="profile_image"
              value={profile.profile_image}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              placeholder="https://..."
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </motion.button>
      </form>
    </div>
  )
}

export default ProfileManager
