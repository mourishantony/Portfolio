import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { projectsAPI } from '../../services/api'

const ProjectsManager = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    github_link: '',
    demo_video_link: '',
    live_link: '',
    thumbnail: '',
    order: 0,
    featured: false,
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll()
      setProjects(response.data)
    } catch (error) {
      toast.error('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      github_link: '',
      demo_video_link: '',
      live_link: '',
      thumbnail: '',
      order: 0,
      featured: false,
    })
    setEditingId(null)
    setShowForm(false)
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
        await projectsAPI.update(editingId, payload)
        toast.success('Project updated!')
      } else {
        await projectsAPI.create(payload)
        toast.success('Project created!')
      }
      fetchProjects()
      resetForm()
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const handleEdit = (project) => {
    setFormData({
      ...project,
      technologies: project.technologies.join(', '),
    })
    setEditingId(project.id || project._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await projectsAPI.delete(id)
      toast.success('Project deleted!')
      fetchProjects()
    } catch (error) {
      toast.error('Delete failed')
    }
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div className="space-y-6">
      {/* Add Button */}
      {!showForm && (
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold"
        >
          <FaPlus /> <span>Add Project</span>
        </motion.button>
      )}

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Project</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Technologies (comma-separated) *</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    required
                    placeholder="Python, FastAPI, MongoDB"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">GitHub Link *</label>
                  <input
                    type="url"
                    name="github_link"
                    value={formData.github_link}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Demo Video Link (Drive) *</label>
                  <input
                    type="url"
                    name="demo_video_link"
                    value={formData.demo_video_link}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Live Link</label>
                  <input
                    type="url"
                    name="live_link"
                    value={formData.live_link}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-white">Featured Project</label>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" /> Save
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id || project._id}
            layout
            className="glass rounded-xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                {project.featured && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Featured</span>}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 hover:bg-white/10 rounded"
                >
                  <FaEdit className="text-cyan-400" />
                </button>
                <button
                  onClick={() => handleDelete(project.id || project._id)}
                  className="p-2 hover:bg-white/10 rounded"
                >
                  <FaTrash className="text-red-400" />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.slice(0, 3).map((tech, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsManager
