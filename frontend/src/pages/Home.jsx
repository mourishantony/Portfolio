import { useEffect, useState } from 'react'
import StarBackground from '../components/StarBackground'
import Navbar from '../components/Navbar'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import Hackathons from '../components/sections/Hackathons'
import Certificates from '../components/sections/Certificates'
import Contact from '../components/sections/Contact'
import { profileAPI, projectsAPI, skillsAPI, hackathonsAPI, certificatesAPI } from '../services/api'

const Home = () => {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [hackathons, setHackathons] = useState([])
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [profileRes, projectsRes, skillsRes, hackathonsRes, certificatesRes] = await Promise.all([
        profileAPI.getProfile(),
        projectsAPI.getAll(),
        skillsAPI.getAll(),
        hackathonsAPI.getAll(),
        certificatesAPI.getAll(),
      ])

      setProfile(profileRes.data)
      setProjects(projectsRes.data)
      setSkills(skillsRes.data)
      setHackathons(hackathonsRes.data)
      setCertificates(certificatesRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StarBackground />
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <StarBackground />
      <Navbar profile={profile} />
      <main className="pt-16">
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Hackathons hackathons={hackathons} />
        <Certificates certificates={certificates} />
        <Contact profile={profile} />
      </main>
      
      {/* Footer */}
      <footer className="glass py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {profile?.name || 'Backend Developer'}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with React, FastAPI, and MongoDB
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
