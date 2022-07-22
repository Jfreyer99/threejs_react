import React, { useRef, useEffect } from 'react'

const Box = ({ getMesh, first }) => {
    const mesh = useRef();

    useEffect(() => {
        if (first) {
            click();
        }
    }, []);

    const click = (e) => {
        getMesh(mesh);
    }

    return (
        <mesh onClick={(e) => click(e)} ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'hotpink'} />
        </mesh>
    );
}
export default Box;