import React, { useState } from 'react';
//bootstrap
import { Modal } from 'react-bootstrap';
//css
import './DeleteButton.css';

export const DeleteButton = ({ clickFunction }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleActivate = () => setShow(true);

    return (
        <>
            <div className='deleteButtonDesign d-flex justify-content-center align-items-center pt-1' onClick={(e) => handleActivate(e)}><p className='deleteText fw-bold'>Borrar</p></div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className=' text-center' closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <p>Estamos a un paso de registrar nueva información en nuestra biblioteca.</p>
                    <p>¿Quieres que nuestros especialistas archiven esta información?</p>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between mx-3'>
                    <div className="discardButtonDesign text-center p-1" onClick={() => handleClose()}>
                        Volver
                    </div>
                    <div className='sendButtonDesing text-center p-1' onClick={clickFunction}>
                        Enviar
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
};