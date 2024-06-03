import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//components
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';
//bootstrap
import {  Container, Row, Col } from 'react-bootstrap';
//css
import flechaAbajo from '../../assets/FlechaAbajo.png'
import "./LocationCard.css"

export const LocationCard = ({ locationsData, worldsData }) => {

    const navigate = useNavigate();

    const [ locations, setLocations ] = useState(locationsData.name)

    const [ world, setWorld ] = useState();

    const [ showMore, setShowMore ] = useState(false);

    useEffect(() => {
        setWorld(worldName(locationsData, worldsData));
    });

    //HANDLER
    const showMoreHandler = () => {
        showMore === true ? setShowMore(false) : setShowMore(true);
    };

    const worldName = ( location, worlds ) => {
        for (let i = 0; i < worlds.length; i++) {

            if ( worlds[i].id === location.world_id ) {
                return worlds[i].name
            }  ;       
        };
    };

    //FUNCTIONS
    const locationDetails = () => {
        navigate("/games/game-details/location/location-details");
    };

    return (
        <Container className='locationCardDesign col-12 mt-3'>
            <Row className='upperScroll d-flex justify-content-center align-items-center pt-2' onClick={() => locationDetails()}>
                <Col className='col-9 text-center fs-4 fw-bold eb-garamond-font ps-3'>{locations.toUpperCase()} </Col>
            </Row>
            {showMore === true ? <Container className='centerScrollLocations col-10'>
                    <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='governmentIcon col-1 fw-bold text-center'></Col>
                        <Col className='col-9'>{locationsData.government}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>                            
                        <Col className='defensesIcon col-1 fw-bold'></Col>
                        <Col className='col-10'> {locationsData.defenses}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                        <Col className='commerceIcon col-1 fw-bold'></Col>
                        <Col className='col-10'> {locationsData.commerce}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                        <Col className='populationIcon col-1 fw-bold'></Col>
                        <Col className='col-10'> {locationsData.population}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                        <Col className='worldIcon col-1 fw-bold text-center'></Col>
                        <Col className='col-10'>{world}</Col>
                    </Row>
                </Container>: <></>
            }
            <Row className='downScroll d-flex justify-content-center align-items-center' onClick={() => showMoreHandler()}>
                <Col className='col-12 text-center fw-bold'>{locationsData.type}</Col>
                <Col>
                    {showMore === false ? <NextPrevButton action="Down"/> : <NextPrevButton action="Up"/>}
                </Col>
            </Row>
        </Container>
    );
};