import React, { useState, useEffect } from 'react'
import Editor from './Editor'
import WebGL from './WebGL'

const EditorWrapper = () => {

    const [currentFileName, setCurrentFileName] = useState({ filename: '', event: null });

    const [shapesOnCanvas, setShapesOnCanvas] = useState([]);

    const getFilename = (obj) => {
        setCurrentFileName({ filename: obj.filename.filename, event: obj.event.event });
    }

    return (
        <div id="editorWrapper">
            <div id="webgl">
                <WebGL shapesOnCanvas={shapesOnCanvas} setShapesOnCanvas={setShapesOnCanvas} filenameObj={currentFileName}></WebGL>
            </div>
            <div id="editor">
                <Editor shapesOnCanvas={shapesOnCanvas} setShapesOnCanvas={setShapesOnCanvas} getFilename={getFilename}></Editor>
            </div>
        </div>
    )
}

export default EditorWrapper