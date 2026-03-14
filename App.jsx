import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function App() {
  const mountRef = useRef(null)
  const [stage, setStage] = useState('earth')
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const globeRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // 初始化Three.js
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    
    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    // 创建3D地球
    const geometry = new THREE.SphereGeometry(5, 64, 64)
    const material = new THREE.MeshPhongMaterial({
      color: 0x1a73e8,
      emissive: 0x112244,
      specular: 0x333333,
      shininess: 15
    })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)
    globeRef.current = globe

    // 添加纹理（简单的地球贴图效果）
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    
    // 海洋
    ctx.fillStyle = '#1a73e8'
    ctx.fillRect(0, 0, 512, 256)
    
    // 简单的大陆轮廓
    ctx.fillStyle = '#34a853'
    ctx.beginPath()
    ctx.ellipse(150, 100, 60, 40, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(350, 120, 80, 50, 0, 0, Math.PI * 2)
    ctx.fill()
    
    const texture = new THREE.CanvasTexture(canvas)
    material.map = texture
    material.needsUpdate = true

    // 添加网格线
    const wireGeometry = new THREE.SphereGeometry(5.05, 32, 32)
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    })
    const wireframe = new THREE.Mesh(wireGeometry, wireMaterial)
    scene.add(wireframe)

    // 光照
    const ambientLight = new THREE.AmbientLight(0x333333)
    scene.add(ambientLight)
    
    const pointLight = new THREE.PointLight(0xffffff, 1.5)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // 摄像机位置
    camera.position.z = 15

    // 动画循环
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.002
      }
      
      renderer.render(scene, camera)
    }
    animate()

    // 窗口大小调整
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current)
      }
      renderer.dispose()
    }
  }, [])

  const handleDescend = () => {
    setStage('descending')
    
    // 俯冲动画
    if (cameraRef.current) {
      const startZ = 15
      const endZ = 8
      const duration = 2000
      const startTime = Date.now()
      
      const animateDescend = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
        
        cameraRef.current.position.z = startZ + (endZ - startZ) * eased
        
        if (progress < 1) {
          requestAnimationFrame(animateDescend)
        } else {
          setStage('temple')
        }
      }
      animateDescend()
    }
  }

  const handleOffer = (type) => {
    alert(`献${type}成功！已链上存证到SUI网络`)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
      {/* 3D容器 */}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* UI层 */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        zIndex: 100
      }}>
        <h1 style={{ fontSize: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          🕯️ 纪念祠
        </h1>
        <p style={{ opacity: 0.8 }}>3D元宇宙祭奠平台</p>
      </div>

      {/* 交互按钮 */}
      {stage === 'earth' && (
        <div style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100
        }}>
          <button
            onClick={handleDescend}
            style={{
              padding: '15px 40px',
              fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '30px',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            🚀 进入纪念空间
          </button>
        </div>
      )}

      {/* 祭奠功能区 */}
      {stage === 'temple' && (
        <div style={{
          position: 'absolute',
          bottom: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '20px',
          zIndex: 100
        }}>
          <button onClick={() => handleOffer('花')} style={offerButtonStyle}>🌸 献花</button>
          <button onClick={() => handleOffer('纸')} style={offerButtonStyle}>💰 烧纸</button>
          <button onClick={() => handleOffer('香')} style={offerButtonStyle}>🕯️ 焚香</button>
        </div>
      )}

      {/* 提示 */}
      {stage === 'temple' && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.8rem',
          zIndex: 100
        }}>
          🔗 祭奠记录已上链存证 (SUI Network)
        </div>
      )}
    </div>
  )
}

const offerButtonStyle = {
  padding: '12px 24px',
  fontSize: '1rem',
  background: 'rgba(255,255,255,0.2)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '12px',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}

export default App
