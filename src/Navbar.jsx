import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import icon from './assets/icon.jpg'

const Navbar = () => {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('home')
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        const navbarHeight = 60 // 导航栏高度
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      // If not on main page, navigate to main page with hash
      window.location.href = `/#${sectionId}`
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        const sections = ['home', 'projects', 'about', 'publications']
        const navbarHeight = 60

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i])
          if (section) {
            const rect = section.getBoundingClientRect()
            if (rect.top <= navbarHeight + 100) {
              setActiveSection(sections[i])
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <img src={icon} alt="Logo" className="nav-icon" />
          Niko Huang
        </Link>

        <div className="nav-links">
          <button 
            onClick={() => scrollToSection('home')} 
            className={location.pathname === '/' && activeSection === 'home' ? 'active' : ''}
          >
            Home
          </button>
          
          <div className="nav-dropdown">
            <button 
              className={`nav-button ${location.pathname === '/' && activeSection === 'projects' ? 'active' : ''}`}
              onMouseEnter={() => setIsProjectsOpen(true)}
              onMouseLeave={() => setIsProjectsOpen(false)}
            >
              Projects
            </button>
            <div 
              className={`dropdown-content ${isProjectsOpen ? 'show' : ''}`}
              onMouseEnter={() => setIsProjectsOpen(true)}
              onMouseLeave={() => setIsProjectsOpen(false)}
            >
              <button onClick={() => scrollToSection('projects')}>All Projects</button>
              <a href="http://nikoloside.graphics/deepfracture" target="_blank" rel="noopener noreferrer">DeepFracture</a>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection('about')} 
            className={location.pathname === '/' && activeSection === 'about' ? 'active' : ''}
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('publications')} 
            className={location.pathname === '/' && activeSection === 'publications' ? 'active' : ''}
          >
            Publications
          </button>
          <Link 
            to="/demos" 
            className={`${location.pathname === '/demos' ? 'active' : ''} disabled-link`}
            onClick={(e) => e.preventDefault()}
            style={{ pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed' }}
          >
            Demos
          </Link>
          <Link to="/coc-trpg" className={location.pathname === '/coc-trpg' ? 'active' : ''}>
            CoC TRPG
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar