import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Skills = ({ skills }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    const category = skill.category || 'Other'
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {})

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <section id="skills" className="min-h-screen py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 text-lg">
            Technologies I work with
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(groupedSkills || {}).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">{category}</h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id || skill._id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="glass rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                      <span className="text-cyan-400 font-bold">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.proficiency}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {(!skills || skills.length === 0) && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No skills listed yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills
