import React from 'react';
//bootstrap
import { Container, Row, Col } from 'react-bootstrap';
//Css
import "./InfoButton.css";
//assets
import infoButton from "../../assets/showMoreInfo.png";

export const InfoButton = (showMore) => {

    return (
        <img src={infoButton} className="infoButton" onClick={showMore}/>
    )
};
