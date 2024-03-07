import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { gameData, gameInfo } from '../../services/game.slice';
//apicall
import { modifyGame } from '../../services/game.apicalls';
import { getAllWorlds } from '../../services/world.apicalls';
//common
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
import { TutorialSelector } from '../../common/TutorialSelector/TutorialSelector';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//helper
import { GameFormQuestions } from '../../helpers/Games.Forms.helper';
import { validate } from '../../helpers/validations.helper';
//css
import "./ModifyGame.css";
import { createWorldGate } from '../../services/worldgate.apicall';

export const ModifyGame = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(gameData);

    const [ formCounter, setFormCounter ] = useState(0);
    
    const formQuestions = {
        title: GameFormQuestions.text.modify.title,
        description: GameFormQuestions.text.modify.description,
        worldgate: GameFormQuestions.text.modify.worldgate
    };
    
    const formPlaceholders = {
        title: GameFormQuestions.placeholder.modify.title,
        description: GameFormQuestions.placeholder.modify.description
    };

    const [ gameInformation, setGameInformation ] = useState({
        id: dataRdx.gameInformation.id,
        title: dataRdx.gameInformation.title,
        description: dataRdx.gameInformation.description
    });

    const [ worldInformation, setWorldInformation ] = useState({});

    const [ worldsToEngage, setWorldsToEngage ] = useState([])

    const [ worldgateInformation, setWorldgateInformation ] = useState({
        game_id: dataRdx.gameInformation.id,
        world_id: ""
    });

    //only set false when a field is required
    const [ validInputField, setValidInputfield] = useState({
        titleValid: true,
        descriptionValid: true,
        world_idValid: true
    });
    
    const [ errorInputField, setErrorInputfield] = useState({
        titleError: "",
        descriptionError: "",
        world_idError: ""    
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    //VALIDATIONS
    useEffect(() => { getWorlds();},[worldsToEngage]);
    
    useEffect(() =>{ showNext(); },[ gameInformation ]);
    
    useEffect(() =>{showNext(); 
    },[ worldgateInformation ]);

    //HANDLERS
    const gameFormHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/games/game-details");
    };
    const gameFormHandlerNext = () => {
        formCounter < 3 ? setFormCounter(formCounter + 1) : setFormCounter(0);
    };
    const showNext  = () => {
        let values = Object.values(validInputField)

        if(values[formCounter] === true) {
            return setSubmitStatus(true);
        };
        
        setSubmitStatus(false)
    };

    const inputHandler = (e) => {        
        setGameInformation((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };
    
    const selectHandler = (e) => {    
        let worlds_id = e.target.id

        for(const key in worldsToEngage) {
            if (key == worlds_id && worldsToEngage[worlds_id] === true) {
                return setWorldsToEngage((prevState) => ({
                    ...prevState, 
                    [e.target.id]: false
                }));
            } else if(key == worlds_id && worldsToEngage[worlds_id] === false) {
                return setWorldsToEngage((prevState) => ({
                    ...prevState, 
                    [e.target.id]: true
                }));
            }
        };


        setWorldsToEngage((prevState) => ({
            ...prevState, 
            [e.target.id]: true
        }));
    };

    //APICALL
    const updateGameInformation = () => {
        createWorldGate(worldgateInformation)
        .then(() => {})
        .catch(error => {
            let backendErrorData = {
                message: error.response.data.message,
                valid: error.response.succes
            }
        });
        
        modifyGame(gameInformation)
        .then(() => { 
            dispatch(gameInfo({gameInformation: gameInformation}))
            navigate('/games/game-details');
        })
        .catch(error => {
            let backendErrorData = {
                message: error.response.data.message,
                valid: error.response.succes
            }
        });
    };

    const getWorlds = () => {
        getAllWorlds()
        .then((result) => {
            setWorldInformation(result.data.data);
        })
        .catch(error => {
            let backendErrorData = {
                message: error.response.data.message,
                valid: error.response.succes
            };
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

    const unsetWorldsToEngage = (e) => {

    };

    return (
        <Container>
            {formCounter === 0 && <TutorialQuestions 
                gameData={gameInformation.title}
                type="textarea" 
                text={formQuestions.title}
                errorText={errorInputField.titleError}
                placeholder={formPlaceholders.title} 
                name="title" 
                changeFunction={(e) => inputHandler(e)}/>
                }
            
            {formCounter === 1 && <TutorialQuestions 
                gameData={gameInformation.description}
                type="textarea" 
                text={formQuestions.description}
                errorText={errorInputField.descriptionError}
                placeholder={formPlaceholders.description} 
                name="description" 
                changeFunction={(e) => inputHandler(e)}/>
                }
            
            {formCounter === 2 && <TutorialSelector
                data={worldInformation}
                text={formQuestions.worldgate}
                errorText={errorInputField.descriptionError}
                placeholder={formPlaceholders.description} 
                clickFunction={(e) => selectHandler(e)}/>
                }

            {formCounter === 3 && <ConfirmNewRegister data={gameInformation}/>}

            <Row className='modifyGameNextPrev d-flex justify-content-center align-items-center'>
            {formCounter < 3 ? 
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
                        <NextPrevButton action="Submit" status={submitStatus} clickFunction={() => updateGameInformation()}/>
                    </Col>
                </>
                }
            </Row>            
        </Container>
    )
};
