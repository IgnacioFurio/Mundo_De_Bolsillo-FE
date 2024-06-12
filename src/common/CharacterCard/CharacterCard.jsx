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
        <Container className='fileDesign border border-dark rounded'>
            <Row>
                <Col className='fw-bold text-center text-white'>{character.name}</Col>
            </Row>
            <Row className='border border-dark rounded-top'>
                <Col className='characterCardToken col-5'>
                    <Container className='characterPicture'>
                        <div>{character.name}</div>
                    </Container>
                </Col>
                <Col className='characterCardLocation col-7 p-0'>
                    <Container className='d-flex align-items-center'>
                        <div className='col-3 fromLocationIcon'></div>
                        <div className='col-9 text-start fw-bold'>{character.fromLocation.name}</div>
                    </Container>
                    <Container className='d-flex align-items-center'>
                        <div className='col-3 lastLocationKnownIcon'></div>
                        <div className='col-9 text-start fw-bold'>{character.lastLocationKnown.name}</div>
                    </Container>
                </Col>
            </Row>
            <Row className='characterCardDescription border border-0 rounded-bottom pb-2'>
                <Col className="text-center pt-3 fs-6">{character.description}</Col>
            </Row>
        </Container>
    );
};
