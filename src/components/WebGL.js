import React, { useState, useRef, useEffect, useMemo } from 'react';
import uuid from 'react-uuid';
import { Canvas, useFrame } from '@react-three/fiber';
import { useControls } from 'leva'
import { OrbitControls, TransformControls, Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, Glitch, Pixelation, SSAO, Grid, HueSaturation, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import Plane from './Plane'
import Model from './GLTF_Model'

const WebGL = ({ shapesOnCanvas, setShapesOnCanvas, currentMesh, setCurrentMesh, groups }) => {

    const [mode, setMode] = useState('translate');
    const [cameraPosition, setCameraPosition] = useState([5, 5, 5]);

    const orbitControls = useRef();
    const transformControls = useRef();

    const options = useMemo(() => {
        return {
            x: { value: 0, min: -100, max: 100, step: 0.01 },
            y: { value: 3, min: 0, max: 100, step: 0.01 },
            z: { value: 0, min: -100, max: 100, step: 0.01 }
        }
    }, [])

    const options2 = useMemo(() => {
        return {
            hue: { value: 0, step: 0.01 },
            saturation: { value: 3, step: 0.01 },
        }
    }, [])

    const cam_pos = useControls('Camera', options)
    const hue = useControls('Hue', options2);

    useEffect(() => {
        setShapesOnCanvas([...shapesOnCanvas]);
    }, [])

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
            console.log("detach")
            console.log(transformControls.current)
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
        }
    }

    const objectChanged = (e) => {
        //console.log(e.target.position);
    }

    return (
        <Canvas
            shadows
            camera={{ position: [-5, 2, 10], fov: 60 }}
            id="canvas"
            tabIndex="-1"
            onKeyDown={(e) => getMode(e)}
            onClick={(e) => clickOnCanvas(e)}
        >
            <EffectComposer>
                <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={1.3} height={480} />
                <Bloom luminanceThreshold={0} luminanceSmoothing={1.2} height={100} />

                {/* <HueSaturation
                    blendFunction={BlendFunction.NORMAL} // blend mode
                    hue={hue.hue} // hue in radians
                    saturation={hue.saturation} // saturation in radians
                /> */}

                {/* <Grid
                    blendFunction={BlendFunction.SOFT_LIGHT} // blend mode
                    scale={5.2} // grid pattern scale
                    lineWidth={10} // grid pattern line width
                    size={{ width: 10, height: 10 }} // overrides the default pass width and height
                /> */}

                {/* <Pixelation
                    granularity={50} // pixel granularity
                /> */}

                {/* <Glitch duration={0} delay="10"></Glitch> */}
                {/* <Noise opacity={0.02} /> */}
                {/* <Vignette eskil={false} offset={0.1} darkness={0.7} /> */}
                {/* <gridHelper args={[8, 8]}></gridHelper> */}
                <Plane></Plane>
                <Model receiveShadow={true} castShadow={true} key={uuid()} filename='/course_standard.gltf'></Model>

                <directionalLight position-x={-100} position-y={100} position-z={-100} castShadow receiveShadow intensity={1.3} />


                {[...shapesOnCanvas]}
                <Environment preset="forest" background blur={0.5} />
            </EffectComposer>

            <OrbitControls
                minAzimuthAngle={undefined}
                maxAzimuthAngle={undefined}
                minPolarAngle={-Math.PI}
                maxPolarAngle={Math.PI / 2}
                ref={orbitControls} makeDefault={true} camera={null} />
            <TransformControls object={currentMesh} translationSnap={0.05} rotationSnap={Math.PI / 16} onObjectChange={(e) => objectChanged(e)} ref={transformControls} mode={mode} />
        </Canvas >
    );
}

export default WebGL;