import React, { useEffect, useState } from 'react'
//bootstrap
import { Col, Container, Form, Row, Carousel  } from 'react-bootstrap'
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';

export const NewGame = () => {

    const inputPlaceholders = {
        placeholder1: "¿Como vas a llamar a la partida?",
        placeholder2: "¿De que va a tratar esta partida?"
    };

    const [counter, setCounter ] = useState(0);

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

    const gameFormHandlerNext = () => {
        counter < 2 ? setCounter(counter + 1) : setCounter(0)
    };

    return (
        <Container>
            {counter === 0 && <TutorialQuestions 
                type="textarea" 
                text="El primer paso para crear una partida nueva es encontrarle un nombre molón." 
                placeholder={inputPlaceholders.placeholder1} 
                name="title" 
                changeFunction={(e) => inputHandler(e)}/>}
            
            {counter === 1 && <TutorialQuestions 
                type="textarea" 
                text="Para continuar sería recomendable que contarás un pequeño resumen de que va a tratar esta historia" 
                placeholder={inputPlaceholders.placeholder2} 
                name="title" 
                changeFunction={(e) => inputHandler(e)}/>}
            {counter < 2 ? 
            <Row>
                <Col className='text-end mx-3' onClick={() => gameFormHandlerNext()}>
                    Siguiente
                </Col>
            </Row>
            :
            <Row>
                <Col className='text-end mx-3' onClick={() => {}}>
                    Terminar
                </Col>
            </Row>}
        </Container>
        );
}
