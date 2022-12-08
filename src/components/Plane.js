import React from 'react';

const Plane = () => {

    return (

        <mesh rotation-x={-Math.PI / 2} receiveShadow>
            <boxGeometry attach="geometry" args={[8, 8, 0.2]} />
            <meshPhongMaterial attach="material" color="grey" />
        </mesh>

    );
}

export default Plane;