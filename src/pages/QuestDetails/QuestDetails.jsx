import React, { useEffect, useState } from 'react'
import { questData, questInfo } from '../../services/quest.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { characterData } from '../../services/character.slice';

export const QuestDetails = () => {
    const questRdx = useSelector((state) => state.quest);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [ quest, setQuest ] = useState(questRdx.questInformation);

    //HANDLERS
    const navigateBack = () => {
        dispatch(questInfo({questInformation: {}}));      
        navigate("/games/game-details");
    };

    //FUNCITONS
    //borrar mision
    // const deleteQuestInfo = () => {
    //     deletequest(quest?.id)
    //     .then(() => {
    //         dispatch(questInfo({questInformation: {}}));
    //         navigate("/games/game-details")
    //     })
    //     .catch((error) => {console.log(error);}) 
    // };

    return (
        <Container>
            <Row className='d-flex justify-content-evenly pt-3'>
                    <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigateBack("/games/my-games")}/></Col>
                    <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("/quest/modify-quest")}/></Col>
                    <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => deletequestInfo()}/></Col>
            </Row>
            <Container className='centerScrollLocations border border-black rounded mt-3 pt-1'>
                <Row className='questCardShadow text-center'>
                    <Col className='bannerRibbon fw-bold py-2'>
                        {quest?.name}
                    </Col>
                </Row>
                <Row className='text-start'>                    
                    <Container className='centerScrollLocations col-11 mt-1'>
                        <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                            <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                            <Col className='col-10'>{quest?.delieveredByCharacter?.name || "??"}</Col>
                        </Row>
                        <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                            <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                            <Col className='col-10'>{quest?.gotInLocation?.name || "??"}</Col>
                        </Row>
                        <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                            <Col className='locationIcon col-2 fw-bold text-center'></Col>
                            <Col className='col-10'>{quest?.happensInLocation?.name || "??"}</Col>
                        </Row>
                    </Container>
                </Row>
                <Row className='text-center my-1'>
                    <Col className='col-12 mb-1'>{quest?.goal}</Col>
                </Row>
            </Container>
        </Container>
    )
};