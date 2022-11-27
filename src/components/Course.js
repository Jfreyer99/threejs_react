import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei'

useGLTF.preload('/Plane_big.gltf');

const Course = ({ getMesh }) => {
    const group = useRef();
    const [geometrys, setGeometrys] = useState([]);

    const click = (e) => {
        getMesh(group);
    }

    const { nodes, materials } = useGLTF('/course_standard.gltf');

    //Assing the objects in nodes to an array and push all the needed geometries into the components State
    const array = Object.values(nodes)
    for (let ele of array) {
        geometrys.push(ele.geometry);
    }

    return (
        <group onClick={(e) => click(e)} ref={group} dispose={null}>
            {geometrys.map((geo, index) =>
                <mesh key={index} geometry={geo} material={materials.Green} rotation={[-Math.PI / 2, 0, 0]} scale={[3, 3, 3]}></mesh>
            )}
        </group>

    );
}

useGLTF.preload('/course_standard.gltf');

//<mesh geometry={nodes.mesh_0.geometry} material={materials.Green} rotation={[-Math.PI / 2, 0, 0]} />
//nodes.standard.geometry.center();
//<mesh onClick={(e) => click(e)} ref={mesh} geometry={nodes.mesh_0_1.geometry} material={materials.Green} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[300, 50, 0.03]}>
//</mesh>

export default Course;