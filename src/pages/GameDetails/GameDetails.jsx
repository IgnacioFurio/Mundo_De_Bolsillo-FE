import React, { useEffect, useState } from 'react';
//redux
import { gameData } from '../../services/game.slice';
import { useSelector } from 'react-redux';
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//css
import "./GameDetails.css";


export const GameDetails = () => {

    const dataRdx = useSelector(gameData);

    const [ gameInformation, setGameInformation ] = useState(dataRdx.gameInformation);

    useEffect(() => {
        console.log(gameInformation);
    },[]);

    return (
        <Container id={gameInformation.id}>
            <Row>
                <Col className='gameTitle d-flex justify-content-center mt-3 mx-2 fs-4 fw-bold'>
                    {gameInformation.title}
                </Col>
            </Row>
            <Row >
                <Col className='gameDescription text-center mt-3 mx-2'>
                {gameInformation.description}
                </Col>
            </Row>
        </Container>
    )
}
