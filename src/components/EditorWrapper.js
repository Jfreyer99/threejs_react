import React from 'react'

import Editor from './Editor'
import WebGL from './WebGL'

const EditorWrapper = () => {
    return (
        <div id="editorWrapper">
            <div id="webgl">
                <WebGL></WebGL>
            </div>
            <div id="editor">
                <Editor></Editor>
            </div>
        </div>
    )
}

export default EditorWrapper