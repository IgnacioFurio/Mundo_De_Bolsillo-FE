import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { WoodenButton } from '../WoodenButton/WoodenButton';


export const ButtonInfoCard = ({ infoCard }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Col className='col-12 d-flex justify-content-evenly py-3'>
                        <WoodenButton activateButton={true} action="back" clickFunction={() => handleClose()}/>
                        <WoodenButton activateButton={true} action="submit" clickFunction={() => {}}/>
                    </Col>
                </Modal.Body>
            </Modal>
        </>
    )
};
