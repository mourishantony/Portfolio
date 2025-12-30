import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt, FaPlay, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const Projects = ({ projects }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedProject, setSelectedProject] = useState(null)

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="min-h-screen py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 text-lg">
            Building powerful backend solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects?.map((project) => (
            <motion.div
              key={project.id || project._id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="glass rounded-xl overflow-hidden group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl opacity-20">💻</span>
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs bg-white/10 text-cyan-400 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-3">
                  {project.github_link && (
                    <motion.a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all text-sm"
                    >
                      <FaGithub />
                      <span>Code</span>
                    </motion.a>
                  )}
                  {project.demo_video_link && (
                    <motion.a
                      href={project.demo_video_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all text-sm"
                    >
                      <FaPlay />
                      <span>Demo</span>
                    </motion.a>
                  )}
                  {project.live_link && (
                    <motion.a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all text-sm"
                    >
                      <FaExternalLinkAlt />
                      <span>Live</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {(!projects || projects.length === 0) && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No projects available yet. Check back soon!</p>
          </div>
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center glass rounded-full hover:bg-white/20 transition-all"
                >
                  <FaTimes className="text-xl" />
                </button>

                {/* Thumbnail */}
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                  {selectedProject.thumbnail ? (
                    <img
                      src={selectedProject.thumbnail}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-9xl opacity-20">💻</span>
                    </div>
                  )}
                  {selectedProject.featured && (
                    <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm font-bold">
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h2>

                {/* Full Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 whitespace-pre-line">
                  {selectedProject.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm bg-white/10 text-cyan-400 rounded-full border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.github_link && (
                    <motion.a
                      href={selectedProject.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-all"
                    >
                      <FaGithub size={20} />
                      <span>View Code</span>
                    </motion.a>
                  )}
                  {selectedProject.demo_video_link && (
                    <motion.a
                      href={selectedProject.demo_video_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                      <FaPlay size={18} />
                      <span>Watch Demo</span>
                    </motion.a>
                  )}
                  {selectedProject.live_link && (
                    <motion.a
                      href={selectedProject.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                      <FaExternalLinkAlt size={18} />
                      <span>View Live</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects
