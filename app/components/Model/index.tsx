'use client';

import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, useAnimations, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Group, Mesh, Object3D, BufferGeometry, DoubleSide } from 'three'

interface MeshNode extends Object3D {
  geometry: BufferGeometry
}

interface GLTFNodes {
  [key: string]: Object3D
  V2: MeshNode
}

interface ModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  isVisible?: boolean
}

// Detect if device is low-end
const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check for low memory (< 4GB)
  const memory = (navigator as { deviceMemory?: number }).deviceMemory;
  const hasLowMemory = memory !== undefined && memory < 4;
  
  // Check for slow connection
  const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
  const hasSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  
  return isMobile || hasLowMemory || hasSlowConnection;
};

export function Model(props: ModelProps) {
  const { isVisible: isVisibleProp = true, ...restProps } = props;
  const group = useRef<Group>(null!)
  const meshRef = useRef<Mesh>(null!)
  const { nodes, animations } = useGLTF('/models/Astriks.glb')
  useAnimations(animations, group)
  const { viewport, invalidate } = useThree()
  
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);
  
  useEffect(() => {
    setPerformanceMode(isLowEndDevice() || false);
  }, []);
  
  // Pause animation when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const materialProps = performanceMode ? {
    thickness: 0.5,
    roughness: 0.3,
    transmission: 0.8,
    ior: 1.2,
    chromaticAberration: 0,
    backside: false,
    fog: false,
    side: DoubleSide,
    color: "#F15A24",
  } : {
    thickness: 0.8,
    roughness: 0.2,
    transmission: 1,
    ior: 1.25,
    chromaticAberration: 0.02,
    backside: true,
    fog: true,
    side: DoubleSide,
    color: "#F15A24",
  };

  const frameCount = useRef(0);
  const throttleFrames = performanceMode ? 3 : 1;
  
  useFrame(() => {
    if (!isVisibleProp || !isTabVisible || !meshRef.current) return;
    
    frameCount.current++;
    if (frameCount.current % throttleFrames === 0) {
      const speed = performanceMode ? 0.002 : 0.001;
      meshRef.current.rotation.y += speed;
      meshRef.current.rotation.x += speed;
    }
    
    // Always invalidate when animating for smooth rotation with demand frameloop
    invalidate();
  })

  return (
    <group ref={group} {...restProps} dispose={null} scale={viewport.width / 2.25}>
      <group name="Content">
        <group name="Scene">
          <mesh
            ref={meshRef}
            name="V2"
            castShadow
            receiveShadow
            geometry={(nodes as GLTFNodes).V2.geometry}
            rotation={[-0.289, 0, 0]}
          >
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Astriks.glb') 