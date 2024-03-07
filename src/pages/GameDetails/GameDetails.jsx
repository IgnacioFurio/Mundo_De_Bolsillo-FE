import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { gameData, gameInfo } from '../../services/game.slice';
//apicall
import { deleteGame } from '../../services/game.apicalls';
import { getWorldGatesByGameId } from '../../services/worldgate.apicall';
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

    const [ worldGates, setWorldGates ] = useState([]);

    const deleteGameData = (game_id) => {
        deleteGame(game_id)
        .then(result => {
            navigate("/games/my-games");
            dispatch(gameInfo({gameInformation: {}}));      
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        //set time out here
        if (worldGates.length === 0) {
            getWorldGatesByGameId(gameInformation.id)
                .then(result => {
                    let worlds = [];
                    for (let i = 0; i < result.data.data.length; i++) {
                        worlds.push(result.data.data[i].World);
                    };
                    setWorldGates(worlds);
                })
                .catch(error => console.log(error))
        }
    }, [worldGates]);

    return (
        <Container id={gameInformation.id} className='col-12 col-sm-11 col-md-9 col-lg-8 col-xl-7'>
            <Row className='d-flex justify-content-evenly pt-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigate("/games/my-games")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("/games/modify-game")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => deleteGameData(gameInformation.id)}/></Col>
            </Row>            
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='detailsStone mt-4 py-2'>
                    <div className='gamePortraitTitle p-3'><p className='gameDetailsTitle d-flex justify-content-center col-12 fs-4 fw-bold mb-0'>{gameInformation.title}</p></div>
                </Col>                    
            </Row>
            <Row className='detailsBackground mx-1'>
                <Col className='col-12 text-center mb-3 mx-2'>
                {gameInformation.description}
                </Col>   
                <Col className='col-12 text-center fw-bold'>Mundos enlazados</Col>             
                {worldGates.map((data) => <Col key={data.id} className='col-6 d-flex justify-content-evenly'>{data.name}</Col>)}
            </Row>
        </Container>
    )
}
