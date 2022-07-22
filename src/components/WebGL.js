import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';

import Box from './Box'

const WebGL = () => {
    const orbitControls = useRef();

    const [mode, setMode] = useState('translate');
    const [enabled, setEnabled] = useState(false);
    const [currentMesh, setCurrentMesh] = useState();

    const getMode = (e) => {
        switch (e.key) {
            case 's': setMode('scale');
                break;
            case 'g': setMode('translate');
                break;
            case 'r': setMode('rotate');
                break;
        }
    }

    const getMesh = (mesh) => {
        if (mesh !== currentMesh) {
            setEnabled(true);
            setCurrentMesh(mesh);
            console.log(mesh.current);
        }
    }

    return (
        <Canvas
            camera={{ position: [5, 5, 5] }}
            id="canvas"
            tabIndex="0"
            onKeyDown={(e) => getMode(e)}
        >
            <gridHelper args={[100, 100]}></gridHelper>

            <ambientLight intensity={1.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.4} />

            <OrbitControls ref={orbitControls} makeDefault={true} />

            <Box first={true} getMesh={getMesh}></Box>
            <Box getMesh={getMesh}></Box>
            <Box getMesh={getMesh}></Box>
            <TransformControls enabled={enabled} object={currentMesh} mode={mode} />
        </Canvas >
    );
}

export default WebGL;