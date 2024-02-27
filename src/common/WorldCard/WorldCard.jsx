import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { worldInfo } from '../../services/world.slice';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//css
import './WorldCard.css';

export const WorldCard = ({ dataCard }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClickWorld = (e) => {
        dispatch(worldInfo({worldInformation: dataCard}));
        navigate('/worlds/world-details');
    };

    return (
        <Container className='worldCardDesign mt-2' onClick={handleClickWorld}>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='leftScroll p-0'></Col>
                <Col className='centerScroll col-9 p-0'>
                    <p className='circleTp d-flex justify-content-center align-items-center fs-2 text-center fw-bold my-1 p-0'>{dataCard.name}</p>
                </Col>
                <Col className='rightScroll p-0'></Col>
            </Row>
        </Container>
    )
};
