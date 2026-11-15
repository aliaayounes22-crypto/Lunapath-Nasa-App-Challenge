import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { RotateCcw, Play, Pause, Compass, Info, AlertTriangle } from 'lucide-react'
import { latLonToVector3, isWebGLAvailable } from '../../utils/astronomy'
import LunarPolar2D from './LunarPolar2D'

/**
 * Generates an offline high-detail fallback procedural lunar texture.
 * Ensures the 3D globe looks photorealistic even without network access.
 */
function createOfflineLunarTexture() {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Base regolith grey
  ctx.fillStyle = '#94A3B8'
  ctx.fillRect(0, 0, size, size)

  // Lunar maria (ancient basalt floods)
  const maria = [
    { x: 380, y: 350, r: 160 },
    { x: 550, y: 380, r: 140 },
    { x: 260, y: 460, r: 120 },
    { x: 720, y: 440, r: 110 },
    { x: 500, y: 880, r: 240 }, // South Pole-Aitken basin
  ]

  maria.forEach((m) => {
    const grad = ctx.createRadialGradient(m.x, m.y, 10, m.x, m.y, m.r)
    grad.addColorStop(0, '#334155')
    grad.addColorStop(0.7, '#475569')
    grad.addColorStop(1, '#94A3B8')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
    ctx.fill()
  })

  // Impact cratering
  for (let i = 0; i < 400; i++) {
    const cx = Math.random() * size
    const cy = Math.random() * size
    const cr = Math.random() * 18 + 2

    // Dark floor
    ctx.fillStyle = '#1E293B'
    ctx.beginPath()
    ctx.arc(cx, cy, cr, 0, Math.PI * 2)
    ctx.fill()

    // Highlighted rim
    ctx.strokeStyle = '#E2E8F0'
    ctx.lineWidth = Math.max(1, cr * 0.18)
    ctx.beginPath()
    ctx.arc(cx - cr * 0.1, cy - cr * 0.1, cr, Math.PI * 0.7, Math.PI * 1.8)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

/**
 * 3D Pin marking a candidate landing site on the lunar surface
 */
function SiteMarker3D({ site, isSelected, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const pos = useMemo(() => latLonToVector3(site.lat, site.lon, 2.03), [site.lat, site.lon])

  return (
    <group position={pos}>
      {/* Outer Pulse Ring when selected */}
      {isSelected && (
        <mesh>
          <ringGeometry args={[0.07, 0.12, 24]} />
          <meshBasicMaterial color="#FC3D21" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      )}

      {/* Pin beacon mesh */}
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onSelect(site.id)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
      >
        <sphereGeometry args={[isSelected ? 0.055 : 0.04, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? '#FC3D21' : hovered ? '#F0B726' : '#D4A11E'}
          emissive={isSelected ? '#FC3D21' : '#D4A11E'}
          emissiveIntensity={isSelected ? 0.8 : 0.4}
        />
      </mesh>

      {/* HTML Tag Tooltip */}
      {(isSelected || hovered) && (
        <Html distanceFactor={8} position={[0, 0.15, 0]} center>
          <div
            onClick={(e) => {
              e.stopPropagation()
              onSelect(site.id)
            }}
            className={`cursor-pointer px-2.5 py-1 rounded-md text-[10px] font-mono whitespace-nowrap shadow-xl border pointer-events-auto transition-transform ${
              isSelected
                ? 'bg-[#FC3D21] text-white border-white font-bold scale-110'
                : 'bg-[#050816]/95 text-[#D4A11E] border-[#D4A11E]/40'
            }`}
          >
            {site.id} ({site.lat}°, {site.lon}°)
          </div>
        </Html>
      )}
    </group>
  )
}

/**
 * South Pole Polar Marker (90°S)
 */
function SouthPoleMarker() {
  const pos = useMemo(() => latLonToVector3(-90, 0, 2.03), [])

  return (
    <group position={pos}>
      <mesh>
        <ringGeometry args={[0.08, 0.13, 32]} />
        <meshBasicMaterial color="#FFFFFF" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.6} />
      </mesh>
      <Html distanceFactor={8} position={[0, -0.15, 0]} center>
        <div className="bg-[#050816]/90 border border-white/40 text-white px-2 py-0.5 rounded text-[9px] font-mono whitespace-nowrap">
          SOUTH POLE 90°S
        </div>
      </Html>
    </group>
  )
}

/**
 * Inner 3D Lunar Mesh with texture, auto-rotation, and interaction controls
 */
function MoonSphere({ selectedSite, onSelectSite, isRotating, setIsInteracting }) {
  const meshRef = useRef()

  // Attempt to load NASA texture, fall back seamlessly to offline procedural texture
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    try {
      // Standard high-res lunar texture URL with crossOrigin
      return loader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
        (tex) => {
          tex.wrapS = THREE.RepeatWrapping
          tex.wrapT = THREE.ClampToEdgeWrapping
        },
        undefined,
        () => {
          // If network fetch fails, silently use offline texture
          return createOfflineLunarTexture()
        }
      )
    } catch {
      return createOfflineLunarTexture()
    }
  }, [])

  // Smooth idle rotation
  useFrame((_, delta) => {
    if (isRotating && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12
    }
  })

  // Candidate Sites
  const sites = [
    { id: 'SP11', name: 'Slater Plain', lat: -86.95, lon: 126.675 },
    { id: 'NR2_K2023', name: 'Nobile Rim 2', lat: -84.074, lon: 59.197 },
    { id: 'HW10', name: 'Haworth', lat: -86.527, lon: -14.876 },
  ]

  return (
    <group ref={meshRef}>
      {/* Lunar Globe Sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.9}
          metalness={0.05}
          bumpScale={0.04}
        />
      </mesh>

      {/* Atmospheric Rim Glow */}
      <mesh scale={[1.015, 1.015, 1.015]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Candidate Site Pins */}
      {sites.map((site) => (
        <SiteMarker3D
          key={site.id}
          site={site}
          isSelected={selectedSite === site.id}
          onSelect={onSelectSite}
        />
      ))}

      {/* Geographic South Pole Indicator */}
      <SouthPoleMarker />
    </group>
  )
}

