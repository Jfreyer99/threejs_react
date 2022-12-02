import React, { useState, useRef, useEffect, Suspense } from 'react';
import uuid from 'react-uuid';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls, Environment } from '@react-three/drei';

import Plane from './Plane'
import Model from './GLTF_Model'

const WebGL = ({ shapesOnCanvas, setShapesOnCanvas, currentMesh, setCurrentMesh }) => {

    const [mode, setMode] = useState('translate');
    const [cameraPosition, setCameraPosition] = useState([5, 5, 5]);

    const orbitControls = useRef();
    const transformControls = useRef();

    useEffect(() => {
        setShapesOnCanvas([...shapesOnCanvas]);
    }, [])

    useEffect(() => {
        if (shapesOnCanvas.length === 0 && transformControls.current !== undefined) {
            transformControls.current.detach();
        }
    }, [shapesOnCanvas])

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
            transformControls.current.detach();
        }
    }

    const objectChanged = (e) => {
        //console.log(e.target.position);
    }

    return (
        <Canvas
            shadows={true}
            camera={{ position: cameraPosition }}
            id="canvas"
            tabIndex="0"
            onKeyDown={(e) => getMode(e)}
            onClick={(e) => clickOnCanvas(e)}
        >

            <gridHelper args={[8, 8]}></gridHelper>
            <Plane></Plane>
            <Model key={uuid()} receiveShadow castShadow filename='/course_standard.gltf'></Model>
            <directionalLight position-y={5} position-z={10} position-x={10} castShadow shadow-mapSize-height={512}
                shadow-mapSize-width={512} intensity={1} />
            <OrbitControls
                minAzimuthAngle={undefined}
                maxAzimuthAngle={undefined}
                minPolarAngle={-Math.PI}
                maxPolarAngle={Math.PI / 2}
                ref={orbitControls} makeDefault={true} camera={null} />

            {[...shapesOnCanvas]}

            <Environment preset="forest" background blur={0.5} />
            <TransformControls object={currentMesh} translationSnap={0.05} rotationSnap={Math.PI / 16} onObjectChange={(e) => objectChanged(e)} ref={transformControls} mode={mode} />
        </Canvas >
    );
}

export default WebGL;