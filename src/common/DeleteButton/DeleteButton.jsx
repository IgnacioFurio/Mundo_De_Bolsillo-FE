import React from 'react';
//css
import './DeleteButton.css';

export const DeleteButton = ({ clickFunction }) => {

    return (
        <div className='deleteButtonDesign d-flex justify-content-center align-items-center pt-1' onClick={clickFunction}><p className='deleteText fw-bold'>Borrar</p></div>
    )
};