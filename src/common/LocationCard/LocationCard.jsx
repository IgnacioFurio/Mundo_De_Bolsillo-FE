import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//bootstrap
import {  Container, Row, Col } from 'react-bootstrap';
import { getLocationsByWorldId } from '../../services/location.apicalls';

export const LocationCard = ({ locationsData }) => {
    const [ worldsData, setWorldsData ] = useState();

        useEffect(() => {
        })

    return (
        <Container>
            <Row className='d-flex justify-content-center'>
                <Col className='text-center'>{locationsData.name}</Col>
            </Row>
        </Container>
    );
};