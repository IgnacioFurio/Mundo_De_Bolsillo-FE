import React, { useEffect, useState } from 'react'
//helper
import { nextPrevButtonDesign } from '../../helpers/NextPrevButton.helper';
//css
import "./NextPrevButton.css";

export const NetxtPrevButton = ({ action, clickFunction }) => {
    const [ buttonDesign, setButtonDesign ] = useState("");

    useEffect(() => {
        setButtonDesign(nextPrevButtonDesign(action));
    });

    return (
        <>
            {action === "Submit" ? <button className={buttonDesign} onClick={clickFunction}>Finalizar</button> : <button className={buttonDesign} onClick={clickFunction}></button>}
        </>
    )
}
