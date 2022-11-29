import React from 'react';

import EditorObstacle from './EditorObstacle';

const Editor = ({ getFilename }) => {

    const obstacleClick = (obj) => {
        getFilename(obj);
    }

    return (
        <>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/pyramid.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/pyramid.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/pyramid.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/pyramid.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/pyramid.gltf'></EditorObstacle>
            <EditorObstacle getObstacle={obstacleClick} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
        </>
    )
}

export default Editor