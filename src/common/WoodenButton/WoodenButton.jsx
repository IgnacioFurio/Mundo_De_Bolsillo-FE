import React, { useEffect, useState } from 'react';
//bootstrap
import { Modal } from 'react-bootstrap';
//css
import './WoodenButton.css';

export const WoodenButton = ({ action, clickFunction }) => {

    const [ buttonDesign, setButtonDesign ] = useState({
        text: "",
        classButton: "",
        classText: ""
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleActivate = () => setShow(true);

    useEffect(() => {
        setButtonDesign(checkButtonDesign(action));
    },[]);

    const checkButtonDesign = (action) => {
        switch (action) {
            case "back":
                
                return {text: "Volver", classButton: "backButtonDesign d-flex align-items-center justify-content-center pt-1", classText: "backText fw-bold"};
                break;
            
            case "edit":
                
                return {text: "Editar", classButton: "modifyButtonDesign d-flex align-items-center justify-content-center pt-1", classText: "modifyText fw-bold"};
                break;
            
            case "delete":
                
                return {text: "Borrar", classButton: "deleteButtonDesign d-flex align-items-center justify-content-center pt-1", classText: "deleteText fw-bold"};
                break;
        
            default:
                break;
        }
    };

    return (
        <>
            {action !== "delete" ? <div className={buttonDesign.classButton} onClick={clickFunction}><p className={buttonDesign.classText}>{buttonDesign.text}</p></div>: 
            <>
                <div className={buttonDesign.classButton} onClick={() => handleActivate()}><p className={buttonDesign.classText}>{buttonDesign.text}</p></div>
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
            }
        </>
    )
};
