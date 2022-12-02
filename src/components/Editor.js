import React from 'react'
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


const Editor = ({ getFilename, shapesOnCanvas, setShapesOnCanvas, currentMesh, setCurrentMesh, groups, setGroups }) => {

    const obstacleClick = (obj) => {
        getFilename(obj);
    }

    const onObstacleClick = (e, key) => {
        if (e.detail === 1) {
            const selectedMesh = groups.filter(ele => ele.current.number === key).pop().current;
            setCurrentMesh(selectedMesh);
        }
        else if (e.detail === 2) {
            //Delete Shape on Canvas
            const obstacleNew = shapesOnCanvas.filter(ele => ele.key !== key);
            setShapesOnCanvas(obstacleNew);

            //Delete Group from state
            const meshToRemove = groups.filter(ele => ele.current.number === key)[0].current;
            const meshesNew = groups.filter(ele => ele.current !== meshToRemove);
            setGroups(meshesNew);
            console.log(meshesNew[meshesNew.length - 1]);
            setCurrentMesh(meshesNew[meshesNew.length - 1]);
        }
    }

    const getImageFromName = (name) => {
        switch (name) {
            case 'wall_with_hole':
                return wallWithHole;
            case 'pyramid':
                return pyramid;
            case 'ring':
                return ring;
            case 'wall':
                return wall;
            case 'Castle':
                return castle;
            case 'hut':
                return hut;
            case 'pillar':
                return pillar;
            case 'ramp':
                return ramp;
            case 'windmill':
                return windmill;
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
                <EditorObstacle name='Windmill' getObstacle={obstacleClick} img={windmill} filename='/obstacels/windmill.gltf'></EditorObstacle>
            </div>
            <div id='obstaclesInScene'>
                {shapesOnCanvas.map(
                    ele =>
                        <div key={ele.key} className={'obstacleOnCanvas'} onClick={(e) => onObstacleClick(e, ele.key)}>
                            <div className='obstacleWrapper'>
                                <img className='obstacleImage' src={getImageFromName(ele.props.name)}></img>
                                <div className='obstacleName'> {ele.props.name} </div>
                            </div>
                        </div>)}
            </div>
        </>
    )
}
export default Editor
