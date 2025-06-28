import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import mechanicalDesign from '../assets/software/mechanical-design.png'
import simulation2shape from '../assets/software/simulation2shape.png'
import demoTebp from '../assets/software/demo-tebp.jpg'
import stableTrajectory from '../assets/software/stable-trajectory.gif'
import akbAutovoter from '../assets/software/akb-autovoter.gif'
import studio from '../assets/software/studio.jpeg'
import icon from '../assets/icon.jpg'

const SoftwareSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const softwareProjects = [
    {
      id: 'mechanical-design',
      title: 'iPhone Touch System with x-y plane',
      titleMobile: 'iPhone Touch System',
      image: mechanicalDesign,
      description: 'Concept sketch of mechanical design demonstration for x-y plane touching system',
      descriptionMobile: 'Mechanical design for x-y plane touching system'
    },
    {
      id: 'simulation2shape',
      title: 'Sim2Shape',
      titleMobile: 'Sim2Shape',
      image: simulation2shape,
      description: 'Concept sketch of physical shape morphing for 3D Printing',
      descriptionMobile: 'Physical shape morphing for 3D Printing'
    },
    {
      id: 'demo-tebp',
      title: 'Demo-TEBP (DeepFracture)',
      titleMobile: 'Demo-TEBP',
      image: demoTebp,
      description: 'Deep learning based fracture animation (The Eye of Breaking Perception.)',
      descriptionMobile: 'Deep learning based fracture animation',
      url: 'https://github.com/nikoloside/TEBP'
    },
    {
      id: 'trajectory',
      title: 'Trajectory Optimization',
      titleMobile: 'Trajectory Optimization',
      image: stableTrajectory,
      description: 'Trajectory analysis and visualization system via K-means per frame and Kalman Filter Optimization',
      descriptionMobile: 'Trajectory analysis with K-means and Kalman Filter'
    },
    {
      id: 'akb-autovoter',
      title: 'AKB-Autovoter',
      titleMobile: 'AKB-Autovoter',
      image: akbAutovoter,
      description: 'Automated voting system for AKB Sousenkyo pipeline',
      descriptionMobile: 'Automated voting system for AKB',
      url: 'https://www.youtube.com/@%E3%83%94%E3%83%AA%E8%BE%9B%E5%BC%A5'
    },
    {
      id: 'studio',
      title: 'Studio-Spatial Visualizer',
      titleMobile: 'Studio Visualizer',
      image: studio,
      description: 'Spatial analytics and visualization metrics system',
      descriptionMobile: 'Spatial analytics and visualization system'
    }
  ]

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === softwareProjects.length - 1 ? 0 : prevIndex + 1
      )
    }, 8000) // Change slide every 8 seconds

    return () => clearInterval(timer)
  }, [softwareProjects.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === softwareProjects.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? softwareProjects.length - 1 : prevIndex - 1
    )
  }

  const currentProject = softwareProjects[currentIndex]
  const displayTitle = isMobile ? currentProject.titleMobile : currentProject.title
  const displayDescription = isMobile ? currentProject.descriptionMobile : currentProject.description

  return (
    <section className="software-slider-section">
      <h2>Software Projects</h2>
      <div className="software-slider-container">
        <button className="slider-arrow slider-arrow-left" onClick={prevSlide}>
          ‹
        </button>
        
        <div className="slider-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="slider-item"
            >
              <div className="slider-image-container">
                {currentProject.url ? (
                  <a 
                    href={currentProject.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'block', height: '100%' }}
                  >
                    <img 
                      src={currentProject.image} 
                      alt={displayTitle}
                      className="slider-image"
                      onError={(e) => {
                        e.target.src = icon // Fallback to existing icon
                      }}
                    />
                  </a>
                ) : (
                  <img 
                    src={currentProject.image} 
                    alt={displayTitle}
                    className="slider-image"
                    onError={(e) => {
                      e.target.src = icon // Fallback to existing icon
                    }}
                  />
                )}
              </div>
              <div className="slider-info">
                <h3>{displayTitle}</h3>
                <p>{displayDescription}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="slider-arrow slider-arrow-right" onClick={nextSlide}>
          ›
        </button>
      </div>

      <div className="slider-dots">
        {softwareProjects.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default SoftwareSlider 