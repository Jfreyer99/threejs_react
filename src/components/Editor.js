import React, { useState, useEffect } from 'react'
import pyramid from './../assets/pyramid.png'
import wallWithHole from './../assets/wall_with_hole.png'
import ring from './../assets/ring.png'
import wall from './../assets/wall.png'
import castle from './../assets/castle.png'
import hut from './../assets/hut.png'
import pillar from './../assets/pillar.png'
import ramp from './../assets/ramp.png'
import windmill from './../assets/windmill.png'

import EditorObstacle from './EditorObstacle';

const Editor = ({ editorShapes, getFilename }) => {


    const obstacleClick = (obj) => {
        getFilename(obj);
    }

    const deleteEle = (e, key) => {
        if (e.detail === 2) {

        }
    }

    return (
        <>
            <div id='obstacleList'>
                <EditorObstacle name='Wall with hole' getObstacle={obstacleClick} img={wallWithHole} filename='/obstacels/wall_with_hole.gltf'></EditorObstacle>
                <EditorObstacle name='Pyramid' getObstacle={obstacleClick} img={pyramid} filename='/obstacels/pyramid.gltf'></EditorObstacle>
                <EditorObstacle name='Ring' getObstacle={obstacleClick} img={ring} filename='/obstacels/ring.gltf'></EditorObstacle>
                <EditorObstacle name='Wall' getObstacle={obstacleClick} img={wall} filename='/obstacels/wall.gltf'></EditorObstacle>
                <EditorObstacle name='Castle' getObstacle={obstacleClick} img={castle} filename='/obstacels/Castle.gltf'></EditorObstacle>
                <EditorObstacle name='Hut' getObstacle={obstacleClick} img={hut} filename='/obstacels/hut.gltf'></EditorObstacle>
                <EditorObstacle name='Pillar' getObstacle={obstacleClick} img={pillar} filename='/obstacels/pillar.gltf'></EditorObstacle>
                <EditorObstacle name='Ramp' getObstacle={obstacleClick} img={ramp} filename='/obstacels/ramp.gltf'></EditorObstacle>
                <EditorObstacle name='windmill' getObstacle={obstacleClick} img={windmill} filename='/obstacels/windmill.gltf'></EditorObstacle>
            </div>
            <div id='obstaclesInScene'>
                {editorShapes.map((ele, index) =>
                    <div onClick={e => deleteEle(e, ele.key)}> {ele.key} </div>
                )}
            </div>
        </>
    )
}
export default Editor