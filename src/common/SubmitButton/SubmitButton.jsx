import React, { useState } from 'react'
import { Container, Modal } from 'react-bootstrap';
import { WoodenButton } from '../WoodenButton/WoodenButton';

export const SubmitButton = ({ clickFunction }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleActivate = () => setShow(true);

    return (
        <Container className='d-flex justify-content-center p-0'>
            <WoodenButton  action="submit" clickFunction={() => handleActivate()}>Finalizar</WoodenButton>
            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header className=' text-center' closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <p>Estamos a un paso de registrar nueva información en nuestra biblioteca.</p>
                    <p>¿Quieres que nuestros especialistas archiven esta información?</p>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-evenly'>
                    <WoodenButton  action="back" clickFunction={() => setShow(false)}/>
                    <WoodenButton  action="send" clickFunction={clickFunction}/>
                </Modal.Footer>
            </Modal>
        </Container>
    )
};
