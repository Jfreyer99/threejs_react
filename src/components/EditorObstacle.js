import React from 'react'

const EditorObstacle = ({ filename, name, img, getObstacle }) => {


    const obstacleClick = (event, filename) => {
        getObstacle({ filename: filename, event: event });
    }

    return (
        <div onClick={(e) => obstacleClick(e, { filename })} className='obstacle'>
            <div className='obstacleWrapper'>
                <img className='obstacleImage' src={img} alt='Obstacle'></img>
                <div className='obstacleName'> {name} </div>
            </div>
        </div>
    );
}

export default EditorObstacle;