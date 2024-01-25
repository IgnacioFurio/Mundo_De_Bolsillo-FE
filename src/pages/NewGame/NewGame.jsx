import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//common
import { NetxtPrevButton } from '../../common/NextPrevButton/NetxtPrevButton';
//bootstrap
import { Col, Container, Row  } from 'react-bootstrap'
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
//apicall
import { createGame } from '../../services/game.apicalls';

export const NewGame = () => {

    const navigate = useNavigate();

    const inputPlaceholders = {
        placeholder1: "¿Como vas a llamar a la partida?",
        placeholder2: "¿De que va a tratar esta partida?"
    };

    const [formCounter, setFormCounter ] = useState(0);

    const [ newGameData, setNewGameData] = useState({
        title: "",
        description: ""
    });

    const inputHandler = (e) => {        
        setNewGameData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

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

    return (
        <Container>
            {formCounter === 0 && <TutorialQuestions 
                type="textarea" 
                text="El primer paso para crear una partida nueva es encontrarle un nombre molón." 
                placeholder={inputPlaceholders.placeholder1} 
                name="title" 
                changeFunction={(e) => inputHandler(e)}/>
                }
            
            {formCounter === 1 && <TutorialQuestions 
                type="textarea" 
                text="Para continuar sería recomendable que contarás un pequeño resumen de que va a tratar esta historia" 
                placeholder={inputPlaceholders.placeholder2} 
                name="description" 
                changeFunction={(e) => inputHandler(e)}/>
                }

            {formCounter < 2 ? 
                <Row className='d-flex justify-content-between px-2'>
                    <Col className='d-flex justify-content-start'>
                        <NetxtPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NetxtPrevButton action="Next" clickFunction={() => gameFormHandlerNext()}/>
                    </Col>  
                </Row>
                :
                <Row>
                    <Col className='d-flex justify-content-start'>
                        <NetxtPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NetxtPrevButton action="Submit" clickFunction={() => createNewGame()}/>
                    </Col>
                </Row>
                }
        </Container>
        );
}