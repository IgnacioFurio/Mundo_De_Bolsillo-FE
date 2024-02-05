import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { gameData, gameInfo } from '../../services/game.slice';
import { deleteGame } from '../../services/game.apicalls';
//components
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
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
        <Container id={gameInformation.id} className='col-12 col-sm-11 col-md-9 col-lg-8 col-xl-7'>
            <Row className='d-flex justify-content-evenly pt-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigate("/games/my-games")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("/games/modify-game")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => deleteGameData(gameInformation.id)}/></Col>
            </Row>            
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='gameDetailsStone my-4 py-2'>
                    <div className='gamePortraitTitle p-3'><p className='gameDetailsTitle d-flex justify-content-center col-12 fs-4 fw-bold mb-0'>{gameInformation.title}</p></div>
                </Col>                    
            </Row>
            <Row className='gameDetailsBackground'>
                <Col className='gameDetailsDescription col-12 text-center mb-3 mx-2'>
                {gameInformation.description}
                </Col>
            </Row>
        </Container>
    )
}
