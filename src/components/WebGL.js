import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';

import Box from './Box'

const WebGL = () => {
    const orbitControls = useRef();
    const transformControls = useRef();

    const [mode, setMode] = useState('translate');
    const [currentMesh, setCurrentMesh] = useState();
    const [cameraPosition, setCameraPosition] = useState([5, 5, 5]);


    const getMode = (e) => {
        switch (e.key) {
            case 's': setMode('scale');
                break;
            case 'g': setMode('translate');
                break;
            case 'r': setMode('rotate');
                break;
            default: return;
        }
    }

    const clickOnCanvas = (e) => {
        if (e.detail === 2) {
            setCurrentMesh(null);
            transformControls.current.detach();
        }
    }

    const getMesh = (mesh) => {
        if (mesh !== currentMesh) {
            setCurrentMesh(mesh);
            transformControls.current.attach(mesh.current)
            orbitControls.current.attach(mesh.current)
            console.log("Transform", transformControls.current);
            console.log(mesh);
        }
    }
    const objectChanged = (e) => {
        setCameraPosition(e.target.positionStart)
        console.log(cameraPosition)
    }

    return (
        <Canvas
            camera={{ position: cameraPosition }}
            id="canvas"
            tabIndex="0"
            onKeyDown={(e) => getMode(e)}
            onClick={(e) => clickOnCanvas(e)}
        >
            <gridHelper args={[100, 100]}></gridHelper>

            <ambientLight intensity={1.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.4} />

            <OrbitControls ref={orbitControls} makeDefault={true} />

            <Box getMesh={getMesh}></Box>
            <Box getMesh={getMesh}></Box>
            <Box getMesh={getMesh}></Box>

            <TransformControls onObjectChange={(e) => objectChanged(e)} ref={transformControls} mode={mode} />
        </Canvas >
    );
}

export default WebGL;