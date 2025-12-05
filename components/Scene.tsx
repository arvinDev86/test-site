import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Box, useTexture, Float, Sparkles, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Default images for the manga pages (updated to CORS-friendly URLs)
const MANGA_EN_URL = 'https://i.imgur.com/vCN2Ndt.png';
const MANGA_FA_URL = 'https://i.imgur.com/rM7M0ws.png';

// Custom shader material for the cross-fade effect
const CrossFadeMaterial = shaderMaterial(
  // Uniforms
  {
    tex1: new THREE.Texture(),
    tex2: new THREE.Texture(),
    progress: 0.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D tex1;
    uniform sampler2D tex2;
    uniform float progress;
    varying vec2 vUv;
    void main() {
      vec4 color1 = texture2D(tex1, vUv);
      vec4 color2 = texture2D(tex2, vUv);
      gl_FragColor = mix(color1, color2, progress);
    }
  `
);

// Extend R3F to recognize the custom material
extend({ CrossFadeMaterial });

interface MangaPageProps {
  imageUrls: string[];
}

const MangaPage: React.FC<MangaPageProps> = ({ imageUrls }) => {
  const materialRef = useRef<any>(null!);
  const textures = useTexture(imageUrls);
  
  const activeIndexRef = useRef(0);
  const timerRef = useRef(0);

  const PAUSE_DURATION = 3.0;
  const FADE_DURATION = 1.0;
  const CYCLE_DURATION = PAUSE_DURATION + FADE_DURATION;
  
  useEffect(() => {
    if (textures && textures.length > 0) {
      textures.forEach(texture => {
        if (texture) {
            texture.colorSpace = THREE.SRGBColorSpace;
        }
      });
      // Set initial textures
      if (materialRef.current && textures.length >= 2) {
        materialRef.current.tex1 = textures[0];
        materialRef.current.tex2 = textures[1];
      }
    }
  }, [textures]);

  useFrame((_state, delta) => {
    if (!materialRef.current || textures.length < 2) return;

    timerRef.current += delta;
    let progress = 0;

    // Calculate progress only during the fade phase
    if (timerRef.current > PAUSE_DURATION) {
      progress = Math.min(1.0, (timerRef.current - PAUSE_DURATION) / FADE_DURATION);
    }
    
    // Update shader uniform
    materialRef.current.progress = progress;

    // Check if the cycle is complete
    if (timerRef.current >= CYCLE_DURATION) {
      // Reset timer for the next cycle
      timerRef.current = 0; 
      
      // Move to the next texture index
      activeIndexRef.current = (activeIndexRef.current + 1) % textures.length;
      
      const currentTexture = textures[activeIndexRef.current];
      const nextTexture = textures[(activeIndexRef.current + 1) % textures.length];

      // Atomically swap textures for the new cycle
      if (currentTexture && nextTexture) {
          materialRef.current.tex1 = currentTexture;
          materialRef.current.tex2 = nextTexture;
      }

      // Reset progress in the shader immediately
      materialRef.current.progress = 0;
    }
  });
  
  const initialTexture = textures[0];
  const nextTexture = textures.length > 1 ? textures[1] : textures[0];
  
  if (!initialTexture || !nextTexture) {
    return null;
  }
  
  const aspect = 1 / 1.414;
  const scale = 4.5;
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.5}
    >
      <Box args={[scale * aspect, scale, 0.1]} rotation={[0, -0.4, -0.05]}>
        {/* @ts-ignore */}
        <crossFadeMaterial 
          ref={materialRef} 
          tex1={initialTexture}
          tex2={nextTexture}
          side={THREE.DoubleSide}
          transparent={true}
        />
      </Box>
    </Float>
  );
};


interface HeroSceneProps {
    images?: string[];
}

export const HeroScene: React.FC<HeroSceneProps> = ({ images }) => {
    const defaultImages = [MANGA_EN_URL, MANGA_FA_URL];
    const displayImages = images && images.length > 0 ? images : defaultImages;

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
      {/* FIX: Suppress TypeScript error for R3F primitive. */}
      {/* @ts-ignore */}
      <ambientLight intensity={1.5} />
      {/* FIX: Suppress TypeScript error for R3F primitive. */}
      {/* @ts-ignore */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* FIX: Suppress TypeScript error for R3F primitive. */}
      {/* @ts-ignore */}
      <pointLight position={[-5, 0, 5]} intensity={0.5} color="#a78bfa" />
      <Suspense fallback={null}>
        <MangaPage imageUrls={displayImages} />
      </Suspense>
      <Sparkles count={200} scale={15} size={2} speed={0.4} color="#a78bfa" opacity={0.5}/>
    </Canvas>
  );
};