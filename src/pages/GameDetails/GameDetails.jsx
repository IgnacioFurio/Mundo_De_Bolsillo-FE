import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { gameData } from '../../services/game.slice';
import { deleteGame } from '../../services/game.apicalls';
//components
import { DeleteButton } from '../../common/DeleteButton/DeleteButton';
import { PageNavigator } from '../../common/PageNavigator/PageNavigator';
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//css
import "./GameDetails.css";
import { ModifyButton } from '../../common/ModifyButton/ModifyButton';


export const GameDetails = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(gameData);

    const prevPages = ["partidas"];

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
            <Row className='m-2'>
                {prevPages.map(data => {return <PageNavigator page={data}/>})}
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
            <Row className='text-center my-4'>
                <Col><ModifyButton clickFunction={() => navigate("/games/modify-game")}/></Col>
                <Col><DeleteButton gameData={gameInformation} clickFunction={() => deleteGameData(gameInformation.id)}/></Col>
            </Row>
        </Container>
    )
}
