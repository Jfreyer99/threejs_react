import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls, Environment } from '@react-three/drei';
import uuid from 'react-uuid';

import Box from './Box'
import Model from './GLTF_Model'
import Plane from './Plane'

const WebGL = ({ filenameObj, getShapesOnCanvas }) => {

    const [mode, setMode] = useState('translate');

    const [currentMesh, setCurrentMesh] = useState();

    const getMesh = (mesh) => {
        if (mesh !== currentMesh) {
            setCurrentMesh(mesh);
            transformControls.current.attach(mesh.current)
        }
    }

    const [cameraPosition, setCameraPosition] = useState([5, 5, 5]);

    const [shapesOnCanvas, setShapesOnCanvas] = useState([<Model key={uuid()} receiveShadow filename='/course_standard.gltf'></Model>]);

    useEffect(() => {
        //Construct Model here
        if (filenameObj.filename !== '') {
            setShapesOnCanvas([...shapesOnCanvas, <Model key={uuid()} getMesh={getMesh} filename={filenameObj.filename}></Model>]);
            getShapesOnCanvas(shapesOnCanvas);
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
        //setCameraPosition(e.target.positionStart)
    }

    return (
        <Canvas
            camera={{ position: cameraPosition }}
            id="canvas"
            tabIndex="0"
            onKeyDown={(e) => getMode(e)}
            onClick={(e) => clickOnCanvas(e)}
        >


            <gridHelper args={[8, 8]}></gridHelper>
            <directionalLight castShadow shadow-mapSize-height={512}
                intensity={1} />

            <OrbitControls ref={orbitControls} makeDefault={true} />
            <Plane sizeX='10' sizeY='10'></Plane>
            {[...shapesOnCanvas]}

            <Environment preset="forest" background blur={0.5} />
            <TransformControls onObjectChange={(e) => objectChanged(e)} ref={transformControls} mode={mode} />
        </Canvas >
    );
}

export default WebGL;