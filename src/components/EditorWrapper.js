import React from 'react'
import { useState } from 'react';
import Editor from './Editor'
import WebGL from './WebGL'

const EditorWrapper = () => {

    const [currentFileName, setCurrentFileName] = useState({ filename: '', event: null });

    const getFilename = (obj) => {
        setCurrentFileName({ filename: obj.filename.filename, event: obj.event.event });
    }

    return (
        <div id="editorWrapper">
            <div id="webgl">
                <WebGL filenameObj={currentFileName}></WebGL>
            </div>
            <div id="editor">
                <Editor getFilename={getFilename}></Editor>
            </div>
        </div>
    )
}

export default EditorWrapper