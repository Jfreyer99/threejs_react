import React from 'react';


const EditorObstacle = ({ filename, getObstacle }) => {

    const obstacleClick = (event, filename) => {
        getObstacle({ filename: filename, event: event });
    }

    return (
        <div onClick={(e) => obstacleClick(e, { filename })} className='obstacle'> Hello </div>
    );
}

export default EditorObstacle;