import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { WoodenButton } from '../WoodenButton/WoodenButton';


export const ButtonInfoCard = ({ infoCard, source }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ sourceType, setSourceType ] = useState(source);

    useEffect(() => {
        console.log(infoCard);
        
    },[]);

    return (
        <>
            <button 
                className='rounded mx-1 my-1'
                onClick={() => handleShow()}>
                    {infoCard.name || infoCard.title}
            </button>   
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Col className='bannerRibbon text-center fw-bold py-2'>
                        {infoCard?.name || infoCard?.title}
                    </Col>
                    {source === "location" ? (
                        <Container className='centerScrollLocations col-10 '>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='governmentIcon col-1 fw-bold text-center'></Col>
                                <Col className='col-9'>{infoCard.government}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>                            
                                <Col className='defensesIcon col-1 fw-bold'></Col>
                                <Col className='col-10'> {infoCard.defenses}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                                <Col className='commerceIcon col-1 fw-bold'></Col>
                                <Col className='col-10'> {infoCard.commerce}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                                <Col className='populationIcon col-1 fw-bold'></Col>
                                <Col className='col-10'> {infoCard.population}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                                <Col className='worldIcon col-1 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.World?.name || "??"}</Col>
                            </Row>
                        </Container>
                    ) : (
                        <></>
                    )}
                    <Col className='col-12 d-flex justify-content-evenly py-3'>
                        <WoodenButton activateButton={true} action="back" clickFunction={() => handleClose()}/>
                        <WoodenButton activateButton={true} action="submit" clickFunction={() => {}}/>
                    </Col>
                </Modal.Body>
            </Modal>
        </>
    )
};
