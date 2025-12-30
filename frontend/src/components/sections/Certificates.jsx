import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa'

const Certificates = ({ certificates }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <section id="certificates" className="min-h-screen py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 text-lg">
            Professional credentials and achievements
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates?.map((certificate) => (
            <motion.div
              key={certificate.id || certificate._id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass rounded-xl overflow-hidden group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-green-500/20 to-blue-500/20">
                {certificate.thumbnail ? (
                  <img
                    src={certificate.thumbnail}
                    alt={certificate.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaCertificate className="text-6xl text-green-500 opacity-20" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {certificate.title}
                </h3>
                <p className="text-cyan-400 font-semibold mb-1">{certificate.issuer}</p>
                <p className="text-gray-400 text-sm mb-3">{certificate.date}</p>
                
                {certificate.description && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {certificate.description}
                  </p>
                )}

                {certificate.credential_id && (
                  <p className="text-xs text-gray-500 mb-4">
                    ID: {certificate.credential_id}
                  </p>
                )}

                {/* View Certificate Link */}
                <motion.a
                  href={certificate.certificate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all text-sm font-semibold w-full justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaCertificate />
                  <span>View Certificate</span>
                  <FaExternalLinkAlt className="text-xs" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {(!certificates || certificates.length === 0) && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No certificates available yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Certificates