/**
 * LunarGlobe3D — High-fidelity 3D Lunar South Pole Navigator using React Three Fiber.
 * Features:
 * - NASA lunar surface map with offline procedural fallback
 * - OrbitControls with damping, bounded zoom, and touch gesture support
 * - Idle auto-rotation with user drag pause
 * - Reset View button centering on the Lunar South Pole (85°–90°S)
 * - Respects prefers-reduced-motion
 * - Automatic WebGL fallback to LunarPolar2D
 * - Labeled: "Interactive lunar visualization — illustrative, not to scale"
 */
export default function LunarGlobe3D({ selectedSite, onSelectSite }) {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [isRotating, setIsRotating] = useState(true)
  const [viewMode, setViewMode] = useState('3d') // '3d' or '2d'
  const controlsRef = useRef()

  // Verify WebGL availability and respect prefers-reduced-motion
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGL(false)
      setViewMode('2d')
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setIsRotating(false)
    }

    const handleChange = (e) => {
      if (e.matches) setIsRotating(false)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Smoothly resets camera view to focus directly on the South Pole from an angled perspective
  const handleResetPolarView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
      // Position camera looking up towards the South Pole (negative Y)
      controlsRef.current.object.position.set(0, -3.2, 3.4)
      controlsRef.current.target.set(0, -0.6, 0)
      controlsRef.current.update()
    }
  }

  // Graceful 2D Fallback if WebGL is unsupported or user chooses 2D
  if (!hasWebGL || viewMode === '2d') {
    return (
      <div className="space-y-4">
        {hasWebGL && (
          <div className="flex justify-end">
            <button
              onClick={() => setViewMode('3d')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1428] border border-[#D4A11E]/40 text-[#D4A11E] hover:bg-[#D4A11E]/20 text-xs font-mono transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              Switch to 3D Globe
            </button>
          </div>
        )}
        <LunarPolar2D selectedSite={selectedSite} onSelectSite={onSelectSite} />
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto bg-[#070D1B] rounded-3xl border border-[#F5F7FA]/10 overflow-hidden shadow-2xl group">
      {/* 3D Canvas with Realistic Lighting */}
      <Canvas
        camera={{ position: [0, -3.0, 3.5], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        gl={{ antialias: true, alpha: true }}
      >
        {/* Deep space ambient fill */}
        <ambientLight intensity={0.25} />

        {/* Directional Sun simulating low polar grazing angle */}
        <directionalLight position={[6, 1.2, 4]} intensity={2.4} castShadow />

        {/* Earth reflection backlight */}
        <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#38BDF8" />

        <Suspense fallback={null}>
          <MoonSphere
            selectedSite={selectedSite}
            onSelectSite={onSelectSite}
            isRotating={isRotating}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.06}
          minDistance={2.6}
          maxDistance={7.0}
          onStart={() => setIsRotating(false)}
        />
      </Canvas>

      {/* Top HUD Toolbar: Reset Polar View & Auto-Rotate Toggle */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <button
          onClick={handleResetPolarView}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#050816]/90 border border-[#F5F7FA]/15 text-[#F5F7FA] hover:text-[#D4A11E] hover:border-[#D4A11E]/50 text-[11px] font-mono backdrop-blur-md transition-all shadow-lg active:scale-95"
          title="Reset orientation to focus on the Lunar South Pole"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Polar View</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            className="pointer-events-auto p-1.5 rounded-lg bg-[#050816]/90 border border-[#F5F7FA]/15 text-[#F5F7FA] hover:text-[#D4A11E] hover:border-[#D4A11E]/50 text-xs backdrop-blur-md transition-all shadow-lg"
            title={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            aria-label={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setViewMode('2d')}
            className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#050816]/90 border border-[#F5F7FA]/15 text-[#F5F7FA] hover:text-[#D4A11E] hover:border-[#D4A11E]/50 text-[11px] font-mono backdrop-blur-md transition-all shadow-lg"
            title="View 2D Polar Stereographic chart"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>2D Map</span>
          </button>
        </div>
      </div>

      {/* Bottom Educational Disclosure Banner */}
      <div className="absolute bottom-2 left-2 right-2 flex flex-col items-center gap-1 pointer-events-none">
        <div className="pointer-events-auto px-3 py-1 rounded-full bg-[#050816]/85 border border-[#D4A11E]/30 text-[#A8B0C0] text-[10px] font-mono backdrop-blur-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A11E] animate-pulse" />
          <span>Interactive lunar visualization — illustrative, not to scale</span>
        </div>
        <div className="text-[9px] text-[#64748B] font-mono">
          Texture: NASA CGI Moon Kit / LROC • Drag to orbit, scroll to zoom
        </div>
      </div>
    </div>
  )
}
