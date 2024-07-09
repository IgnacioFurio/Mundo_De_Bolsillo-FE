import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch } from 'react-redux';
import { characterInfo } from '../../services/character.slice';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//common
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';
import "./CharacterCard.css";

export const CharacterCard = ({ characterData }) => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [ character, setCharacter ] = useState({
        name: characterData.name,
        description: characterData.description,
        fromLocation: characterData.fromLocation,
        lastLocationKnown: characterData.lastLocationKnown
    })

    const [ showMore, setShowMore ] = useState(false);

    //HANDLER
    const showMoreHandler = () => {
        showMore === true ? setShowMore(false) : setShowMore(true);
    };

    const characterDetailsHandler = (e) => {
        dispatch(characterInfo({characterInformation: characterData}));
        navigate("/games/game-details/characters/character-details");
    }

    const locationDetailsHandler = (e, location) => {
        console.log(location);
    };

    return (
        <Container>
            <Row className='upperScroll' onClick={() => characterDetailsHandler()}>
                <Col className='characterPicture'>
                    <div>{character?.name}</div>
                </Col>
            </Row>
            {showMore === true ? <Container className='centerScrollLocations col-10'>
                    <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='text-center'>{character?.description}</Col>
                    </Row>
                    <Row 
                    className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2' 
                    onClick={(e) => locationDetailsHandler(e, character?.fromLocation)}>                            
                        <Col className='fromLocationIcon col-2 fw-bold text-center'/>
                        <Col className='col-9'>{character?.fromLocation?.name}</Col>
                    </Row>
                    <Row 
                    className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2' 
                    onClick={(e) => locationDetailsHandler(e, character?.lastLocationKnown)}>                            
                        <Col className='lastLocationKnownIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-9'>{character?.lastLocationKnown?.name}</Col>
                    </Row>
                </Container>: <></>
            }
            <Row className='downScroll' onClick={(e) => showMoreHandler(e)}>
                <Col className='col-12 fw-bold text-center text-white'>{character?.name}</Col>
                <Col>
                    {showMore === false ? <NextPrevButton action="Down"/> : <NextPrevButton action="Up"/>}
                </Col>
            </Row>
        </Container>
    );
};
