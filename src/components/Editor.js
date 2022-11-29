import React from 'react';

const Editor = ({ getFilename }) => {

    const obstacleClick = (e, filename) => {
        getFilename({ filename: filename, event: e });
    }

    return (
        <>
            <div onClick={(e) => obstacleClick(e, '/obstacels/wall_with_hole.gltf')} className='obstacle'> Hello </div>
            <div onClick={(e) => obstacleClick(e, '/obstacels/pyramid.gltf')} className='obstacle'> Hello </div>
            <div onClick={(e) => obstacleClick(e, '/obstacels/pyramid.gltf')} className='obstacle'> Hello </div>
        </>
    )
}

export default Editor