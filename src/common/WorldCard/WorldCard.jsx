import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './WorldsCard.css';

export const WorldCard = ({ dataCard }) => {

    return (
        <Container className='worldCardDesign mt-2'>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='leftScroll p-0'></Col>
                <Col className='centerScroll col-9 p-0'>
                    <p className='circleTp d-flex justify-content-center align-items-center fs-2 fw-bold my-1 p-0'>{dataCard.name}</p>
                </Col>
                <Col className='rightScroll p-0'></Col>
            </Row>
        </Container>
    )
};
