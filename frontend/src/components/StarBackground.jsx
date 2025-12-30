import { useEffect, useRef } from 'react'
import './StarBackground.css'

const StarBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let stars = []

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    // Create stars
    const initStars = () => {
      stars = []
      const numStars = Math.floor((canvas.width * canvas.height) / 3000)
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          twinkleSpeed: 0.0005 + Math.random() * 0.003,
          direction: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        // Update opacity for twinkling effect
        star.opacity += star.twinkleSpeed * star.direction
        
        if (star.opacity >= 1 || star.opacity <= 0.1) {
          star.direction *= -1
        }

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Add glow for brighter stars
        if (star.opacity > 0.7 && star.radius > 1) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 2
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.3})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="star-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#000000',
      }}
    />
  )
}

export default StarBackground
