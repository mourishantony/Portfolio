import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaPhone, FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { HiLocationMarker } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { contactAPI } from '../../services/api'

const Contact = ({ profile }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await contactAPI.send(formData)
      toast.success('Message sent successfully! I will get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 text-lg">
            Let's discuss your next project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                Feel free to reach out to me through any of the following channels. I'm always open to discussing new projects and opportunities.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <motion.a
                href={`mailto:${profile?.email}`}
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4 p-4 glass rounded-lg hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-semibold">{profile?.email}</p>
                </div>
              </motion.a>

              {/* Phone */}
              {profile?.phone && (
                <motion.a
                  href={`tel:${profile.phone}`}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 glass rounded-lg hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-semibold">{profile.phone}</p>
                  </div>
                </motion.a>
              )}

              {/* WhatsApp */}
              {profile?.whatsapp && (
                <motion.a
                  href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 glass rounded-lg hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">WhatsApp</p>
                    <p className="text-white font-semibold">{profile.whatsapp}</p>
                  </div>
                </motion.a>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-gray-400 mb-4">Follow me on social media</p>
              <div className="flex space-x-4">
                {profile?.github && (
                  <motion.a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-12 h-12 flex items-center justify-center glass rounded-full hover:bg-white/10 transition-all"
                  >
                    <FaGithub className="text-2xl" />
                  </motion.a>
                )}
                {profile?.linkedin && (
                  <motion.a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-12 h-12 flex items-center justify-center glass rounded-full hover:bg-white/10 transition-all"
                  >
                    <FaLinkedin className="text-2xl text-blue-500" />
                  </motion.a>
                )}
                {profile?.twitter && (
                  <motion.a
                    href={profile.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-12 h-12 flex items-center justify-center glass rounded-full hover:bg-white/10 transition-all"
                  >
                    <FaXTwitter className="text-2xl" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2 font-semibold">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Mourish Antony C"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2 font-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white mb-2 font-semibold">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2 font-semibold">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
