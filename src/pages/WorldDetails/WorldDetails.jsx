import React, { useEffect, useState } from 'react'
//redux
import { useSelector } from 'react-redux';
import { worldData } from '../../services/world.slice';
//components
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
//css
import './WorldDetails.css'
import { useNavigate } from 'react-router-dom';

export const WorldDetails = () => {

    const navigate = useNavigate();

    const dataRdx = useSelector(worldData)
    
    const [ worldInformation, setWorldInformation ] = useState(dataRdx.worldInformation);

    return (
        <Container id={worldInformation.id} className='col-12 col-sm-11 col-md-9 col-lg-8 col-xl-7'>
            <Row className='d-flex justify-content-evenly pt-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigate("/worlds/my-worlds")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => {}}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => {}}/></Col>
            </Row>            
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='detailsStone mt-4 py-2'>
                    <div className='worldPortraitTitle p-3'><p className='worldDetailsTitle d-flex justify-content-center col-12 fs-4 fw-bold mb-0'>{worldInformation.name}</p></div>
                </Col>                    
            </Row>
            <Row className='detailsBackground mx-1'>
                <Col className='col-12 text-center mb-3 mx-2'>
                {worldInformation.description}
                </Col>
            </Row>
        </Container>
    )
};
