import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';
import { gameData } from '../../services/game.slice';
import { worldData } from '../../services/world.slice';
//bootstrap
import {  Container, Row, Col } from 'react-bootstrap';
//component
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { NewRegisterButton } from '../../common/NewRegisterButton/NewRegisterButton';

export const Locations = () => {

    const dataRdx = useSelector(gameData);
    const dataRdxWorld = useSelector(worldData)

    const navigate = useNavigate();

    useEffect(() => {
        console.log(dataRdx);
        console.log(dataRdxWorld);
    });

    return (
        <Container>
            <Row className='d-flex justify-content-center'>
                <Col className='text-center'>PLACES</Col>
            </Row>
        </Container>
    );
};
