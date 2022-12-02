import React, { useState, useRef, useEffect } from 'react';
import uuid from 'react-uuid';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls, Environment } from '@react-three/drei';

import Box from './Box'
import Model from './GLTF_Model'
import Plane from './Plane'

const WebGL = ({ filenameObj, shapesOnCanvas, setShapesOnCanvas }) => {

    const [mode, setMode] = useState('translate');

    const [currentMesh, setCurrentMesh] = useState();

    const getMesh = (mesh) => {
        if (mesh !== currentMesh) {
            setCurrentMesh(mesh);
            transformControls.current.attach(mesh.current)
        }
    }

    const [cameraPosition, setCameraPosition] = useState([5, 5, 5]);

    useEffect(() => {
        setShapesOnCanvas([...shapesOnCanvas]);
    }, [])

    useEffect(() => {
        //Construct Model here
        if (filenameObj.filename !== '') {
            const name = filenameObj.filename.split('/').pop().split('.')[0];
            setShapesOnCanvas([...shapesOnCanvas, <Model position={[0, 1.4, 0]} key={uuid()} name={name} getMesh={getMesh} filename={filenameObj.filename}></Model>]);
        }
    }, [filenameObj])

    const orbitControls = useRef();
    const transformControls = useRef();

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

    const objectChanged = (e) => {
        console.log(e.target.position);
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
            <Model key={uuid()} receiveShadow castShadow getMesh={getMesh} filename='/course_standard.gltf'></Model>
            <directionalLight position-y={5} position-z={10} position-x={10} castShadow shadow-mapSize-height={512}
                shadow-mapSize-width={512} intensity={1} />
            <OrbitControls
                minAzimuthAngle={undefined}
                maxAzimuthAngle={undefined}
                minPolarAngle={-Math.PI}
                maxPolarAngle={Math.PI / 2}
                ref={orbitControls} makeDefault={true} />

            {[...shapesOnCanvas]}

            <Environment preset="forest" background blur={0.5} />
            <TransformControls translationSnap={0.05} rotationSnap={Math.PI / 16} onObjectChange={(e) => objectChanged(e)} ref={transformControls} mode={mode} />
        </Canvas >
    );
}

export default WebGL;