import React, { useState, useEffect } from 'react'
import Editor from './Editor'
import WebGL from './WebGL'
import uuid from 'react-uuid';
import Model from './GLTF_Model'

const EditorWrapper = () => {

    const [currentFileName, setCurrentFileName] = useState({ filename: '', event: null });
    const [currentMesh, setCurrentMesh] = useState();
    const [shapesOnCanvas, setShapesOnCanvas] = useState([]);
    const [groups, setGroups] = useState([]);

    const getMeshOnClick = (mesh) => {
        if (mesh !== currentMesh) {
            setCurrentMesh(mesh);
        }
    }

    useEffect(() => {
        //Construct Model here
        if (currentFileName.filename !== '') {

            const name = currentFileName.filename.split('/').pop().split('.')[0];
            const id = uuid();
            setShapesOnCanvas([...shapesOnCanvas,
            <Model receiveShadow={true} castShadow={true} position={[0, 1.4, 0]} id={id} groups={groups} setGroups={setGroups} key={id} name={name} getMeshOnClick={getMeshOnClick} filename={currentFileName.filename}></Model>]);
        }
    }, [currentFileName])

    const getFilename = (obj) => {
        setCurrentFileName({ filename: obj.filename.filename, event: obj.event.event });
    }

    return (
        <div id="editorWrapper">
            <div id="webgl">
                <WebGL groups={groups} currentMesh={currentMesh} setCurrentMesh={setCurrentMesh} shapesOnCanvas={shapesOnCanvas} setShapesOnCanvas={setShapesOnCanvas}></WebGL>
            </div>
            <div id="editor">
                <Editor groups={groups} setGroups={setGroups} currentMesh={currentMesh} setCurrentMesh={setCurrentMesh} shapesOnCanvas={shapesOnCanvas} setShapesOnCanvas={setShapesOnCanvas} getFilename={getFilename}></Editor>
            </div>
        </div>
    )
}

export default EditorWrapper