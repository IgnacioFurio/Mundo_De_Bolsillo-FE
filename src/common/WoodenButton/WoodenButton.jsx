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
            case "submit":
                
                return {text: "Finalizar", classButton: "backButtonDesign", classText: "sendText d-flex justify-content-center align-items-center fw-bold"};
                break;
            
            case "send":
                
                return {text: "Enviar", classButton: "sendButtonDesign", classText: "sendText d-flex justify-content-center align-items-center fw-bold"};
                break;

            case "back":
                
                return {text: "Volver", classButton: "backButtonDesign", classText: "backText d-flex justify-content-center align-items-center fw-bold"};
                break;
            
            case "edit":
                
                return {text: "Editar", classButton: "modifyButtonDesign", classText: "modifyText d-flex justify-content-center align-items-center fw-bold"};
                break;
            
            case "delete":
                
                return {text: "Borrar", classButton: "deleteButtonDesign", classText: "deleteText d-flex justify-content-center align-items-center fw-bold"};
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
                        <p>Estamos a un paso de borrar información en nuestra biblioteca.</p>
                        <p>¿Quieres que nuestros especialistas se deshagan de esta información?</p>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-evenly'>
                        <WoodenButton  action="back" clickFunction={() => setShow(false)}/>
                        <WoodenButton  action="send" clickFunction={clickFunction}/>
                    </Modal.Footer>
                </Modal>
            </>
            }
        </>
    )
};
