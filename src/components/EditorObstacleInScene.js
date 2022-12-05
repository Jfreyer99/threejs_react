import React, { useState } from 'react'

const EditorObstacleInScene = ({ img, id, name, onObstacleClick }) => {

    const [isSelected, setIsSelected] = useState(false);


    const onObstacleClickInScene = (e, key) => {
        // if (e.button === 1) {
        //     setIsSelected(prev => !prev)
        // }
        onObstacleClick(e, key);
    }

    const onKey = (e) => {
        setIsSelected(prev => !prev)
    }

    return (
        <div key={id} className={isSelected ? "obstacleOnCanvas selected" : "obstacleOnCanvas"} tabIndex="0" onKeyDown={e => onKey(e)} onClick={(e) => onObstacleClickInScene(e, id)}>
            <div className='obstacleWrapper'>
                <img className='obstacleImage' src={img}></img>
                <div className='obstacleName'> {name} </div>
            </div>
        </div>
    );
}

export default EditorObstacleInScene;