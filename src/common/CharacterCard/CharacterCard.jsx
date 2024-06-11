import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./CharacterCard.css";

export const CharacterCard = ({ characterData, worldsData }) => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [ character, setCharacter ] = useState({
        name: characterData.name,
        description: characterData.description,
        fromLocation: characterData.fromLocation,
        lastLocationKnown: characterData.lastLocationKnown
    })

    const [ fromLocation, setFromLocation ] = useState(characterData.fromLocation);

    const [ showMore, setShowMore ] = useState(false);

    //HANDLER
    const showMoreHandler = () => {
        showMore === true ? setShowMore(false) : setShowMore(true);
    };

    const characterDetails = (e) => {
        // dispatch(locationInfo({locationInformation: locationsData}));
        navigate("/games/game-details/location/location-details");
    }
    useEffect(() =>{ 
        console.log(characterData);
    }, []);

    return (
        <Container className='border border-dark rounded'>
            <Row>
                <Col className='col-5'>
                    <Container className='characterPicture'>
                        <div>{character.name}</div>
                    </Container>
                    <Container className='fw-bold text-center'>{character.name}</Container>
                </Col>
                <Col className='col-7'>
                    <Container className='d-flex align-items-center'>
                        <div className='fromLocationIcon'></div>
                        <div className='text-center fw-bold'>{character.fromLocation.name}</div>
                    </Container>
                    <Container className='d-flex align-items-center'>
                        <div className='fromLocationIcon'></div>
                        <div className='text-center fw-bold'>{character.lastLocationKnown.name}</div>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col className="text-center pt-3 fs-6">{character.description}</Col>
            </Row>
        </Container>
    );
};
