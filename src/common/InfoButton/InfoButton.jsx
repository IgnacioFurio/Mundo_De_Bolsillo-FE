import React, { useEffect, useState } from 'react';
//bootstrap
import { Container, Row, Col } from 'react-bootstrap';
//Css
import "./InfoButton.css";
//assets
import infoButton from "../../assets/showMoreInfo.png";

export const InfoButton = ({clickFunction, status}) => {
    
    return (
        <div className='text-success fs-6 fw-bold'onClick={clickFunction}>
            {status ? "- info" : "+ info"}
        </div>
    )
};
