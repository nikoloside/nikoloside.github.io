import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import MainPage from './pages/MainPage'
import Demos from './pages/Demos'
import CocTrpg from './pages/CocTrpg'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/coc-trpg" element={<CocTrpg />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App