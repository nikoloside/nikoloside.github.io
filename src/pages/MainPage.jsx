import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvira } from '@fortawesome/free-brands-svg-icons'
import SoftwareSlider from '../components/SoftwareSlider'
import photo from '../assets/photo.png'
import deepfracture from '../assets/research/deepfracture.png'
import fracture2d from '../assets/research/2d-fracture.png'
import dataDrivenFracture from '../assets/research/data-driven-fracture.png'
import butlrLogo from '../assets/butlr-logo.png'
import denaLogo from '../assets/dena-logo.svg'
import utokyoLogo from '../assets/utokyo-logo.png'
import scienceTokyoLogo from '../assets/science-tokyo-logo.png'

const MainPage = () => {
  const { section } = useParams()
  const homeRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const publicationsRef = useRef(null)
  const [showAllNews, setShowAllNews] = useState(false)

  const newsData = [
    {
      date: "2025.09",
      text: "🏆 Received [VC Research Incentive Awards VC2025](https://visualcomputing.jp/vc2025/award/) for research on \"境界最遠点を正規化基準とする距離場設計による破片形状学習\" (Distance Field Design with Far-From-Boundary Normalization for Fragment Shape Learning)."
    },
    {
      date: "2025.08",
      text: "📄 DeepFracture GitHub has been awarded the [GRSI Replicability Stamp](https://www.replicabilitystamp.org/#https-github-com-nikoloside-tebp) ![Replicability Stamp](https://www.replicabilitystamp.org/logo/Reproducibility-tiny.png), and released the [Hugging Face Model](https://huggingface.co/nikoloside/deepfracture) 🤗 and [Dataset](https://huggingface.co/datasets/nikoloside/break4models) 🔗."
    },
    {
      date: "2025.02",
      text: "📄 DeepFracture paper accepted to [Computer Graphics Forum](https://onlinelibrary.wiley.com/doi/10.1111/cgf.70002) (February 2025)."
    },
    {
      date: "2024.08",
      text: "🎤 Presented poster \"Brittle Fracture Animation with VQ-VAE-Based Generative Method\" at SCA 2024 in Montreal, Canada."
    },
    {
      date: "2023.06",
      text: "📰 Featured in NIKKEI Business Daily article \"Why Chinese AI Talent is in Japanese Startups\" highlighting contributions to Japanese tech ecosystem."
    },
    {
      date: "2023-2024",
      text: "🎓 Awarded JST SpringGX Doctoral Scholarship for Next Generation Researcher Challenging Research Program at University of Tokyo."
    },
    {
      date: "2022.10",
      text: "🏆 Won VC Posters Awards VC+VCC2022 for \"Brittle fracture simulation based on the generation of fracture shapes using 3D-GAN\"."
    },
    {
      date: "2022-2023",
      text: "🌍 Selected for JSPS WINGS-CFS Fellowship - World-leading Innovative Graduate Study Program Codesigning Future Society."
    },
    {
      date: "2021.01",
      text: "🥇 Team member selected as finalist in OpenCV AI Competition 2021 Phase 1 from over 1400 submissions."
    }
  ]

  const displayedNews = showAllNews ? newsData : newsData.slice(0, 3)

  // Function to parse text with Markdown links
  const parseTextWithLinks = (text) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      
      // Add the link
      parts.push(
        <a 
          key={match.index} 
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="news-link"
        >
          {match[1]}
        </a>
      )
      
      lastIndex = match.index + match[0].length
    }
    
    // Add remaining text after the last link
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }
    
    return parts.length > 0 ? parts : text
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '1') {
        homeRef.current?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '2') {
        projectsRef.current?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '3') {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '4') {
        publicationsRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  // Handle section parameter for navigation
  useEffect(() => {
    if (section) {
      const element = document.getElementById(section)
      if (element) {
        setTimeout(() => {
          const navbarHeight = 60
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }, 100) // Small delay to ensure page is loaded
      }
    }
  }, [section])

  return (
    <div className="main-page">
      {/* Home Section */}
      <section id="home" className="section home-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="home-content"
        >
          <div className="home-left">
            <img src={photo} alt="Niko Huang" className="profile-photo" />
          </div>
          <div className="home-right">
            <h1>Niko Huang</h1>
            <h2>Ph.D. Candidate in Computer Graphics</h2>
            <div className="quick-links">
              <a href="#">
                <FontAwesomeIcon icon={faEnvira} /> nikoloside [at] gmail [dot] com</a>
              <a href="https://github.com/nikoloside" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </a>
              <a href="https://twitter.com/nikoloside" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} /> X (Twitter)
              </a>
              <a href="https://www.instagram.com/nikoloside/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Section - Wrapper for Projects, About, and Publications */}
      <div className="content-section">

        <div className="card-content">
          <p>
            Niko Huang (黄宇航) is a doctoral student at <a href="https://www.u-tokyo.ac.jp/en/" target="_blank" rel="noopener noreferrer"> the University of Tokyo</a> advised by <a href="https://graphics.c.u-tokyo.ac.jp/hp/en/kanai" target="_blank" rel="noopener noreferrer">Prof. Takashi Kanai</a>, focusing on computer graphics and physics-based animation, which contribute in building multi-phase SDF 3D representation for Fracture Pattern.
          </p>
        
          <br/>

          <section ref={homeRef} id="my-story" >
            <div className="card-header">
              <h2>My Story</h2>
            </div>
          </section>

          <p>
            He received his M.Sc. from the <a href="https://www.iii.u-tokyo.ac.jp/" target="_blank" rel="noopener noreferrer">University of Tokyo (Graduate School of Interdisciplinary Information Studies)</a> and a B.Eng. in pattern recognition from <a href="https://www.isct.ac.jp/en" target="_blank" rel="noopener noreferrer">the Institute of Science Tokyo (Science Tokyo)</a>.
          </p>
            
          <p>
            Before pursuing his Ph.D., he was employed as a game engineer at <a href="https://dena.com/jp/" target="_blank" rel="noopener noreferrer">DeNA</a>, where he specialized in real-time graphics. Subsequently, he took on the role of tech lead at <a href="https://butlr.io/" target="_blank" rel="noopener noreferrer">Butlr Japan</a>, focusing on the development of sensing systems for spatial analytics.
          </p>
          <p>
            His research focuses on multi-phase 3D representations using multiple-phase implicit functions and multiple-phase eplicit voxel based representation, combining deep learning and physics-based simulation to build real-time systems for fracture and cutting animation. His broader interests include physical simulation, neural geometry processing, 3D deep learning, IoT, AI in Game Interaction, and spatial 3D intelligence.
          </p>
          {/* <p>
            Motivated by personal experiences in senior care, he aims to develop AI and robotics systems that interpret spatial environments while preserving privacy.
          </p> */}
        </div>
        {/* Projects Section */}
        <section ref={projectsRef} id="projects" className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          {/* News Section */}
          <div className="news-section">
            <h2>News</h2>
            <div className="news-content">
              {displayedNews.map((news, index) => (
                <div key={index} className="news-item">
                  <p className="news-date">{news.date}</p>
                  <div className="news-text">
                    {news.text.split('![').map((part, partIndex) => {
                      if (partIndex === 0) {
                        return <span key={partIndex}>{parseTextWithLinks(part)}</span>
                      }
                      const imageMatch = part.match(/^([^\]]+)\]\(([^)]+)\)/)
                      if (imageMatch) {
                        const [, alt, src] = imageMatch
                        const remainingText = part.substring(imageMatch[0].length)
                        return (
                          <span key={partIndex}>
                            <img src={src} alt={alt} className="news-image" />
                            {parseTextWithLinks(remainingText)}
                          </span>
                        )
                      }
                      return <span key={partIndex}>{parseTextWithLinks(part)}</span>
                    })}
                  </div>
                </div>
              ))}
              {newsData.length > 5 && (
                <div className="news-read-more">
                  <button 
                    className="read-more-btn"
                    onClick={() => setShowAllNews(!showAllNews)}
                  >
                    {showAllNews ? 'Show Less' : `Read More (${newsData.length - 5} more)`}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Software Projects Slider */}
          <div className="software-projects-section">
            <SoftwareSlider />
          </div>

          {/* Research Projects */}
          <div className="research-projects-section">
            <h2>Research Projects</h2>
            <div className="projects-content">
              <div className="project-item">
                <div className="project-image">
                  <img src={deepfracture} alt="DeepFracture Project" />
                </div>
                <div className="project-info">
                  <h2>DeepFracture: A Generative Approach for Predicting Brittle Fractures with Neural Discrete Representation Learning</h2>
                  <p className="project-meta">2024.04-</p>
                  <p className="project-authors">Yuhang Huang, Takashi Kanai</p>
                  <p className="project-venue">Computer Graphics Forum, (February 2025).</p>
                  <div className="project-links">
                    <a href="https://nikoloside.github.io/deepfracture/" className="project-link">Project Page</a>
                  </div>
                </div>
              </div>

              <div className="project-item">
                <div className="project-image">
                  <img src={fracture2d} alt="2D Fracture Project" />
                </div>
                <div className="project-info">
                  <h2>Towards Brittle Fracture Simulation Based on Deep Learning - Fracture Shape Prediction of Plane Objects Using Conditional GANs -</h2>
                  <p className="project-meta">2019.01-</p>
                  <p className="project-authors">Yuhang Huang, Takashi Kanai</p>
                  <p className="project-venue">The Journal of the Institute of Image Electronics Engineers of Japan, (2021.10). AFGS2019.</p>
                  <div className="project-links">
                    <a href="https://graphics.c.u-tokyo.ac.jp/hp/en/archives/2197" className="project-link">Project Page</a>
                  </div>
                </div>
              </div>

              <div className="project-item">
                <div className="project-image">
                  <img src={dataDrivenFracture} alt="Data-Driven Fracture Project" />
                </div>
                <div className="project-info">
                  <h2>Predicting Brittle Fracture Surface Shape From a Versatile Database</h2>
                  <p className="project-meta">2017.04-</p>
                  <p className="project-authors">Yuhang Huang, Yonghang Yu, Takashi Kanai</p>
                  <p className="project-venue">Computer Animation and Virtual Worlds, (November 2019). Siggraph Asia 2017 Workshop: Data-Driven Animation Techniques (D2AT)</p>
                  <div className="project-links">
                    <a href="https://graphics.c.u-tokyo.ac.jp/hp/en/archives/1802" className="project-link">Project Page</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="section about-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>About Me</h2>
          
          <div className="markdown-content">
            <h3>Education</h3>
            <ul>
              <li><strong>The University of Tokyo</strong> - PhD program in Computer Graphics (2021.10 ~ Now)</li>
              <li><strong>The University of Tokyo</strong> - M.Sc. in Computer Graphics (2017 ~ 2019)</li>
              <li><strong>The Institute of Science Tokyo (Science Tokyo)</strong> - B.Eng. in Machine Learning (2013 ~ 2017)</li>
            </ul>

            <h3>Experience</h3>
            <ul>
              <li><strong>Butlr · Contract</strong> - Tech Lead in JP, Unity Engineer in Global (2020.4-2022.4)
                <ul>
                  <li>Led the front-end development, ensuring a seamless user experience and interface design.</li>
                  <li>Built the CI/CD and release pipeline, facilitating efficient integration and deployment processes.</li>
                  <li>Developed IoT solutions and systems, building the spatial analytics and visualization metrics system.</li>
                  <li>Contributed to building the Customer Support Team, improving client interaction and service quality.</li>
                </ul>
              </li>
              <li><strong>DeNA · Permanent</strong> - Software Development Engineer (CG, Game Play) (2019.4-2021.9)
                <ul>
                  <li>Built and maintained the smartphone card game skill system, game logics, enhancing gameplay mechanics and user engagement using C++ and Unity.</li>
                  <li>Maintained the game CI/CD pipeline, ensuring smooth integration and deployment of game updates.</li>
                  <li>Managed the 3D asset system for non-photorealistic rendering, optimizing asset workflows and improving visual fidelity in the game environment.</li>
                </ul>
              </li>
              <li><strong>Freelancer · Contract</strong> - Programmer in Venture Company (2014.4-2019.3)
                <ul>
                  <li>Develop in iOS Application, Web Application, Full-stack Engineering.</li>
                </ul>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Publications Section */}
      <section ref={publicationsRef} id="publications" className="section publications-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Publications</h2>
          
          <div className="markdown-content">
            <h3>Journals</h3>
            <ul>
              <li>Yuhang Huang, Takashi Kanai: "DeepFracture: A Generative Approach for Predicting Brittle Fractures with Neural Discrete Representation Learning", Computer Graphics Forum, e70002, 15 pages, (February 2025).</li>
              <li>Yuhang Huang, Yonghang Yu, Takashi Kanai, "Predicting Brittle Fracture Surface Shape From a Versatile Database", Computer Animation and Virtual Worlds, Volume 30, Issue 6, e1865, 19 pages (November/December 2019).</li>
            </ul>

            <h3>Papers</h3>
            <ul>
              <li>Yuhang Huang, Takashi Kanai, "Brittle Fracture Prediction Method for Plane Shapes Using Conditional-GANs", Proc. 12th Asian Forum on Graphic Science, Article No.25, 9 pages, Kunming, China (9-12 August 2019).</li>
              <li>Yonghang Yu, Yuhang Huang, Takashi Kanai, "Data-Driven Approach for Simulating Brittle Fracture Surfaces", ACM SIGGRAPH ASIA 2017 Workshop: Data-Driven Animation Techniques (D2AT), 8 pages, Bangkok, Thailand (November/December 2017).</li>
            </ul>

            <h3>Posters</h3>
            <ul>
              <li>Yuhang Huang, Takashi Kanai: "Brittle Fracture Animation with VQ-VAE-Based Generative Method", 23rd ACM SIGGRAPH / Eurographics Symposium on Computer Animation (SCA2024) Posters, No.3, pp.1-2 (Montreal Canada, 21-23 August), 2024.</li>
            </ul>

            <h3>Domestic Conference & Journal</h3>
            <ul>
              <li>黄 宇航, 金井 崇: "敵対的生成ネットワークを用いた任意3次元形状の脆性破壊予測", Visual Computing 2023, 東京, 9月, No.35, 2023. (査読付き)</li>
              <li>黄 宇航，金井 崇: "深層学習ベース脆性破壊シミュレーションに向けて – 条件付きGAN による平面オブジェクトの破壊形状予測 –"，画像電子学会誌，Vol.50, No.4 (ビジュアルコンピューティング特集号), pp.558-567, 2021. (査読付き)</li>
            </ul>

            <h3>Domestic Workshop & Posters & Invited talks</h3>
            <ul>
              <li>黄 宇航, 金井 崇: "事前学習による特定カテゴリの任意形状における破壊形状予測", 画像電子学会 ビジュアルコンピューティングワークショップ 2024, 太宰府, 福岡, 11月, 2024. (査読なし)</li>
              <li>黄 宇航, 金井 崇: "VQ-VAEによるニューラル離散3次元破壊形状学習", Visual Computing 2024 ポスター, P39, 東京, 9月, 2024. (査読なし)</li>
              <li>黄 宇航, 金井 崇: "特徴ベクトルからの破壊形状の予測に関する研究", 画像電子学会 ビジュアルコンピューティングワークショップ 2023, 葉山， 神奈川, 12月, 2023. (査読なし)</li>
              <li>黄 宇航, 金井 崇: "3D-GANによる破壊分割形状予測結果における形状再構築手法の検討", 画像電子学会 ビジュアルコンピューティングワークショップ 2022, 諏訪湖，長野, 11月, 2022. (査読なし)</li>
              <li>黄 宇航, 金井 崇: "3D-GANを用いた破壊形状生成にもとづく脆性破壊シミュレーション", Visual Computing 2022 ポスター, P11, 京都, 10月, 2022. (査読なし)</li>
              <li>黄 宇航，于 永航，金井 崇: "データ駆動法による脆性破壊曲面生成シミュレーション", 画像電子学会 ビジュアルコンピューティングワークショップ 2017, 登別, 12月, 2017. (査読なし)</li>
            </ul>

            <h3>Awards</h3>
            <ul>
              <li><strong>VC Research Insentive Awards VC2025</strong> (2025.09) - 境界最遠点を正規化基準とする距離場設計による破片形状学習</li>
              <li><strong>JST SpringGX Doctoral Scholarship</strong> (2023-2024) - Next Generation Researcher Challenging Research Program (SPRING) University of Tokyo "Leading Human Resource Development for Green Transformation (GX)"</li>
              <li><strong>VC Posters Awards VC+VCC2022</strong> (2022.10) - Brittle fracture simulation based on the generation of fracture shapes using 3D-GAN</li>
              <li><strong>JSPS WINGS-CFS Fellowship</strong> (2022-2023) - World-leading Innovative Graduate Study Program Codesigning Future Society (WINGS-CFS Fellowship)</li>
              <li><strong>OpenCV AI Competition 2021 Phase 1 Finalists</strong> (2021.1) - Member of a team chosen as finalists from over 1400 submissions in OpenCV AI Competition 2021.</li>
            </ul>

            <h3>Talks & News</h3>
            <ul>
              <li>"NIKKEI Business Daily" - Why Chinese AI Talent is in Japanese Startups. (2023.6)</li>
            </ul>
          </div>
        </motion.div>
        </section>
      </div>
    </div>
  )
}

export default MainPage 