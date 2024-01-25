import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//bootstrap
import { Col, Container, Form, Row, Carousel  } from 'react-bootstrap'
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { NetxtPrevButton } from '../../common/NextPrevButton/NetxtPrevButton';

export const NewGame = () => {

    const navigate = useNavigate();

    const inputPlaceholders = {
        placeholder1: "¿Como vas a llamar a la partida?",
        placeholder2: "¿De que va a tratar esta partida?"
    };

    const [ formCounter, setFormCounter ] = useState(0);

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

    return (
        <Container>
            {formCounter === 0 && <TutorialQuestions 
                type="textarea" 
                text="El primer paso para crear una partida nueva es encontrarle un nombre molón." 
                placeholder={inputPlaceholders.placeholder1} 
                name="title" 
                changeFunction={(e) => inputHandler(e)}/>}
            
            {formCounter === 1 && <TutorialQuestions 
                type="textarea" 
                text="Para continuar sería recomendable que contarás un pequeño resumen de que va a tratar esta historia" 
                placeholder={inputPlaceholders.placeholder2} 
                name="title" 
                changeFunction={(e) => inputHandler(e)}/>}
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
                <NetxtPrevButton action="Submit" clickFunction={() => {}}/>
            </Col>
        </Row>
        }
        </Container>
        );
}
