import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls, Environment } from '@react-three/drei';

import Box from './Box'
import Model from './GLTF_Model'

const WebGL = ({ filenameObj }) => {

    const [mode, setMode] = useState('translate');

    const [currentMesh, setCurrentMesh] = useState();

    const getMesh = (mesh) => {
        if (mesh !== currentMesh) {
            setCurrentMesh(mesh);
            transformControls.current.attach(mesh.current)
        }
    }

    const [cameraPosition, setCameraPosition] = useState([5, 5, 5]);

    const [shapesOnCanvas, setShapesOnCanvas] = useState([<Model getMesh={getMesh} filename='/course_standard.gltf'></Model>,
    <Box getMesh={getMesh} ></Box>]);

    useEffect(() => {
        //Construct Model here
        if (filenameObj.filename !== '') {
            setShapesOnCanvas([...shapesOnCanvas, <Model getMesh={getMesh} filename={filenameObj.filename}></Model>]);
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
            shadows
            camera={{ position: cameraPosition }}
            id="canvas"
            tabIndex="0"
            onKeyDown={(e) => getMode(e)}
            onClick={(e) => clickOnCanvas(e)}
        >

            <gridHelper args={[8, 8]}></gridHelper>

            <ambientLight intensity={0.1} />
            <directionalLight intensity={1} />
            <OrbitControls ref={orbitControls} makeDefault={true} />

            {[...shapesOnCanvas]}

            <Environment preset="forest" background blur={0.5} />
            <TransformControls onObjectChange={(e) => objectChanged(e)} ref={transformControls} mode={mode} />
        </Canvas >
    );
}
//<Model getMesh={getMesh} filename='/course_standard.gltf'></Model>
//<Model getMesh={getMesh} filename='/obstacels/wall_with_hole.gltf'></Model>
//<Model getMesh={getMesh} filename='/obstacels/pyramid.gltf'></Model>
export default WebGL;