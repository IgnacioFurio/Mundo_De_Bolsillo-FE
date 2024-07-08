import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { characterData, characterInfo } from '../../services/character.slice';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { useNavigate } from 'react-router-dom';

export const CharacterDetails = () => {
    //HOOKS
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const characterRdx = useSelector(characterData);

const navigateBack = () => {
    dispatch(characterInfo({characterInformation: {}}));
    navigate("/games/game-details")
}; 

    return (
        <Container className='col-12 col-sm-11 col-md-8 pb-2'>
            <Row className='d-flex justify-content-evenly py-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigateBack()}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => {}}/></Col>
            </Row> 
            <Row className='upperScroll d-flex justify-content-center align-items-center' >
                <Col className='characterPicture fw-bold eb-garamond-font'>{characterRdx.characterInformation.name.toUpperCase()} </Col>
            </Row>
            <Container className='centerScrollLocations col-10'>
                <Row className='borderDataCard align-items-center py-1 px-2'>                            
                    <Col className='text-center'>{characterRdx.characterInformation.description}</Col>
                </Row> 
                <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>                            
                    <Col className='fromLocationIcon col-1 fw-bold'></Col>
                    <Col className='col-10'> {characterRdx.characterInformation.fromLocation.name}</Col>
                </Row>
                <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                    <Col className='lastLocationKnownIcon col-1 fw-bold'></Col>
                    <Col className='col-10'> {characterRdx.characterInformation.lastLocationKnown.name}</Col>
                </Row>
            </Container> 
            <Row className='downScroll d-flex justify-content-center align-items-center'>
                <Col className='col-12 text-center fw-bold'>{characterRdx.characterInformation.name}</Col>
            </Row>
        </Container>
    );
};
