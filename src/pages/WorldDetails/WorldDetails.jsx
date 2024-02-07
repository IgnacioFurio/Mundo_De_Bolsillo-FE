import React, { useEffect } from 'react'
//redux
import { useSelector } from 'react-redux';
import { worldData } from '../../services/world.slice';

export const WorldDetails = () => {

    const dataRdx = useSelector(worldData)
    
    return (
        <div>WorldDetails</div>
    )
};
