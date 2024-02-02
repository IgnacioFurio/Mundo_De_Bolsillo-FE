import React from 'react';
//csss
import "./ModifyButton.css";

export const ModifyButton = ({ clickFunction }) => {
    return (
        <div className='modifyButtonDesign d-flex align-items-center justify-content-center pt-1' onClick={clickFunction}><p className='deleteText fw-bold'>Editar</p></div>
    )
};
