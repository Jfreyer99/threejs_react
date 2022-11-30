import React, { useState, useEffect } from 'react'
import Editor from './Editor'
import WebGL from './WebGL'

const EditorWrapper = () => {

    const [currentFileName, setCurrentFileName] = useState({ filename: '', event: null });
    const [editorShapes, setEditorShapes] = useState([]);

    const getFilename = (obj) => {
        setCurrentFileName({ filename: obj.filename.filename, event: obj.event.event });
    }


    const getShapesOnCanvas = (shapes) => {
        setEditorShapes(shapes);
    }

    return (
        <div id="editorWrapper">
            <div id="webgl">
                <WebGL getShapesOnCanvas={getShapesOnCanvas} filenameObj={currentFileName}></WebGL>
            </div>
            <div id="editor">
                <Editor editorShapes={editorShapes} getFilename={getFilename}></Editor>
            </div>
        </div>
    )
}

export default EditorWrapper