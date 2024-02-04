import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { gameData, gameInfo } from '../../services/game.slice';
import { deleteGame } from '../../services/game.apicalls';
//components
import { BackButton } from '../../common/BackButton/BackButton';
import { ModifyButton } from '../../common/ModifyButton/ModifyButton';
import { DeleteButton } from '../../common/DeleteButton/DeleteButton';
import { PageNavigator } from '../../common/PageNavigator/PageNavigator';
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//css
import "./GameDetails.css";


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
        <Container id={gameInformation.id} className='col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7'>
            <Row className='pt-3 d-flex justify-content-evenly'>
                <Col className='col-4 d-flex justify-content-center my-2'><BackButton clickFunction={() => navigate("/games/my-games")}/></Col>
                <Col className='col-4 d-flex justify-content-center my-2'><ModifyButton clickFunction={() => navigate("/games/modify-game")}/></Col>
                <Col className='col-4 d-flex justify-content-center my-2'><DeleteButton gameData={gameInformation} clickFunction={() => deleteGameData(gameInformation.id)}/></Col>
            </Row>            
            <Row className='gameDetailsBackground mt-3 p-3'>
                <Col className='gameTitle col-12 d-flex justify-content-center fs-4 fw-bold'>
                    {gameInformation.title}
                </Col>
                <Col className='gameDescription col-12 text-center mt-3 mx-2'>
                {gameInformation.description}
                </Col>
            </Row>
        </Container>
    )
}
