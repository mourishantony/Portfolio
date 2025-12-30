// CRUD component for Hackathons
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { hackathonsAPI } from '../../services/api'

const HackathonsManager = () => {
  const [hackathons, setHackathons] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    position: '',
    date: '',
    technologies: '',
    project_title: '',
    achievement_details: '',
    certificate_link: '',
    thumbnail: '',
    order: 0,
  })

  useEffect(() => {
    fetchHackathons()
  }, [])

  const fetchHackathons = async () => {
    try {
      const response = await hackathonsAPI.getAll()
      setHackathons(response.data)
    } catch (error) {
      toast.error('Failed to fetch hackathons')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()),
      order: parseInt(formData.order),
    }
    
    try {
      if (editingId) {
        await hackathonsAPI.update(editingId, payload)
        toast.success('Hackathon updated!')
      } else {
        await hackathonsAPI.create(payload)
        toast.success('Hackathon created!')
      }
      fetchHackathons()
      resetForm()
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const handleEdit = (hackathon) => {
    setFormData({
      ...hackathon,
      technologies: hackathon.technologies.join(', '),
    })
    setEditingId(hackathon.id || hackathon._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this hackathon?')) return
    try {
      await hackathonsAPI.delete(id)
      toast.success('Hackathon deleted!')
      fetchHackathons()
    } catch (error) {
      toast.error('Delete failed')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      position: '',
      date: '',
      technologies: '',
      project_title: '',
      achievement_details: '',
      certificate_link: '',
      thumbnail: '',
      order: 0,
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div className="space-y-6">
      {!showForm && (
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold"
        >
          <FaPlus /> <span>Add Hackathon</span>
        </motion.button>
      )}

      {showForm && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Hackathon</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Hackathon Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Position *</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                  placeholder="Winner, 1st Place, etc."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Project Title *</label>
                <input
                  type="text"
                  value={formData.project_title}
                  onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Date *</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  placeholder="December 2024"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="2"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white mb-2">Achievement Details *</label>
                <textarea
                  value={formData.achievement_details}
                  onChange={(e) => setFormData({ ...formData, achievement_details: e.target.value })}
                  required
                  rows="2"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Technologies (comma-separated) *</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Certificate Link (Drive)</label>
                <input
                  type="url"
                  value={formData.certificate_link}
                  onChange={(e) => setFormData({ ...formData, certificate_link: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Thumbnail URL</label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold">
                Save
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-3 bg-gray-600 rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {hackathons.map((hackathon) => (
          <div key={hackathon.id || hackathon._id} className="glass rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{hackathon.name}</h3>
                <p className="text-cyan-400">{hackathon.position} - {hackathon.project_title}</p>
                <p className="text-sm text-gray-400">{hackathon.date}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(hackathon)} className="p-2 hover:bg-white/10 rounded">
                  <FaEdit className="text-cyan-400" />
                </button>
                <button onClick={() => handleDelete(hackathon.id || hackathon._id)} className="p-2 hover:bg-white/10 rounded">
                  <FaTrash className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HackathonsManager
