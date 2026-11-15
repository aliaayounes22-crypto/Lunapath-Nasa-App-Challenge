import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { landingSites } from '../data/lunarData';

/**
 * Creates a procedural lunar surface texture on an offscreen 2D canvas.
 * Guarantees zero external network dependencies and instant loading.
 */
function createProceduralMoonTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base lunar regolith tone (light gray highlands)
  ctx.fillStyle = '#b0b5be';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Maria (dark basaltic plains)
  ctx.fillStyle = '#6b7280';
  const mariaCenters = [
    { x: 300, y: 180, rx: 120, ry: 90 }, // Mare Imbrium
    { x: 420, y: 160, rx: 80, ry: 60 },  // Mare Serenitatis
    { x: 490, y: 190, rx: 90, ry: 70 },  // Mare Tranquillitatis
    { x: 200, y: 220, rx: 140, ry: 100 },// Oceanus Procellarum
    { x: 550, y: 170, rx: 50, ry: 45 },  // Mare Crisium
    { x: 450, y: 270, rx: 70, ry: 50 },  // Mare Nectaris
  ];

  mariaCenters.forEach((m) => {
    ctx.beginPath();
    ctx.ellipse(m.x, m.y, m.rx, m.ry, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // South polar region micro-topography & craters
  ctx.fillStyle = '#838896';
  for (let i = 0; i < 350; i++) {
    const x = Math.random() * canvas.width;
    // Bias some craters towards polar zones
    const y = Math.random() < 0.4 ? 420 + Math.random() * 92 : Math.random() * canvas.height;
    const r = Math.random() * 8 + 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Crater rim highlights
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * canvas.width;
    const y = 380 + Math.random() * 130;
    const r = Math.random() * 6 + 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI);
    ctx.stroke();
  }

  return new THREE.CanvasTexture(canvas);
}

/**
 * Creates procedural Earth texture.
 */
function createProceduralEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Oceans (deep blue)
  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Continents (greenish / brownish)
  ctx.fillStyle = '#15803d';
  const continents = [
    { x: 140, y: 90, w: 90, h: 70 }, // N. America
    { x: 180, y: 160, w: 60, h: 80 }, // S. America
    { x: 280, y: 100, w: 100, h: 90 }, // Africa / Europe
    { x: 380, y: 90, w: 110, h: 80 }, // Asia
    { x: 420, y: 180, w: 60, h: 45 }, // Australia
  ];

  continents.forEach((c) => {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 60; i++) {
    ctx.beginPath();
    ctx.ellipse(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 30 + 10,
      Math.random() * 10 + 4,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

export default function SpaceView3D({ selectedSite, onSelectSite, onError }) {
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const moonRef = useRef(null);
  const isRotatingRef = useRef(true);
  const [isRotating, setIsRotating] = useState(true);

  const toggleRotate = () => {
    isRotatingRef.current = !isRotatingRef.current;
    setIsRotating(isRotatingRef.current);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    let controls;
    let animationFrameId;
    let moonGeo, moonMat, earthGeo, earthMat, starGeometry, starMaterial;

    try {
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 520;

      // 1. Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x030712);

      // 2. Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, -3.2, 5.0);
      cameraRef.current = camera;

      // 3. Renderer with error checking
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // 4. OrbitControls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2.5;
      controls.maxDistance = 25;
      controlsRef.current = controls;

    // 5. Starfield Background Particles
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 800;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starCoords[i] = (Math.random() - 0.5) * 120;
      starCoords[i + 1] = (Math.random() - 0.5) * 120;
      starCoords[i + 2] = (Math.random() - 0.5) * 120;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0x94a3b8, size: 0.25, transparent: true, opacity: 0.8 });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Moon
    const moonRadius = 1.6;
    const moonGeo = new THREE.SphereGeometry(moonRadius, 64, 64);
    const moonTex = createProceduralMoonTexture();
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex,
      roughness: 0.9,
      metalness: 0.05,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.rotation.x = 0.1; // Subtle axial inclination
    scene.add(moon);
    moonRef.current = moon;

    // Highlight Lunar South Pole (Ring marker around South Pole: y = -moonRadius)
    const poleRingGeo = new THREE.RingGeometry(0.35, 0.42, 48);
    const poleRingMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const poleRing = new THREE.Mesh(poleRingGeo, poleRingMat);
    poleRing.position.set(0, -moonRadius - 0.01, 0);
    poleRing.rotation.x = Math.PI / 2;
    moon.add(poleRing);

    // South Pole Needle/Pin
    const polePinGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 16);
    const polePinMat = new THREE.MeshBasicMaterial({ color: 0xe63946 });
    const polePin = new THREE.Mesh(polePinGeo, polePinMat);
    polePin.position.set(0, -moonRadius - 0.25, 0);
    moon.add(polePin);

    // 7. Earth (Illustrative distance & scale)
    const earthRadius = 0.8;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 32, 32);
    const earthTex = createProceduralEarthTexture();
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTex,
      roughness: 0.4,
      metalness: 0.1,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.position.set(8.5, 3.2, -6.0); // Placed in representative lunar sky line of sight
    scene.add(earth);

    // Earth atmosphere glow
    const earthGlowGeo = new THREE.SphereGeometry(earthRadius * 1.08, 32, 32);
    const earthGlowMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
    });
    const earthGlow = new THREE.Mesh(earthGlowGeo, earthGlowMat);
    earth.add(earthGlow);

    // 8. Sun representation & Lighting
    // Directional sunlight casting low grazing angles onto the Moon
    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.5);
    sunLight.position.set(15, 0.4, 10); // Grazing angle along South Pole
    scene.add(sunLight);

    // Ambient space light for visibility
    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.4);
    scene.add(ambientLight);

    // Sun Visual Sphere
    const sunGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(22, 1.0, 14);
    scene.add(sunMesh);

    // Sun Corona / Glow
    const sunCoronaGeo = new THREE.SphereGeometry(2.0, 32, 32);
    const sunCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
    });
    const sunCorona = new THREE.Mesh(sunCoronaGeo, sunCoronaMat);
    sunMesh.add(sunCorona);

    // 9. Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Slow orbital rotation
      if (moonRef.current && isRotatingRef.current) {
        moonRef.current.rotation.y += 0.0015;
      }
      if (earth) {
        earth.rotation.y += 0.003;
      }

      if (controls) controls.update();
      if (renderer) renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (controls) controls.dispose();
      if (renderer) renderer.dispose();
      if (moonGeo) moonGeo.dispose();
      if (moonMat) moonMat.dispose();
      if (earthGeo) earthGeo.dispose();
      if (earthMat) earthMat.dispose();
      if (starGeometry) starGeometry.dispose();
      if (starMaterial) starMaterial.dispose();
      if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    } catch (err) {
      console.warn("WebGL initialization failed, falling back to 2D view:", err);
      if (onError) onError();
    }
  }, []);

  // Camera reset buttons
  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, -3.2, 5.0);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  const focusSouthPole = () => {
    if (cameraRef.current && controlsRef.current) {
      // Look straight up from the bottom (South Pole view)
      cameraRef.current.position.set(0, -4.5, 0.8);
      controlsRef.current.target.set(0, -1.6, 0);
      controlsRef.current.update();
    }
  };

  const focusEarth = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(5.5, 2.0, -3.5);
      controlsRef.current.target.set(8.5, 3.2, -6.0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden bg-[#030712] border border-electric/20 select-none">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
        <button
          onClick={resetCamera}
          className="px-3 py-1.5 rounded-lg bg-midnight/80 border border-electric/30 hover:border-electric text-xs text-lunar font-medium backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md"
        >
          <svg className="w-3.5 h-3.5 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Camera
        </button>

        <button
          onClick={focusSouthPole}
          className="px-3 py-1.5 rounded-lg bg-midnight/80 border border-electric/30 hover:border-electric text-xs text-lunar font-medium backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-mission-red" />
          Focus South Pole
        </button>

        <button
          onClick={focusEarth}
          className="px-3 py-1.5 rounded-lg bg-midnight/80 border border-electric/30 hover:border-electric text-xs text-lunar font-medium backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          Focus Earth
        </button>

        <button
          onClick={toggleRotate}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium backdrop-blur-md transition-all ${
            isRotating
              ? 'bg-electric/20 border-electric text-electric'
              : 'bg-midnight/80 border-electric/20 text-muted'
          }`}
        >
          {isRotating ? 'Pause Spin' : 'Resume Spin'}
        </button>
      </div>

      {/* South Pole beacon indicator overlay */}
      <div className="absolute bottom-4 left-4 z-10 glass px-3 py-2 rounded-lg text-xs flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-lunar font-medium">South Pole Region (85°S – 90°S)</span>
        <span className="text-muted text-[10px]">Marked with blue ring & red polar pin</span>
      </div>

      {/* Orbit Controls instructions */}
      <div className="absolute bottom-4 right-4 z-10 text-[11px] text-muted/80 bg-midnight/60 backdrop-blur-sm px-2.5 py-1.5 rounded border border-white/5 pointer-events-none">
        Drag to orbit • Scroll to zoom • Right-click to pan
      </div>
    </div>
  );
}
