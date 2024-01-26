import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//microservices
import { getAllgames } from '../../services/game.apicalls';
//components
import { GameCard } from '../../common/GameCard/GameCard';
import { NewRegisterButton } from '../../common/NewRegisterButton/NewRegisterButton';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';

export const Games = () => {

    const navigate = useNavigate();

    const [ games, setGames ] = useState([]);

    useEffect(() => {
        getAllgames()
        .then(result => {setGames(result.data.data);})
        .catch(error => console.log(error));
    },[]);

    return (
        <Container>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <NewRegisterButton name={"Nueva Partida"} clickFunction={(e) => navigate("/games/new-game")}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    {games.map(data => {return <GameCard key={data.id} dataCard={data} showCard={false}/>})}
                </Col>
            </Row>
        </Container>
    )
}
