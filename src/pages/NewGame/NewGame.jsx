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

export const NewGame = () => {

    const navigate = useNavigate();

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
    
    const [ validInputField, setValidInputfield] = useState({
        titleValid: false,
        descriptionValid: false
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

    //Validaciones
    useEffect(() =>{
        for(let error in errorInputField){
            
            if(errorInputField[error]){
                
                setSubmitStatus(false);
                return;
            };
        };

        for(let valid in validInputField){
            
            if(validInputField[valid] === false){
                
                setSubmitStatus(false);
                return;
            };
        };
    
        setSubmitStatus(true);
    },[newGameData]);

    //handlers for PrevNext form
    const gameFormHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/games/my-games");
    };
    const gameFormHandlerNext = () => {
        formCounter < 2 ? setFormCounter(formCounter + 1) : setFormCounter(0);
    };

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
                gameData={newGameData.title}
                type="textarea" 
                text={formQuestions.title}
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
                placeholder={formPlaceholders.description} 
                name="description" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>                
                }

            {formCounter === 2 && <ConfirmNewRegister data={newGameData}/>}

            {formCounter < 2 ? 
                <Row className='d-flex justify-content-between px-2'>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                    {validInputField.titleValid ? <NextPrevButton action="Next" clickFunction={() => gameFormHandlerNext()}/> : <NextPrevButton action="Wait" clickFunction={() => {}}/>}
                    </Col>  
                </Row>
                :
                <Row>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NextPrevButton action="Submit" clickFunction={() => createNewGame()}/>
                    </Col>
                </Row>
                }
        </Container>
        );
}