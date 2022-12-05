import React from 'react';
import planeTexture from './../assets/planeTexture.jpg'
import { useTexture } from '@react-three/drei';

const Plane = () => {

    const texture = useTexture(planeTexture);

    return (

        <mesh rotation-x={-Math.PI / 2} receiveShadow>
            <boxGeometry attach="geometry" args={[8, 8, 0.2]} />
            <meshPhongMaterial attach="material" color="grey" />
        </mesh>

    );
}

export default Plane;