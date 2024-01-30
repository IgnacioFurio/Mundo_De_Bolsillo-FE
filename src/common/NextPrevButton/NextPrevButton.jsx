import React, { useEffect, useState } from 'react'
//helper
import { nextPrevButtonDesign } from '../../helpers/NextPrevButton.helper';
//bootstrap
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from 'react-bootstrap';
//css
import "./NextPrevButton.css";

export const NextPrevButton = ({ action, clickFunction, status }) => {
    const [ buttonDesign, setButtonDesign ] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleActivate = (status) => {
        if (status === true) return setShow(true);
        return;
    }

    useEffect(() => {   
        setButtonDesign(nextPrevButtonDesign(action, status));
    });

    return (
        <>
            {action === "Submit" ? <button className={buttonDesign} onClick={() => handleActivate(status)}>Finalizar</button> : <button className={buttonDesign} onClick={clickFunction}></button>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='text-center' closeButton>
                    <Modal.Title>Estamos a un paso de registrar nueva información en nuestra biblioteca.</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <p>Si no te convence aún estás a tiempo de revisar los datos introducidos haciendo click en el botón de "Volver".</p>
                    <p>Haz click en el botón de "Enviar" si ya te has asegurado de que los datos son correctos.</p>
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
