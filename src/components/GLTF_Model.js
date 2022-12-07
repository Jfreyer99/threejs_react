import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei'
const Model = ({ getMeshOnClick, filename, name, position, id, groups, setGroups, castShadow, receiveShadow, scale }) => {


    const group = useRef(null);
    const [geometrys, setGeometrys] = useState([]);
    const [material, setMaterial] = useState([]);

    useEffect(() => {
        if (groups !== undefined) {
            setGroups([...groups, group.current]);
        }
    }, [group])

    const click = (e) => {
        if (filename !== '/course_standard.gltf') {
            getMeshOnClick(group.current);
        }
    }

    const { nodes } = useGLTF(filename);

    //Assing the objects in nodes to an array and push all the needed geometries into the components State
    const arrayNodes = Object.values(nodes)

    for (let ele of arrayNodes) {
        ele.geometry.computeVertexNormals();
        geometrys.push(ele.geometry);
        material.push(ele.material);
    }

    if (arrayNodes.length === 1) { geometrys[0].center(); }


    return (
        <group number={id} position={position} onClick={(e) => click(e)} ref={group} dispose={null}>
            {geometrys.map((geo, index) =>
                <mesh
                    castShadow={castShadow}
                    receiveShadow={receiveShadow}
                    key={index}
                    geometry={geo}
                    material={material[index]}
                    rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
                    {/* <meshPhongMaterial attach="material" color="green" /> */}
                    {/* <boxGeometry /> */}
                </mesh>
            )}
        </group>
    );
}

export default Model;