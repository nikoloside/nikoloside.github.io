import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Interactive 3D Demo
      </Text>
      <OrbitControls />
    </>
  )
}

const Demos = () => {
  // Update page title for analytics
  useEffect(() => {
    document.title = "3D Demos - Niko Huang"
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="demos-container"
    >
      <h1>3D Demos</h1>
      <div className="canvas-container">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
      <div className="demo-description">
        <h2>Interactive 3D Demonstrations</h2>
        <p>
          This section showcases interactive 3D demonstrations of our research work.
          Use your mouse to rotate and zoom the 3D scene.
        </p>
      </div>
    </motion.div>
  )
}

export default Demos 