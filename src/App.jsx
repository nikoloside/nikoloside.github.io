import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './Navbar'
import MainPage from './pages/MainPage'
import Demos from './pages/Demos'
import CocTrpg from './pages/CocTrpg'
import './App.css'

// Google Analytics page tracking component
function PageTracker() {
  const location = useLocation()
  
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-8FJ3FS3HFB', {
        page_path: location.pathname + location.search
      })
    }
  }, [location])
  
  return null
}

function App() {
  return (
    <Router>
      <PageTracker />
      <div className="app">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/coc-trpg" element={<CocTrpg />} />
            <Route path="/:section" element={<MainPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App