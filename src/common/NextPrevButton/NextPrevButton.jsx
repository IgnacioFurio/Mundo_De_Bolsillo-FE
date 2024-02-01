import React, { useEffect, useState } from 'react'
//helper
import { nextPrevButtonDesign } from '../../helpers/NextPrevButton.helper';
//bootstrap
import Modal from 'react-bootstrap/Modal';
//css
import "./NextPrevButton.css";

export const NextPrevButton = ({ action, clickFunction, status }) => {
    const [ buttonDesign, setButtonDesign ] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleActivate = () => setShow(true);

    useEffect(() => {   
        setButtonDesign(nextPrevButtonDesign(action));
    });

    return (
        <>
            {action === "Submit" ? <div className={buttonDesign} onClick={() => handleActivate(status)}>Finalizar</div> : <div className={buttonDesign} onClick={clickFunction}></div>}
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
}
