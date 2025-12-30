import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTrophy, FaExternalLinkAlt } from 'react-icons/fa'

const Hackathons = ({ hackathons }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  }

  const getPositionColor = (position) => {
    if (position.toLowerCase().includes('1st') || position.toLowerCase().includes('winner')) {
      return 'from-yellow-500 to-orange-500'
    } else if (position.toLowerCase().includes('2nd') || position.toLowerCase().includes('runner')) {
      return 'from-gray-400 to-gray-600'
    } else if (position.toLowerCase().includes('3rd')) {
      return 'from-orange-600 to-orange-800'
    }
    return 'from-purple-500 to-pink-500'
  }

  return (
    <section id="hackathons" className="min-h-screen py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Hackathon Victories
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 text-lg">
            Competitive programming achievements
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {hackathons?.map((hackathon) => (
            <motion.div
              key={hackathon.id || hackathon._id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="md:flex">
                {/* Thumbnail/Image */}
                <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  {hackathon.thumbnail ? (
                    <img
                      src={hackathon.thumbnail}
                      alt={hackathon.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaTrophy className="text-8xl text-yellow-500 opacity-20" />
                    </div>
                  )}
                  {/* Position Badge */}
                  <div className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${getPositionColor(hackathon.position)} rounded-full font-bold shadow-lg`}>
                    {hackathon.position}
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{hackathon.name}</h3>
                      <p className="text-cyan-400 font-semibold">{hackathon.project_title}</p>
                      <p className="text-gray-400 text-sm mt-1">{hackathon.date}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{hackathon.description}</p>
                  <p className="text-gray-400 text-sm mb-4">{hackathon.achievement_details}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hackathon.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Certificate Link */}
                  {hackathon.certificate_link && (
                    <motion.a
                      href={hackathon.certificate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all text-sm font-semibold"
                    >
                      <FaTrophy />
                      <span>View Certificate</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {(!hackathons || hackathons.length === 0) && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No hackathon achievements yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Hackathons
