import React from 'react'
//components
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';

export const LocationDetails = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Row className='d-flex justify-content-evenly pt-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigate("/games/game-details")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => {}}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => {}}/></Col>
            </Row>    
            <div className='text-warning'>LocationDetails</div>
        </Container>
    )
};
