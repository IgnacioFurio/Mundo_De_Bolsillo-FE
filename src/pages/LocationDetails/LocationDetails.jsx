import React, { useEffect } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux';
import { locationData, locationInfo } from '../../services/location.slice';
//components
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { LocationCard } from '../../common/LocationCard/LocationCard';

export const LocationDetails = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(locationData);


    useEffect(() => {
        console.log(dataRdx);
    },[]);

    const navigateBack = (e) => {
        dispatch(locationInfo({locationInformation: {}}));
        navigate("/games/game-details");
    };

    return (
        <Container>
            <Row className='d-flex justify-content-evenly pt-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigateBack("/games/game-details")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => {}}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => {}}/></Col>
            </Row>    
            <Row>
                {/* <LocationCard/> */}
            </Row>
        </Container>
    )
};
