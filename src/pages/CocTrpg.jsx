import { motion } from 'framer-motion'
import { useState } from 'react'
import agias from '../assets/cocgame/agias.jpg'
import agiasSm from '../assets/cocgame/agias-sm.jpg'
import borderline from '../assets/cocgame/borderline.jpg'
import borderlineSm from '../assets/cocgame/borderline-sm.png'
import kagura from '../assets/cocgame/kagura.jpg'
import kaguraSm from '../assets/cocgame/kagura-sm.jpg'
import magura from '../assets/cocgame/magura.jpg'
import maguraSm from '../assets/cocgame/magura-sm.jpg'
import worldModel from '../assets/cocgame/world-model.png'

const CocTrpg = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryItems = [
    {
      id: 1,
      name: '忘却之地',
      englishName: 'Lost Space',
      image: agias,
      imageSm: agiasSm,
      citation: 'https://booth.pm/ja/items/1204615',
      players: '2~5 people',
      keywords: 'CoC Adv. Battle Sandbox. 3-Chapter'
    },
    {
      id: 2,
      name: '最果ての境界線',
      englishName: 'Enlightening the borderline',
      image: borderline,
      imageSm: borderlineSm,
      citation: null,
      players: '2~4 people',
      keywords: '異世界 SciFiction Science and Democracy Customized Rules'
    },
    {
      id: 3,
      name: '神楽島',
      englishName: 'Kagura-Island',
      image: kagura,
      imageSm: kaguraSm,
      citation: 'https://kozushima.com/',
      players: '3~4 people',
      keywords: 'PvP, murder mystery, Travel in Japan, Fake folklore'
    },
    {
      id: 4,
      name: '常闇の箱',
      englishName: 'Dark Train',
      image: magura,
      imageSm: maguraSm,
      citation: 'https://seesaawiki.jp/trpgyarouzu/d/%A1%D8%BE%EF%B0%C7%A4%CE%C8%A2%A1%D9',
      players: '2~ People',
      keywords: 'beginner, SandBox, Japansese CoC, Train'
    }
  ]

  const openImageModal = (image) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const handleCitationClick = (citation) => {
    if (citation) {
      window.open(citation, '_blank')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="coc-trpg-container"
    >
      <div className="coc-page-wrapper">
        <div className="game-header">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="game-title"
          >
            TRPG x World Model
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            TRPG Game Gallery
          </motion.p>
        </div>

        <div className="game-content">

          
          <motion.section 
              className="game-info world-model-section"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
            <div className="world-model-content">
              <div className="world-model-text">
                <p>
                  TRPG x World Model is a concept of collaboration between TRPG and AI LLM-Based World Model. We are exploring the potential of TRPG and World Model to create a new way to play games.
                </p>
                
                <div className="concept-details">
                  <h3>1. Game World Schema</h3>
                  <p>
                    Our system uses a structured Game World Schema to define game rules, entities, and relationships.
                  </p>

                  <h3>2. AI-based LLM-to-GameWorld Engine</h3>
                  <p>
                    The AI-based LLM-to-GameWorld engine acts as a translator, converting natural language descriptions and player actions into structured game state updates, enabling seamless communication between players and the game world.
                  s</p>
                </div>
              </div>
              
              <div className="world-model-image">
                <img 
                  src={worldModel} 
                  alt="TRPG x World Model Architecture" 
                  className="world-model-img"
                />
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="game-info"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2>About the Game</h2>
            <p>
              Welcome to our gallery showcasing CoC Game Introductions. All games are prepared by the site owner in special editions. Besides the original stories written by Niko Huang, other stories can be found through the citation links.
            </p>
            <p>
              We will open-source the original stories once they are ready (Others' stories can be found through the citation links individually). We will also provide TBD demos as online game-play in the future(Only for the Original Stories).
            </p>
          </motion.section>

          <motion.section 
            className="game-gallery"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2>Game Gallery</h2>
            <div className="gallery-grid">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="gallery-card"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className="gallery-image-container"
                    onClick={() => openImageModal(item)}
                  >
                    <img 
                      src={item.imageSm} 
                      alt={item.name}
                      className="gallery-image"
                    />
                    <div className="gallery-overlay">
                      <span className="view-text">Click to View</span>
                    </div>
                  </div>
                  <div className="gallery-info">
                    <h3 className="gallery-english-name">{item.englishName}</h3>
                    <h4 className="gallery-japanese-name">{item.name}</h4>
                    <div className="game-details">
                      <p className="player-count">Player: {item.players}</p>
                      <p className="keywords">Keyword: {item.keywords}</p>
                    </div>
                    {item.citation && (
                      <button
                        className="citation-button"
                        onClick={() => handleCitationClick(item.citation)}
                      >
                        View Reference
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="game-features"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2>Game Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Character Creation</h3>
                <p>Create and manage your investigator</p>
              </div>
              <div className="feature-card">
                <h3>Campaigns</h3>
                <p>Join ongoing or upcoming campaigns</p>
              </div>
              <div className="feature-card">
                <h3>Resources</h3>
                <p>Access game materials and guides</p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="customized-rules"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2>Demos</h2>
            <div className="tbd-content">
              <p>TBD</p>
            </div>
          </motion.section>

        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          className="image-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeImageModal}
        >
          <motion.div
            className="image-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeImageModal}>
              ×
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.name}
              className="modal-image"
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CocTrpg 