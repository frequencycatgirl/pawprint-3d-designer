import { Canvas } from '@react-three/fiber'
import { Center, OrbitControls } from '@react-three/drei'
import Shirt from './Shirt'
import CameraRig from './CameraRig'
import { useEffect, useRef } from 'react'

const CanvasModel = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) canvasRef.current.getContext('webgl')?.camera?.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] flex-grow overflow-hidden">
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [0, 0, 4], fov: 35, near: 0.1, far: 100 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight intensity={1} position={[5, 10, 5]} castShadow />
        <CameraRig>
          <Center top scale={1.2}>
            <Shirt />
          </Center>
        </CameraRig>
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={1.0}
          maxDistance={10}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI - Math.PI / 5}
          enableDamping
          dampingFactor={0.08}
          target={[0, 0.1, 0]}
        />
      </Canvas>
    </div>
  )
}

export default CanvasModel
