import React from 'react';
//csss
import "./ModifyButton.css";

export const ModifyButton = ({ clickFunction }) => {
    return (
        <button className='modifyButtonDesign' onClick={clickFunction}>Editar</button>
    )
};
