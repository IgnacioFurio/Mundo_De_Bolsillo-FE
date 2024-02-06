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
            <Row >
                <Col className='d-flex justify-content- mt-4'>
                    <NewRegisterButton name={"Nueva Partida"} clickFunction={(e) => navigate("/games/new-game")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-4'>
                    {games.map(data => {
                        return <>
                                <Col className='col-1 col-sm-1 col-md-2 col-lg-1'/>
                                <Col className='col-10 col-sm-10 col-md-8 col-lg-4'>
                                    <GameCard dataCard={data}/>
                                </Col>
                                <Col className='col-1 col-sm-1 col-md-2 col-lg-1'/>
                            </>
                    })}
            </Row>
        </Container>
    )
}
