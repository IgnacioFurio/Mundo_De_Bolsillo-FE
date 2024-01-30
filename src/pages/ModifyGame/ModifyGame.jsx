import React, { useEffect, useState } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { gameData, gameInfo } from '../../services/game.slice';
//apicall
import { modifyGame } from '../../services/game.apicalls';
//common
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//helper
import { GameFormQuestions } from '../../helpers/Games.Forms.helper';
//css
import "./ModifyGame.css";
import { useNavigate } from 'react-router-dom';

export const ModifyGame = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(gameData);

    const [formCounter, setFormCounter ] = useState(0);

    const prevPages = ["partidas", dataRdx.gameInformation.title];

    const formQuestions = {
        title: GameFormQuestions.text.modify.title,
        description: GameFormQuestions.text.modify.description
    };
    
    const formPlaceholders = {
        title: GameFormQuestions.placeholder.modify.title,
        description: GameFormQuestions.placeholder.modify.description
    };

    const [ gameInformation, setGameInformation] = useState({
        id: dataRdx.gameInformation.id,
        title: dataRdx.gameInformation.title,
        description: dataRdx.gameInformation.description
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    useEffect(() =>{
        gameInformation.title !== "" ? setSubmitStatus(true) : setSubmitStatus(false);
    },[gameInformation.title]);

    const gameFormHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/games/game-details");
    };

    const gameFormHandlerNext = () => {
        formCounter < 2 ? setFormCounter(formCounter + 1) : setFormCounter(0);
    };

    const inputHandler = (e) => {        
        setGameInformation((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const updateGameInformation = () => {

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
    }

    return (
        <Container>
            {formCounter === 0 && <TutorialQuestions 
                gameData={gameInformation.title}
                type="textarea" 
                text={formQuestions.title}
                placeholder={formPlaceholders.title} 
                name="title" 
                changeFunction={(e) => inputHandler(e)}/>
                }
            
            {formCounter === 1 && <TutorialQuestions 
                gameData={gameInformation.description}
                type="textarea" 
                text={formQuestions.description}
                placeholder={formPlaceholders.description} 
                name="description" 
                changeFunction={(e) => inputHandler(e)}/>
                }

            {formCounter === 2 && <ConfirmNewRegister data={gameInformation}/>}

            {formCounter < 2 ? 
                <Row className='d-flex justify-content-between px-2'>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NextPrevButton action="Next" clickFunction={() => gameFormHandlerNext()}/>
                    </Col>  
                </Row>
                :
                <Row>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NextPrevButton action="Submit" status={submitStatus} clickFunction={() => updateGameInformation()}/>
                    </Col>
                </Row>
                }
        </Container>
    )
};
