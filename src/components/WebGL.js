import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Canvas, ReactThreeFiber } from '@react-three/fiber';
import * as THREE from 'three'
import { useControls } from 'leva'
import { TransformControls, Environment, Stats, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, Glitch, Pixelation, SSAO, Grid, HueSaturation, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import Plane from './Plane'
import Control from './Control'
import Model from './GLTF_Model'

const WebGL = ({ shapesOnCanvas, setShapesOnCanvas, currentMesh, setCurrentMesh, groups }) => {

    const [mode, setMode] = useState('translate');

    const transformControls = useRef();

    useEffect(() => {
        setShapesOnCanvas([...shapesOnCanvas]);
    }, [])


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


    const getModeOrReset = (e) => {
        switch (e.key) {
            case 's': setMode('scale');
                break;
            case 'g': setMode('translate');
                break;
            case 'r': setMode('rotate');
                break;
            case 'v': transformControls.current.reset();
                break;
            default: return;
        }
    }

    const clickOnCanvas = (e) => {
        if (e.detail === 2) {
            transformControls.current.detach();
            setCurrentMesh();
        }
    }

    return (
        <Canvas
            shadows
            id="canvas"
            tabIndex="-1"
            onKeyDown={(e) => getModeOrReset(e)}
            onClick={(e) => clickOnCanvas(e)}
        >
            <directionalLight
                position-x={-100}
                position-y={100}
                position-z={-100}
                castShadow
                intensity={1.3}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            <Plane></Plane>
            <Model receiveShadow={true} castShadow={true} key={uuidv4()} scale={[7, 7, 7]} filename='/course_standard.gltf'></Model>
            {[...shapesOnCanvas]}

            <EffectComposer>
                <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.8} />
            </EffectComposer>


            <Environment preset="forest" background blur={0.5} />
            <PerspectiveCamera fov={70} position={[5, 5, 5]} makeDefault />
            <Control currentMesh={currentMesh} />
            <TransformControls object={currentMesh} translationSnap={0.01} rotationSnap={Math.PI / 16} ref={transformControls} mode={mode} />
        </Canvas >

    );
}

export default WebGL;