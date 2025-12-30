// CRUD component for Certificates
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { certificatesAPI } from '../../services/api'

const CertificatesManager = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    description: '',
    certificate_link: '',
    credential_id: '',
    thumbnail: '',
    order: 0,
  })

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await certificatesAPI.getAll()
      setCertificates(response.data)
    } catch (error) {
      toast.error('Failed to fetch certificates')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...formData, order: parseInt(formData.order) }
    
    try {
      if (editingId) {
        await certificatesAPI.update(editingId, payload)
        toast.success('Certificate updated!')
      } else {
        await certificatesAPI.create(payload)
        toast.success('Certificate created!')
      }
      fetchCertificates()
      resetForm()
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const handleEdit = (certificate) => {
    setFormData(certificate)
    setEditingId(certificate.id || certificate._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this certificate?')) return
    try {
      await certificatesAPI.delete(id)
      toast.success('Certificate deleted!')
      fetchCertificates()
    } catch (error) {
      toast.error('Delete failed')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      date: '',
      description: '',
      certificate_link: '',
      credential_id: '',
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
          <FaPlus /> <span>Add Certificate</span>
        </motion.button>
      )}

      {showForm && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Certificate</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Issuer *</label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
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
                  placeholder="January 2024"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Certificate Link (Drive) *</label>
                <input
                  type="url"
                  value={formData.certificate_link}
                  onChange={(e) => setFormData({ ...formData, certificate_link: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="2"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Credential ID</label>
                <input
                  type="text"
                  value={formData.credential_id}
                  onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
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

      <div className="grid md:grid-cols-3 gap-4">
        {certificates.map((certificate) => (
          <div key={certificate.id || certificate._id} className="glass rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-white">{certificate.title}</h3>
                <p className="text-sm text-cyan-400">{certificate.issuer}</p>
                <p className="text-xs text-gray-400">{certificate.date}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(certificate)} className="p-2 hover:bg-white/10 rounded">
                  <FaEdit className="text-cyan-400" />
                </button>
                <button onClick={() => handleDelete(certificate.id || certificate._id)} className="p-2 hover:bg-white/10 rounded">
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

export default CertificatesManager
