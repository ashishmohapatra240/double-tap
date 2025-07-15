'use client';

import React, { useRef } from 'react'
import { useGLTF, useAnimations, MeshTransmissionMaterial, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
// import { useControls } from 'leva'
import { Group } from 'three'

interface ModelProps {
  [key: string]: any
}

export function Model(props: ModelProps) {
  const group = useRef<Group>(null!)
  const meshRef = useRef<any>(null!)
  const { nodes, materials, animations } = useGLTF('/models/Astriks.glb')
  const { actions } = useAnimations(animations, group)
  const { viewport } = useThree()

  const materialProps = {
    thickness: 0.2,
    roughness: 0,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.02,
    backside: true,
  }

  // Rotation animation - only for the mesh
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      meshRef.current.rotation.x += 0.001
    }
  })

  return (
    <group ref={group} {...props} dispose={null} scale={viewport.width / 2.25}>
      {/* <Text 
        position={[0, 0, -1]} 
        fontSize={0.5} 
        color="white" 
        anchorX="center" 
        anchorY="middle"
        font="/font/PowerGrotesk-Regular.ttf"
      >
        Double Tap
      </Text> */}
      <group name="Scene">
        <mesh
          ref={meshRef}
          name="V2"
          castShadow
          receiveShadow
          geometry={(nodes as any).V2.geometry}
          rotation={[-0.289, 0, 0]}
        >
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Astriks.glb') 