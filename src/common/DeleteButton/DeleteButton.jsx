import React, { useState } from 'react';
//css
import './DeleteButton.css';

export const DeleteButton = ({ gameData, clickFunction }) => {

    return (
        <button className='deleteButtonDesign' onClick={clickFunction}>Borrar</button>
    )
};
