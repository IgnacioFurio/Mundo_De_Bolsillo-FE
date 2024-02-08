import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//common
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
//helper
import { WorldFormQuestions } from '../../helpers/WorldForms.helper';
import { showNext, validate } from '../../helpers/validations.helper';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';

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
    useEffect(() =>{setSubmitStatus(showNext(newWorldData, formCounter));},[newWorldData]);

    useEffect(() => {
        console.log(submitStatus);
    });

    //HANDLERS
    const inputHandler = (e) => {        
        setNewWorldData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };

    const gameFormHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/games/my-games");
        setSubmitStatus(false);
    };
    const gameFormHandlerNext = () => {
        formCounter < 2 ? setFormCounter(formCounter + 1) : setFormCounter(0);
        setSubmitStatus(false);
    };
        
    //APICALL
    const createNewWorld = () => {
        console.log("hello");
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
            </Row>
            <Row className='nextPrev d-flex justify-content-center align-items-center'>
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
                        <NextPrevButton gameInfo={newGameData} action="Submit" clickFunction={() => createNewGame()}/>
                    </Col>
                </>
                }
            </Row>
        </Container>
    )
};
