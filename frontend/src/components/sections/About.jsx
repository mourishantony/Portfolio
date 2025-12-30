import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { useState } from 'react'

const About = ({ profile }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [imageError, setImageError] = useState(false)

  return (
    <section id="about" className="min-h-screen py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image/Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full glass overflow-hidden border-4 border-cyan-500/30">
                {profile?.profile_image && !imageError ? (
                  <img
                    src={profile.profile_image}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={() => {
                      console.error('Failed to load image:', profile.profile_image)
                      setImageError(true)
                    }}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500">
                    <span className="text-8xl font-bold text-white">
                      {profile?.name?.charAt(0) || 'D'}
                    </span>
                  </div>
                )}
              </div>
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-20 h-20 border-4 border-purple-500 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-pink-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              {profile?.title || 'Backend Developer'}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {profile?.bio || 'Passionate backend developer with expertise in building scalable and efficient systems.'}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-6">
              <a
                href={`mailto:${profile?.email}`}
                className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <FaEnvelope className="text-cyan-500" />
                <span>{profile?.email}</span>
              </a>
              <a
                href={`tel:${profile?.phone}`}
                className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <FaPhone className="text-cyan-500" />
                <span>{profile?.phone}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-6">
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

            {/* Resume Download */}
            {profile?.resume_link && (
              <motion.a
                href={profile.resume_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Download Resume
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
