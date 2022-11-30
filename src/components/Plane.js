import React from 'react';
import planeTexture from './../assets/planeTexture.jpg'
import { useTexture } from '@react-three/drei';

const Plane = () => {

    const texture = useTexture(planeTexture);

    return (

        <mesh reveiceShadow rotation-x={- Math.PI / 2} position={[0, -0.01, 0]}>
            <planeBufferGeometry attach="geometry" args={[10, 10]} />
            <meshPhysicalMaterial map={texture} />
        </mesh>

    );
}

export default Plane;