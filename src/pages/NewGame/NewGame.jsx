import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//common
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
//helper
import { validate } from '../../helpers/validations.helper';
import { GameFormQuestions } from '../../helpers/Games.Forms.helper';
//bootstrap
import { Col, Container, Row  } from 'react-bootstrap'
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
//apicall
import { createGame } from '../../services/game.apicalls';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
//css
import './NewGame.css';

export const NewGame = () => {

    const navigate = useNavigate();

    //HOOKS
    const formQuestions = {
        title: GameFormQuestions.text.new.title,
        description: GameFormQuestions.text.new.description
    };
    
    const formPlaceholders = {
        title: GameFormQuestions.placeholder.new.title,
        description: GameFormQuestions.placeholder.new.description
    };

    const [formCounter, setFormCounter ] = useState(0);

    const [ newGameData, setNewGameData] = useState({
        title: "",
        description: ""
    });
    //only set false when a field is required
    const [ validInputField, setValidInputfield] = useState({
        titleValid: false,
        descriptionValid: true
    });
    
    const [ errorInputField, setErrorInputfield] = useState({
        titleError: "",
        descriptionError: ""
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    const inputHandler = (e) => {        
        setNewGameData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };

    //VALIDATIONS
    useEffect(() =>{showNext();},[newGameData]);

    //HANDLERS
    const gameFormHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/games/my-games");
        setSubmitStatus(false);
    };
    const gameFormHandlerNext = () => {
        formCounter < 2 ? setFormCounter(formCounter + 1) : setFormCounter(0);
        setSubmitStatus(false);
    };
    const showNext  = () => {
        let values = Object.values(validInputField)

        if(values[formCounter] === true) {
            return setSubmitStatus(true);
        };

        setSubmitStatus(false)
    };

    //APICALL
    const createNewGame = () => { 

        createGame(newGameData)
        .then(() => { 
            navigate('/games/my-games');
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
        <Container >            
            <Row className='newGameTutorial'>
            {formCounter === 0 && <TutorialQuestions 
                gameData={newGameData.title}
                type="textarea" 
                text={formQuestions.title}
                errorText={errorInputField.titleError}
                placeholder={formPlaceholders.title} 
                name="title" 
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }
            
            {formCounter === 1 && <TutorialQuestions 
                gameData={newGameData.description}
                type="textarea" 
                text={formQuestions.description}
                errorText={errorInputField.descriptionError}
                placeholder={formPlaceholders.description} 
                name="description" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>                
            }

            {formCounter === 2 && <ConfirmNewRegister data={newGameData}/>}
            </Row>
            
            <Row className='newGameNextPrev d-flex justify-content-center align-items-center'>
            {formCounter < 2 ? 
                <Row>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                    {submitStatus === true ? <NextPrevButton action="Next" clickFunction={() => gameFormHandlerNext()}/> : <NextPrevButton action="Wait" clickFunction={() => {}}/>}
                    </Col>  
                </Row>
                :
                <Row>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NextPrevButton gameInfo={newGameData} action="Submit" clickFunction={() => createNewGame()}/>
                    </Col>
                </Row>
                }
            </Row>
        </Container>
        );
}