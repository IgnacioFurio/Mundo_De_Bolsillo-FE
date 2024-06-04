import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { gameInfo } from '../../services/game.slice';
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//Css
import toRightArrow from "../../assets/FlechaDrch.png";
import toLeftArrow from "../../assets/FlechaIzq.png";
import './GameCard.css'

export const GameCard = ({ dataCard }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClickWorld = (e) => {
        dispatch(gameInfo({gameInformation: dataCard}));
        navigate('/games/game-details');
    };

    return (
        <Container className='gameCardDesign mt-2' onClick={(e) => handleClickWorld(e)}>
            <Row className='d-flex justify-content-center align-items-center '>
                <Col className='leftScroll p-0'>
                    <p className='leftArrow'></p>
                </Col>
                <Col className='centerScrollGames d-flex align-items-center justify-content-between col-9 p-0'>
                    <img src={toRightArrow} className='arrows' />
                    <p className='d-flex justify-content-center align-items-center fs-4 text-center fw-bold my-1 p-0'>{dataCard.title}</p>
                    <img src={toLeftArrow} className='arrows' />
                </Col>
                <Col className='rightScroll p-0'></Col>
            </Row>
        </Container>
    )
};
