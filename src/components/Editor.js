import React from 'react';
import pyramid from './../assets/pyramid.png'
import wallWithHole from './../assets/wall_with_hole.png'
import ring from './../assets/ring.png'
import wall from './../assets/wall.png'

import EditorObstacle from './EditorObstacle';

const Editor = ({ getFilename }) => {

    const obstacleClick = (obj) => {
        getFilename(obj);
    }

    return (
        <>
            <EditorObstacle name='Wall with hole' getObstacle={obstacleClick} img={wallWithHole} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle name='Pyramid' getObstacle={obstacleClick} img={pyramid} filename='/obstacels/pyramid.gltf'></EditorObstacle>
            <EditorObstacle name='Ring' getObstacle={obstacleClick} img={ring} filename='/obstacels/ring.gltf'></EditorObstacle>
            <EditorObstacle name='Wall' getObstacle={obstacleClick} img={wall} filename='/obstacels/wall.gltf'></EditorObstacle>
        </>
    )
}
export default Editor