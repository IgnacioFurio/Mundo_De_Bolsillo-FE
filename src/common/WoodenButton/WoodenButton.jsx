import React, { useEffect, useState } from 'react';
//bootstrap
import { Container, Modal } from 'react-bootstrap';
//css
import './WoodenButton.css';

export const WoodenButton = ({ activateButton, action, clickFunction }) => {

    const [ buttonDesign, setButtonDesign ] = useState({
        text: "",
        classButton: "",
        classText: ""
    });

    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleActivate = () => setShow(true);

    //USEEFFECT
    //damos el primer aspecto al botón según la acción que va a realizar
    useEffect(() => { setButtonDesign(checkButtonDesign(action)); },[]);
    
    //activamos y desactivamos el aspecto del botón
    useEffect(() => { activateButtonHandler(); }, [activateButton]);

    //HANDLER
    //handler para activar y desactivar el botón de submit tras las validaciones
    const activateButtonHandler = ( ) => {
        if (activateButton === false && action === "submit") { 
            setButtonDesign(checkButtonDesign(action)); //chequeamos el diseño del botón según la acción

        } else if (activateButton === true && action === "submit") {
            let button = {
                text: "Finalizar",
                classButton: "sendButtonDesign",
                classText: "sendText d-flex justify-content-center align-items-center fw-bold"
            };

            setButtonDesign(button);
        };
    };

    //FUNCTION
    //chequeamos el tipo de botón que queremos y le damos estilo
    const checkButtonDesign = (action) => {
        switch (action) {
            case "submit":
                
                return {text: "Finalizar", classButton: "sendButtonDesign disabledButton", classText: "sendText disabledText d-flex justify-content-center align-items-center fw-bold"};
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
        <Container>
            {action === "delete" ? (
                <>
                    <div className={buttonDesign.classButton} onClick={() => handleActivate()}><p className={buttonDesign.classText}>{buttonDesign.text}</p></div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header className=' text-center' closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='text-center'>
                            <p>Estamos a un paso de borrar la información de nuestra biblioteca.</p>
                            <p>¿Quieres que nuestros especialistas se deshagan de esta información?</p>
                        </Modal.Body>
                        <Modal.Footer className='d-flex justify-content-evenly'>
                            <div>
                                <WoodenButton  action="back" clickFunction={() => setShow(false)}/>
                            </div>
                            <div>
                                <WoodenButton  action="send" clickFunction={clickFunction}/>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                action === "submit" ? (
                    <Container>
                        <div className={buttonDesign.classButton} onClick={() => handleActivate()}><p className={buttonDesign.classText}>{buttonDesign.text}</p></div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header className=' text-center' closeButton>
                                <Modal.Title></Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='text-center'>
                                <p>Estamos a un paso de registrar la información en nuestra biblioteca.</p>
                                <p>¿Quieres que nuestros especialistas archiven esta información?</p>
                            </Modal.Body>
                            <Modal.Footer className='d-flex justify-content-evenly'>
                                <div>
                                    <WoodenButton  action="back" clickFunction={() => setShow(false)}/>
                                </div>
                                <div>
                                    <WoodenButton  action="send" clickFunction={clickFunction}/>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </Container>
                ): (
                    <div className={buttonDesign.classButton} onClick={clickFunction}><p className={buttonDesign.classText}>{buttonDesign.text}</p></div>
                )
            )}
        </Container>
    )
};
