import React, { useState, useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three'
import * as THREE from 'three'

const Control = ({ currentMesh }) => {

    const ref = useRef();

    useFrame(() => {
        if (currentMesh !== null && currentMesh !== undefined) {
            if (ref.current.target !== new THREE.Vector3(currentMesh.position.x, currentMesh.position.y, currentMesh.position.z)) {
                const mesh_pos = currentMesh.position;
                const vector = new THREE.Vector3(mesh_pos.x, mesh_pos.y, mesh_pos.z);
                ref.current.target.x = MathUtils.lerp(ref.current.target.x, vector.x, 0.2);
                ref.current.target.y = MathUtils.lerp(ref.current.target.y, vector.y, 0.2);
                ref.current.target.z = MathUtils.lerp(ref.current.target.z, vector.z, 0.2);
            }
        }
        else {
            ref.current.target.x = MathUtils.lerp(ref.current.target.x, 0, 0.2);
            ref.current.target.y = MathUtils.lerp(ref.current.target.y, 1.2, 0.2);
            ref.current.target.z = MathUtils.lerp(ref.current.target.z, 0, 0.2);
        }
    });

    return <OrbitControls
        minDistance={1}
        maxDistance={10}
        enableDamping={true}
        dampingFactor={0.3}
        rotateSpeed={0.4}
        minAzimuthAngle={undefined}
        maxAzimuthAngle={undefined}
        minPolarAngle={-Math.PI}
        maxPolarAngle={Math.PI / 2}
        ref={ref}
        makeDefault={true}
    >
    </OrbitControls>
}

export default Control