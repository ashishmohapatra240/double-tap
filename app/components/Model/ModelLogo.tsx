import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations, MeshTransmissionMaterial, Text } from '@react-three/drei';
import { DoubleSide, Group, Mesh } from 'three';

interface ModelLogoProps extends React.ComponentProps<'group'> {
    textSize?: number;
}

export function ModelLogo({ textSize = 3, ...props }: ModelLogoProps) {
    const group = useRef<Group>(null!);
    const { nodes, animations } = useGLTF('/models/Logo.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (actions && Object.keys(actions).length > 0) {
            const firstAction = actions[Object.keys(actions)[0]];
            firstAction?.play();
        }
    }, [actions]);

    const materialProps = {
        thickness: 0.8,
        roughness: 0.2,
        transmission: 1,
        ior: 1.25,
        chromaticAberration: 0.02,
        backside: true,
        fog: true,
        side: DoubleSide,
    }

    return (
        <group ref={group} {...props} dispose={null}>
            <Text
                position={[0, 0, -4]}
                fontSize={textSize}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/font/PowerGrotesk-Regular.ttf"
            >
                Speak
            </Text>
            <group name="Scene">
                <group name="Empty" scale={[1.6, 0.8, 0.8]}>
                    <mesh
                        name="Sphere"
                        castShadow
                        receiveShadow
                        geometry={(nodes.Sphere as Mesh).geometry}
                        position={[-0.466, 0, 0]}
                        scale={[0.374, 0.762, 0.782]}
                    >
                        <MeshTransmissionMaterial {...materialProps} />
                    </mesh>
                    <mesh
                        name="Sphere001"
                        castShadow
                        receiveShadow
                        geometry={(nodes.Sphere001 as Mesh).geometry}
                        position={[0.529, 0, 0]}
                        rotation={[0, 0, -0.088]}
                        scale={[0.377, 0.761, 0.782]}
                    >
                        <MeshTransmissionMaterial {...materialProps} />
                    </mesh>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/models/Logo.glb');