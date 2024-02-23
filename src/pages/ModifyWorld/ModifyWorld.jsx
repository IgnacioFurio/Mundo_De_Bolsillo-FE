import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { worldData, worldInfo } from '../../services/world.slice';
//apicall
import { modifyWorld } from '../../services/world.apicalls';
//common
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//helper
import { GameFormQuestions } from '../../helpers/Games.Forms.helper';
import { validate } from '../../helpers/validations.helper';
//css
import "./ModifyWorld.css";

export const ModifyWorld = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(worldData);

    const [formCounter, setFormCounter ] = useState(0);
    
    const formQuestions = {
        name: GameFormQuestions.text.modify.title,
        description: GameFormQuestions.text.modify.description
    };
    
    const formPlaceholders = {
        name: GameFormQuestions.placeholder.modify.title,
        description: GameFormQuestions.placeholder.modify.description
    };

    const [ worldInformation, setWorldInformation] = useState({
        id: dataRdx.worldInformation.id,
        name: dataRdx.worldInformation.name,
        description: dataRdx.worldInformation.description
    });

    //only set false when a field is required
    const [ validInputField, setValidInputfield] = useState({
        nameValid: true,
        descriptionValid: true
    });
    
    const [ errorInputField, setErrorInputfield] = useState({
        nameError: "",
        descriptionError: ""
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    //VALIDATIONS
    useEffect(() =>{showNext()
        console.log(worldInformation);
    },[worldInformation]);

    //HANDLERS
    const gameFormHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/worlds/world-details");
    };
    const gameFormHandlerNext = () => {
        formCounter < 2 ? setFormCounter(formCounter + 1) : setFormCounter(0);
    };
    const showNext  = () => {
        let values = Object.values(validInputField)

        if(values[formCounter] === true) {
            return setSubmitStatus(true);
        };
        

        setSubmitStatus(false)
    };

    const inputHandler = (e) => {        
        setWorldInformation((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        checkError(e);
    };

    //APICALL
    const updateWorldInformation = () => {
        console.log("update");

        modifyWorld(worldInformation)
        .then(() => { 
            dispatch(worldInfo({worldInformation: worldInformation}))
            navigate('/worlds/world-details');
        })
        .catch(error => {
            let backendErrorData = {
                message: error.response.data.message,
                valid: error.response.succes
            }
        });
    }

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
            {formCounter === 0 && <TutorialQuestions 
                gameData={worldInformation.name}
                type="textarea" 
                text={formQuestions.name}
                errorText={errorInputField.nameError}
                placeholder={formPlaceholders.name} 
                name="name" 
                changeFunction={(e) => inputHandler(e)}/>
                }
            
            {formCounter === 1 && <TutorialQuestions 
                gameData={worldInformation.description}
                type="textarea" 
                text={formQuestions.description}
                errorText={errorInputField.descriptionError}
                placeholder={formPlaceholders.description} 
                name="description" 
                changeFunction={(e) => inputHandler(e)}/>
                }

            {formCounter === 2 && <ConfirmNewRegister data={worldInformation}/>}

            <Row className='modifyGameNextPrev d-flex justify-content-center align-items-center'>
            {formCounter < 2 ? 
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                    {submitStatus === true ? <NextPrevButton action="Next" clickFunction={() => gameFormHandlerNext()}/> : <NextPrevButton action="Wait" clickFunction={() => {}}/>}
                    </Col>  
                </>
                :
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NextPrevButton action="Submit" status={submitStatus} clickFunction={() => updateWorldInformation()}/>
                    </Col>
                </>
                }
            </Row>
            
        </Container>
    )
};
