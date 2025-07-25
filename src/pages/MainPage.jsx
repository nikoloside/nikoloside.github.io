import { useEffect, useRef } from 'react'
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
      <section ref={homeRef} id="home" className="section home-section">
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
            <h2>Ph.D. Student in Computer Graphics</h2>
            <p>Niko Huang (黄宇航) is a doctoral student at <a href="https://www.u-tokyo.ac.jp/en/" target="_blank" rel="noopener noreferrer"> the University of Tokyo</a> advised by <a href="https://graphics.c.u-tokyo.ac.jp/hp/en/kanai" target="_blank" rel="noopener noreferrer">Prof. Takashi Kanai</a>, focusing on computer graphics and physics-based animation, which contribute in building multi-phase SDF 3D representation for Fracture Pattern.</p>
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

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="section projects-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
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
          <h1>About Me</h1>
          
          <div className="about-content">
            <div className="about-cards">
              <div className="about-card story-card">
                <div className="card-header">
                  <h2>My Story</h2>
                </div>
                <div className="card-content">
                  <p>
                    Niko Huang (黄宇航) is a doctoral student at the <a href="https://www.u-tokyo.ac.jp/en/" target="_blank" rel="noopener noreferrer">University of Tokyo</a>, advised by <a href="https://graphics.c.u-tokyo.ac.jp/hp/en/kanai" target="_blank" rel="noopener noreferrer">Professor Takashi Kanai</a>. He received his M.Sc. from the <a href="https://www.iii.u-tokyo.ac.jp/" target="_blank" rel="noopener noreferrer">University of Tokyo (Graduate School of Interdisciplinary Information Studies)</a> and a B.Eng. in pattern recognition from <a href="https://www.isct.ac.jp/en" target="_blank" rel="noopener noreferrer">the Institute of Science Tokyo (Science Tokyo)</a>.
                  </p>
                  <p>
                    Before pursuing his Ph.D., he was employed as a game engineer at <a href="https://dena.com/jp/" target="_blank" rel="noopener noreferrer">DeNA</a>, where he specialized in real-time graphics. Subsequently, he took on the role of tech lead at <a href="https://butlr.io/" target="_blank" rel="noopener noreferrer">Butlr Japan</a>, focusing on the development of sensing systems for spatial analytics.
                  </p>
                  <p>
                    His research focuses on multi-phase 3D representations using multiple-phase implicit functions and multiple-phase eplicit voxel based representation, combining deep learning and physics-based simulation to build real-time systems for fracture and cutting animation. His broader interests include physical simulation, neural geometry processing, 3D deep learning, IoT, and spatial 3D intelligence.
                  </p>
                  <p>
                    Motivated by personal experiences in senior care, he aims to develop AI and robotics systems that interpret spatial environments while preserving privacy. He would plan to focus on the SpaceRAG project etc in the next step.
                  </p>
                </div>
              </div>

              <div className="about-card education-card">
                <div className="card-header">
                  <h2>Education</h2>
                </div>
                <div className="card-content">
                  <div className="education-item">
                    <div className="education-icon">
                      <img src={utokyoLogo} alt="University of Tokyo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                    </div>
                    <div className="education-details">
                      <h3>The University of Tokyo</h3>
                      <p className="education-degree">PhD program in Computer Graphics</p>
                      <p className="education-period">2021.10 ~ Now</p>
                    </div>
                  </div>
                  <div className="education-item">
                    <div className="education-icon">
                      <img src={utokyoLogo} alt="University of Tokyo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                    </div>
                    <div className="education-details">
                      <h3>The University of Tokyo</h3>
                      <p className="education-degree">M.Sc. in Computer Graphics</p>
                      <p className="education-period">2017 ~ 2019</p>
                    </div>
                  </div>
                  <div className="education-item">
                    <div className="education-icon">
                      <img src={scienceTokyoLogo} alt="Science Tokyo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                    </div>
                    <div className="education-details">
                      <h3>The Institute of Science Tokyo (Science Tokyo)</h3>
                      <p className="education-degree">B.Eng. in Machine Learning</p>
                      <p className="education-period">2013 ~ 2017</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-card experience-card">
                <div className="card-header">
                  <h2>Experience</h2>
                </div>
                <div className="card-content">
                  <div className="experience-item">
                    <div className="experience-icon">
                      <img src={butlrLogo} alt="Butlr" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                    </div>
                    <div className="experience-details">
                      <h3>Butlr · Contract</h3>
                      <p className="experience-title">Tech Lead in JP, Unity Engineer in Global</p>
                      <p className="experience-period">2020.4-2022.4</p>
                      <ul className="experience-list">
                        <li>Led the front-end development, ensuring a seamless user experience and interface design.</li>
                        <li>Built the CI/CD and release pipeline, facilitating efficient integration and deployment processes.</li>
                        <li>Developed IoT solutions and systems, building the spatial analytics and visualization metrics system.</li>
                        <li>Contributed to building the Customer Support Team, improving client interaction and service quality.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="experience-item">
                    <div className="experience-icon">
                      <img src={denaLogo} alt="DeNA" style={{ width: '48px', height: '64px', objectFit: 'contain' }} />
                    </div>
                    <div className="experience-details">
                      <h3>DeNA · Permanent</h3>
                      <p className="experience-title">Software Development Engineer (CG, Game Play)</p>
                      <p className="experience-period">2019.4-2021.9</p>
                      <ul className="experience-list">
                        <li>Built and maintained the smartphone card game skill system, game logics, enhancing gameplay mechanics and user engagement using C++ and Unity.</li>
                        <li>Maintained the game CI/CD pipeline, ensuring smooth integration and deployment of game updates.</li>
                        <li>Managed the 3D asset system for non-photorealistic rendering, optimizing asset workflows and improving visual fidelity in the game environment.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="experience-item">
                    <div className="experience-icon">💼</div>
                    <div className="experience-details">
                      <h3>Freelancer · Contract</h3>
                      <p className="experience-title">Programmer in Venture Company</p>
                      <p className="experience-period">2014.4-2019.3</p>
                      <ul className="experience-list">
                        <li>Develop in iOS Application, Web Application, Full-stack Engineering.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
          <h1>Publications</h1>
          
          <div className="publications-content">
            <div className="publication-category">
              <h2>Journals</h2>
              <div className="publication-item">
                <p>Yuhang Huang, Takashi Kanai: "DeepFracture: A Generative Approach for Predicting Brittle Fractures with Neural Discrete Representation Learning", Computer Graphics Forum, e70002, 15 pages, (February 2025).</p>
              </div>
              <div className="publication-item">
                <p>Yuhang Huang, Yonghang Yu, Takashi Kanai, "Predicting Brittle Fracture Surface Shape From a Versatile Database", Computer Animation and Virtual Worlds, Volume 30, Issue 6, e1865, 19 pages (November/December 2019).</p>
              </div>
            </div>

            <div className="publication-category">
              <h2>Papers</h2>
              <div className="publication-item">
                <p>Yuhang Huang, Takashi Kanai, "Brittle Fracture Prediction Method for Plane Shapes Using Conditional-GANs", Proc. 12th Asian Forum on Graphic Science, Article No.25, 9 pages, Kunming, China (9-12 August 2019).</p>
              </div>
              <div className="publication-item">
                <p>Yonghang Yu, Yuhang Huang, Takashi Kanai, "Data-Driven Approach for Simulating Brittle Fracture Surfaces", ACM SIGGRAPH ASIA 2017 Workshop: Data-Driven Animation Techniques (D2AT), 8 pages, Bangkok, Thailand (November/December 2017).</p>
              </div>
            </div>

            <div className="publication-category">
              <h2>Posters</h2>
              <div className="publication-item">
                <p>Yuhang Huang, Takashi Kanai: "Brittle Fracture Animation with VQ-VAE-Based Generative Method", 23rd ACM SIGGRAPH / Eurographics Symposium on Computer Animation (SCA2024) Posters, No.3, pp.1-2 (Montreal Canada, 21-23 August), 2024.</p>
              </div>
            </div>

            <div className="publication-category">
              <h2>Domestic Conference & Journal</h2>
              <div className="publication-item">
                <p>黄 宇航, 金井 崇: "敵対的生成ネットワークを用いた任意3次元形状の脆性破壊予測", Visual Computing 2023, 東京, 9月, No.35, 2023. (査読付き)</p>
              </div>
              <div className="publication-item">
                <p>黄 宇航，金井 崇: "深層学習ベース脆性破壊シミュレーションに向けて – 条件付きGAN による平面オブジェクトの破壊形状予測 –"，画像電子学会誌，Vol.50, No.4 (ビジュアルコンピューティング特集号), pp.558-567, 2021. (査読付き)</p>
              </div>
            </div>

            <div className="publication-category">
              <h2>Domestic Workshop & Posters & Invited talks</h2>
              <div className="publication-item">
                <p>黄 宇航, 金井 崇: "事前学習による特定カテゴリの任意形状における破壊形状予測", 画像電子学会 ビジュアルコンピューティングワークショップ 2024, 太宰府, 福岡, 11月, 2024. (査読なし)</p>
              </div>
              <div className="publication-item">
                <p>黄 宇航, 金井 崇: "VQ-VAEによるニューラル離散3次元破壊形状学習", Visual Computing 2024 ポスター, P39, 東京, 9月, 2024. (査読なし)</p>
              </div>
              <div className="publication-item">
                <p>黄 宇航, 金井 崇: "特徴ベクトルからの破壊形状の予測に関する研究", 画像電子学会 ビジュアルコンピューティングワークショップ 2023, 葉山， 神奈川, 12月, 2023. (査読なし)</p>
              </div>
              <div className="publication-item">
                <p>黄 宇航, 金井 崇: "3D-GANによる破壊分割形状予測結果における形状再構築手法の検討", 画像電子学会 ビジュアルコンピューティングワークショップ 2022, 諏訪湖，長野, 11月, 2022. (査読なし)</p>
              </div>
              <div className="publication-item">
                <p>黄 宇航, 金井 崇: "3D-GANを用いた破壊形状生成にもとづく脆性破壊シミュレーション", Visual Computing 2022 ポスター, P11, 京都, 10月, 2022. (査読なし)</p>
              </div>
              <div className="publication-item">
                <p>黄 宇航，于 永航，金井 崇: "データ駆動法による脆性破壊曲面生成シミュレーション", 画像電子学会 ビジュアルコンピューティングワークショップ 2017, 登別, 12月, 2017. (査読なし)</p>
              </div>
            </div>

            <div className="publication-category">
              <h2>Awards</h2>
              <div className="publication-item">
                <p>JST SpringGX Doctoral Scholarship</p>
                <p>2023-2024</p>
                <p>Next Generation Researcher Challenging Research Program (SPRING) University of Tokyo "Leading Human Resource Development for Green Transformation (GX)"</p>
              </div>
              <div className="publication-item">
                <p>VC Posters Awards VC+VC2022</p>
                <p>2022.10</p>
                <p>Brittle fracture simulation based on the generation of fracture shapes using 3D-GAN</p>
              </div>
              <div className="publication-item">
                <p>JSPS WINGS-CFS Fellowship</p>
                <p>2022-2023</p>
                <p>World-leading Innovative Graduate Study Program Codesigning Future Society (WINGS-CFS Fellowship)</p>
              </div>
              <div className="publication-item">
                <p>OpenCV AI Competition 2021 Phase 1 Finalists</p>
                <p>2021.1</p>
                <p>Member of a team chosen as finalists from over 1400 submissions in OpenCV AI Competition 2021.</p>
              </div>
            </div>

            <div className="publication-category">
              <h2>Talks & News</h2>
              <div className="publication-item">
                <p>"NIKKEI Business Daily" - Why Chinese AI Talent is in Japanese Startups.</p>
                <p>2023.6</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default MainPage 