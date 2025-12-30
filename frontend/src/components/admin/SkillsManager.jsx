// Similar CRUD component for Skills
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { skillsAPI } from '../../services/api'

const SkillsManager = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    proficiency: 50,
    icon: '',
    order: 0,
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getAll()
      setSkills(response.data)
    } catch (error) {
      toast.error('Failed to fetch skills')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...formData, proficiency: parseInt(formData.proficiency), order: parseInt(formData.order) }
    
    try {
      if (editingId) {
        await skillsAPI.update(editingId, payload)
        toast.success('Skill updated!')
      } else {
        await skillsAPI.create(payload)
        toast.success('Skill created!')
      }
      fetchSkills()
      resetForm()
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const handleEdit = (skill) => {
    setFormData(skill)
    setEditingId(skill.id || skill._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    try {
      await skillsAPI.delete(id)
      toast.success('Skill deleted!')
      fetchSkills()
    } catch (error) {
      toast.error('Delete failed')
    }
  }

  const resetForm = () => {
    setFormData({ category: '', name: '', proficiency: 50, icon: '', order: 0 })
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
          <FaPlus /> <span>Add Skill</span>
        </motion.button>
      )}

      {showForm && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Skill</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Category *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  placeholder="Backend, Frontend, Database..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Proficiency (0-100) *</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  name="proficiency"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Order</label>
                <input
                  type="number"
                  name="order"
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

      <div className="grid md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id || skill._id} className="glass rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-cyan-400">{skill.category}</p>
                <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                <p className="text-sm text-gray-400">{skill.proficiency}%</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(skill)} className="p-2 hover:bg-white/10 rounded">
                  <FaEdit className="text-cyan-400" />
                </button>
                <button onClick={() => handleDelete(skill.id || skill._id)} className="p-2 hover:bg-white/10 rounded">
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

export default SkillsManager
