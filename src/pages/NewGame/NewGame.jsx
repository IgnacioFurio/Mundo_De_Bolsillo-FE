import React, { useEffect, useState } from 'react'
//bootstrap
import { Col, Container, Row  } from 'react-bootstrap'
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
//apicall
import { createGame } from '../../services/game.apicalls';
import { useNavigate } from 'react-router-dom';

export const NewGame = () => {

    const navigate = useNavigate()

    const inputPlaceholders = {
        placeholder1: "¿Como vas a llamar a la partida?",
        placeholder2: "¿De que va a tratar esta partida?"
    };

    const [counter, setCounter ] = useState(0);

    const [ newGameData, setNewGameData] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        console.log(newGameData);
    });

    const inputHandler = (e) => {
        
        setNewGameData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const gameFormHandlerNext = () => {
        counter < 2 ? setCounter(counter + 1) : setCounter(0);
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
            {counter === 0 && <TutorialQuestions 
                type="textarea" 
                text="El primer paso para crear una partida nueva es encontrarle un nombre molón." 
                placeholder={inputPlaceholders.placeholder1} 
                name="title" 
                changeFunction={(e) => inputHandler(e)}/>
                }
            
            {counter === 1 && <TutorialQuestions 
                type="textarea" 
                text="Para continuar sería recomendable que contarás un pequeño resumen de que va a tratar esta historia" 
                placeholder={inputPlaceholders.placeholder2} 
                name="description" 
                changeFunction={(e) => inputHandler(e)}/>
                }

            {counter < 2 ? 
            <Row>
                <Col className='text-end mx-3' onClick={() => gameFormHandlerNext()}>
                    Siguiente
                </Col>
            </Row>
            :
            <Row>
                <Col className='text-end mx-3' onClick={() => createNewGame()}>
                    Terminar
                </Col>
            </Row>
                }
        </Container>
        );
}