import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//common
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
//helper
import { WorldFormQuestions } from '../../helpers/WorldForms.helper';
import { checkValid, validate } from '../../helpers/validations.helper';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
import { createWorld } from '../../services/world.apicalls';

export const NewWorld = () => {
    const navigate = useNavigate();

    //HOOKS
    const formQuestions = {
        name: WorldFormQuestions.text.new.name,
        description: WorldFormQuestions.text.new.description
    };
    
    const formPlaceholders = {
        name: WorldFormQuestions.placeholder.new.name,
        description: WorldFormQuestions.placeholder.new.description
    };

    const [ formCounter, setFormCounter ] = useState(0);

    const [ newWorldData, setNewWorldData] = useState({
        name: "",
        description: ""
    });
    //only set false when a field is required
    const [ validInputField, setValidInputfield] = useState({
        nameValid: false,
        descriptionValid: true
    });
    
    const [ errorInputField, setErrorInputfield] = useState({
        nameError: "",
        descriptionError: ""
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    //VALIDATIONS
    useEffect(() =>{setSubmitStatus(checkValid(validInputField, formCounter));},[newWorldData]);

    useEffect(() => {setSubmitStatus(checkValid(validInputField, formCounter));});

    //HANDLERS
    const inputHandler = (e) => {        
        setNewWorldData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };

    const formHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/worlds/my-worlds");
        setSubmitStatus(false);
    };
    const formHandlerNext = () => {
        formCounter < 2 ? setFormCounter(formCounter + 1) : setFormCounter(0);
        setSubmitStatus(false);
    };
        
    //APICALL
    const createNewWorld = () => {
        createWorld(newWorldData)
        .then(() => { 
            navigate('/worlds/my-worlds');
        })
        .catch(error => {
            let backendErrorData = {
                message: error.response.data.message,
                valid: error.response.succes
            }
        });
    };
    //CHECKS
    const checkError = (e) => {
        let error = "";
    
        let check = validate(
            e.target.name,
            e.target.value,
            e.target.required
            );
            
        error = check.message;

        setValidInputfield((prevState) => ({
            ...prevState,
            [e.target.name + 'Valid']: check.valid
        }));
        
        setErrorInputfield((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    };

    return (
        <Container>
            <Row className='tutorialHeight'>
            {formCounter === 0 && <TutorialQuestions 
                gameData={newWorldData.name}
                type="textarea" 
                text={formQuestions.name}
                errorText={errorInputField.nameError}
                placeholder={formPlaceholders.name} 
                name="name" 
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }

            {formCounter === 1 && <TutorialQuestions 
                gameData={newWorldData.description}
                type="textarea" 
                text={formQuestions.description}
                errorText={errorInputField.descriptionError}
                placeholder={formPlaceholders.description} 
                name="description" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>                
            }

            {formCounter === 2 && <ConfirmNewRegister data={newWorldData}/>}
            </Row>
            <Row className='nextPrev d-flex justify-content-center align-items-center'>
            {formCounter < 2 ?  //Sección para los botones de avanzar/retroceder o enviar información en los formularios
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => formHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                    {submitStatus === true ? <NextPrevButton action="Next" clickFunction={() => formHandlerNext()}/> : <NextPrevButton action="Wait" clickFunction={() => {}}/>}
                    </Col>  
                </>
                :
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => formHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NextPrevButton gameInfo={newWorldData} action="Submit" clickFunction={() => createNewWorld()}/>
                    </Col>
                </>
                }
            </Row>
        </Container>
    )
};
