import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei'

const Model = ({ getMesh, filename, name, position }) => {
    const group = useRef(null);
    const [geometrys, setGeometrys] = useState([]);
    const [material, setMaterial] = useState([]);

    const click = (e) => {
        if (filename !== '/course_standard.gltf') {
            getMesh(group);
        }
    }

    const { nodes } = useGLTF(filename);

    //Assing the objects in nodes to an array and push all the needed geometries into the components State
    const arrayNodes = Object.values(nodes)

    for (let ele of arrayNodes) {
        geometrys.push(ele.geometry);
        material.push(ele.material);
    }

    if (arrayNodes.length === 1) { geometrys[0].center(); }

    return (
        <group castShadow receiveShadow position={position} onClick={(e) => click(e)} ref={group} dispose={null}>
            {geometrys.map((geo, index) =>
                <mesh castShadow receiveShadow key={index} geometry={geo} material={material[index]} rotation={[-Math.PI / 2, 0, 0]} scale={[7, 7, 7]}>
                </mesh>
            )}
        </group>
    );
}

export default Model;