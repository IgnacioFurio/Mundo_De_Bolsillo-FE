import React, { useState } from 'react';
//css
import './DeleteButton.css';

export const DeleteButton = ({ gameData }) => {
    useState(() => {
        console.log(gameData);
    });

    return (
        <button className='deleteButtonDesign'>Borrar</button>
    )
};
