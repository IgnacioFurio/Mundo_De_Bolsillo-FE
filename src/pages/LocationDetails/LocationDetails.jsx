import React, { useEffect, useState } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux';
import { locationData, locationInfo } from '../../services/location.slice';
//components
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
//apicall
import { deleteLocation } from '../../services/location.apicalls';
//css
import "./LocationDetails.css"

export const LocationDetails = () => {
    //HOOKS
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const locationRdx = useSelector(locationData);
    
    //FUNCTIONS
    const navigateBack = (e) => {
        dispatch(locationInfo({locationInformation: {}}));
        navigate("/games/game-details");
    };

    //APICALLS
    const deleteLocationData = (locationId) => {
        deleteLocation(locationId)
        .then(result => {
            dispatch(locationInfo({locationInformation: {}}));
            navigateBack();
        })
        .catch((error) => {console.log(error);})
    };

    return (
        <Container className='col-12 col-sm-11 col-md-8 pb-2'>
            <Row className='d-flex justify-content-evenly py-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigateBack()}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("/locations/modify-location")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => deleteLocationData(locationRdx.locationInformation.id)}/></Col>
            </Row> 
            <Row className='upperScroll d-flex justify-content-center align-items-center pt-2' >
                <Col className='col-9 text-center fs-4 fw-bold eb-garamond-font ps-3'>{locationRdx.locationInformation.name.toUpperCase()} </Col>
            </Row>
            <Container className='centerScrollLocations col-10'>
                <Row className='borderDataCard align-items-center col-10 py-1 px-2'>                            
                    <Col className='governmentIcon col-1 fw-bold text-center'></Col>
                    <Col className='col-9'>{locationRdx.locationInformation.government}</Col>
                </Row> 
                <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>                            
                    <Col className='defensesIcon col-1 fw-bold'></Col>
                    <Col className='col-10'> {locationRdx.locationInformation.defenses}</Col>
                </Row>
                <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                    <Col className='commerceIcon col-1 fw-bold'></Col>
                    <Col className='col-10'> {locationRdx.locationInformation.commerce}</Col>
                </Row>
                <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                    <Col className='populationIcon col-1 fw-bold'></Col>
                    <Col className='col-10'> {locationRdx.locationInformation.population}</Col>
                </Row>
                <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                    <Col className='worldIcon col-1 fw-bold text-center'></Col>
                    <Col className='col-10'>{locationRdx.locationInformation.World.name}</Col>
                </Row>
            </Container> 
            <Row className='downScroll d-flex justify-content-center align-items-center'>
                <Col className='col-12 text-center fw-bold'>{locationRdx.locationInformation.type}</Col>
            </Row>
        </Container>
    )
};
