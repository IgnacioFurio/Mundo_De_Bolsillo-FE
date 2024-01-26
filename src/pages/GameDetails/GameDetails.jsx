import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { gameData } from '../../services/game.slice';
import { useDispatch, useSelector } from 'react-redux';
//components
import { DeleteButton } from '../../common/DeleteButton/DeleteButton';
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//css
import "./GameDetails.css";
import { deleteGame } from '../../services/game.apicalls';


export const GameDetails = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(gameData);

    const [ gameInformation, setGameInformation ] = useState(dataRdx.gameInformation);

    const deleteGameData = (game_id) => {
        deleteGame(game_id)
        .then(result => {
            navigate("/games/my-games")
            dispatch(gameInfo({gameInformation: {}}));      
        })
        .catch(error => console.log(error));
    };

    return (
        <Container id={gameInformation.id}>
            <Row className='text-center'>
                <Col>Editar</Col>
                <Col><DeleteButton gameData={gameInformation} clickFunction={() => deleteGameData(gameInformation.id)}/></Col>
                
            </Row>
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
