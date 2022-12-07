import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import uuid from 'react-uuid';
import { Canvas, useFrame } from '@react-three/fiber';
import { useControls } from 'leva'
import * as THREE from 'three';
import { OrbitControls, TransformControls, Environment, Stats, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, Glitch, Pixelation, SSAO, Grid, HueSaturation, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import Plane from './Plane'
import Model from './GLTF_Model'

const WebGL = ({ shapesOnCanvas, setShapesOnCanvas, currentMesh, setCurrentMesh, groups }) => {

    const [mode, setMode] = useState('translate');

    const orbitControls = useRef();
    const transformControls = useRef();


    useEffect(() => {
        setShapesOnCanvas([...shapesOnCanvas]);
    }, [])

    const setCameraTargetToMesh = () => {
        const mesh_pos = currentMesh.position;
        const vector = new THREE.Vector3(mesh_pos.x, mesh_pos.y, mesh_pos.z);
        orbitControls.current.target = vector;
    }

    const resetCameraTargetToCourse = () => {
        const vector = new THREE.Vector3(0, 1.3, 0);
        orbitControls.current.target = vector;
    }

    useEffect(() => {
        if (orbitControls.current !== undefined) {
            if (currentMesh === undefined || currentMesh === null) {
                resetCameraTargetToCourse();
            }
            else {
                setCameraTargetToMesh();
            }
        }
    }, [currentMesh])

    useEffect(() => {
        if (shapesOnCanvas.length === 0 && transformControls.current !== undefined) {
            transformControls.current.detach();
        }
    }, [shapesOnCanvas])

    useEffect(() => {
        if (groups.length > 0) {
            setCurrentMesh(groups[groups.length - 1].current);
        }
        else if (groups.length === 0) {
            if (transformControls.current !== undefined) {
                transformControls.current.detach();
            }
        }
    }, [groups])

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
            //resetCameraTargetToCourse();
            setCurrentMesh();
        }
    }

    const mouseUp = (e) => {
        if (currentMesh !== undefined || currentMesh !== null) {
            setCameraTargetToMesh();
        }
    }

    return (
        <Canvas
            shadows
            id="canvas"
            tabIndex="-1"
            onKeyDown={(e) => getMode(e)}
            onClick={(e) => clickOnCanvas(e)}
        >

            <Plane></Plane>
            <Model receiveShadow={true} castShadow={true} key={uuid()} scale={[7, 7, 7]} filename='/course_standard.gltf'></Model>

            <directionalLight position-x={-100} position-y={100} position-z={-100} castShadow receiveShadow intensity={1.3} />

            {[...shapesOnCanvas]}
            <Environment preset="forest" background blur={0.5} />
            <PerspectiveCamera fov={70} position={[5, 5, 5]} makeDefault />
            <OrbitControls
                minAzimuthAngle={undefined}
                maxAzimuthAngle={undefined}
                minPolarAngle={-Math.PI}
                maxPolarAngle={Math.PI / 2}
                ref={orbitControls} makeDefault={true}
            />
            <TransformControls onMouseUp={(e) => mouseUp(e)} object={currentMesh} translationSnap={0.01} rotationSnap={Math.PI / 16} ref={transformControls} mode={mode} />
        </Canvas >

    );
}

export default WebGL;