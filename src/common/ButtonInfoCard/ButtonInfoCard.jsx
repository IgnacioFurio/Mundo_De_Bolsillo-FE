import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { WoodenButton } from '../WoodenButton/WoodenButton';
import "./ButtonInfoCard.css";


export const ButtonInfoCard = ({ infoCard, source }) => {
    const [show, setShow] = useState(false);

    const [ sourceType, setSourceType ] = useState(source);

    //HANDLERS
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button 
                className='buttonInfoCard mx-1 my-1'
                onClick={() => handleShow()}>
                    {infoCard?.name || infoCard?.title || infoCard?.quest?.name}
            </button>   
            <Modal show={show} centered onHide={() => handleClose()}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body >
                    <Col className='bannerRibbon text-center fw-bold py-2'>
                        {infoCard?.name || infoCard?.title || infoCard?.quest?.name}
                    </Col>
                    {sourceType === "location" ? (
                        <Container className='centerScrollLocations col-10 '>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='governmentIcon col-1 fw-bold text-center'></Col>
                                <Col className='col-9'>{infoCard?.government || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>                            
                                <Col className='defensesIcon col-1 fw-bold'></Col>
                                <Col className='col-10'> {infoCard?.defenses || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                                <Col className='commerceIcon col-1 fw-bold'></Col>
                                <Col className='col-10'> {infoCard?.commerce || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                                <Col className='populationIcon col-1 fw-bold'></Col>
                                <Col className='col-10'> {infoCard?.population || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                                <Col className='worldIcon col-1 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.World?.name || "??"}</Col>
                            </Row>
                        </Container>
                    ) : (
                        <></>
                    )}
                    {sourceType  === "characters" ? (
                        <Container className='centerScrollLocations col-10'>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='text-center'>{infoCard?.description ||"??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='fromLocationIcon col-2 fw-bold text-center'/>
                                <Col className='col-9'>{infoCard?.fromLocation?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2' >
                                <Col className='lastLocationKnownIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-9'>{infoCard?.lastLocationKnown?.name || "??"}</Col>
                            </Row>
                        </Container>
                    ) : (
                        <></>
                    )}

                    {sourceType  === "knowledge" ? (
                        <Container className='centerScrollLocations col-11 mt-1'>
                            <Row className='d-flex justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.description || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='characterIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.aboutCharacter?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.heardFromCharacter?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='locationIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.aboutLocation?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.heardOnLocation?.name || "??"}</Col>
                            </Row>
                        </Container>
                    ) : (
                        <></>
                    )}
                    
                    {sourceType  === "quest" ? (
                        <Container className='centerScrollLocations col-11 mt-1'>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.delieveredByCharacter?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.gotInLocation?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='locationIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.happensInLocation?.name || "??"}</Col>
                            </Row>
                            <Row className='text-center my-1'>
                                <Col className='col-12 mb-1'>{infoCard?.quest?.goal || "??"}</Col>                            
                            </Row>
                        </Container>
                        ) : (
                        <></>
                    )}
                    <Col className='col-12 d-flex justify-content-evenly py-3'>
                        <WoodenButton activateButton={true} action="back" clickFunction={() => handleClose()}/>
                    </Col>
                </Modal.Body>
            </Modal>
        </>
    )
};
