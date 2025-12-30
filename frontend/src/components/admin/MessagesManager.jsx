// Messages inbox component
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { contactAPI } from '../../services/api'

const MessagesManager = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll()
      setMessages(response.data)
    } catch (error) {
      toast.error('Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkRead = async (id) => {
    try {
      await contactAPI.markRead(id)
      fetchMessages()
    } catch (error) {
      toast.error('Failed to mark as read')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await contactAPI.delete(id)
      toast.success('Message deleted!')
      setSelectedMessage(null)
      fetchMessages()
    } catch (error) {
      toast.error('Delete failed')
    }
  }

  const handleMessageClick = (message) => {
    setSelectedMessage(message)
    if (!message.read) {
      handleMarkRead(message.id || message._id)
    }
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Messages List */}
      <div className="md:col-span-1 space-y-2">
        <div className="glass rounded-lg p-4 mb-4">
          <h3 className="text-lg font-bold text-white">
            Inbox ({unreadCount} unread)
          </h3>
        </div>
        
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {messages.map((message) => (
            <motion.div
              key={message.id || message._id}
              onClick={() => handleMessageClick(message)}
              whileHover={{ scale: 1.02 }}
              className={`glass rounded-lg p-4 cursor-pointer ${
                selectedMessage?.id === message.id || selectedMessage?._id === message._id
                  ? 'border-2 border-cyan-500'
                  : ''
              } ${!message.read ? 'bg-cyan-500/10' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {message.read ? (
                    <FaEnvelopeOpen className="text-gray-400" />
                  ) : (
                    <FaEnvelope className="text-cyan-400" />
                  )}
                  <p className="font-semibold text-white">{message.name}</p>
                </div>
              </div>
              <p className="text-sm text-cyan-400 mb-1">{message.subject}</p>
              <p className="text-xs text-gray-400">
                {new Date(message.created_at).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>

        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No messages yet
          </div>
        )}
      </div>

      {/* Message Detail */}
      <div className="md:col-span-2">
        {selectedMessage ? (
          <div className="glass rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedMessage.subject}
                </h2>
                <p className="text-cyan-400">{selectedMessage.name}</p>
                <p className="text-sm text-gray-400">{selectedMessage.email}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(selectedMessage.id || selectedMessage._id)}
                className="p-2 hover:bg-red-500/20 rounded text-red-400"
              >
                <FaTrash />
              </button>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>

            <div className="mt-6 flex space-x-4">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Reply via Email
              </a>
              <a
                href={`https://wa.me/${selectedMessage.phone?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="glass rounded-xl p-20 text-center">
            <FaEnvelope className="text-6xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              Select a message to view details
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagesManager
