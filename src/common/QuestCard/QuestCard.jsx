import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';
import "./QuestCard.css"

export const QuestCard = ({ characterQuestData }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // const knowledgeRdx = useSelector(knowledgeData);

    //HOOKS
    const [ quests, setQuests ] = useState();

    const [ showMoreData, setShowMoreData ] = useState(false);

    //USEEFFECT
    useEffect(() => { 
        console.log(quests?.quest?.name);
        
        setQuests(characterQuestData); }, [quests]);

    //HANDLER
    const showMoreHandler = () => {
        showMoreData === false ? setShowMoreData(true) : setShowMoreData(false);
    };

    // CREAR SLICER PARA LAS MISIONES
    // const knowledgeHandler = (e) => {
    //     dispatch(knowledgeInfo({ knowledgeInformation: aboutCharacterData }));
    //     navigate('/knowledge/knowledge-details');
    // };

    return (
        <Container className='mt-3'>
            <Row className='QuestCardShadow text-center' onClick={(e) => knowledgeHandler(e)}>
                <Col className='bannerRibbonQuest fw-bold py-2'>
                    {quests?.quest?.name}
                </Col>
            </Row>
            <Row className='text-start'>                    
                {showMoreData === true ? 
                <>
                <Container className='centerScrollLocations col-11 mt-1'>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{quests?.quest?.delievered_by_character_id || "??"}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{quests?.quest?.got_in_location_id || "??"}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='locationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{quests?.quest?.happens_in_location_id || "??"}</Col>
                    </Row>
                </Container>
                <Container>
                    <Row className='text-center my-1'>
                        <Col className='col-12 mb-1'>{quests?.quest?.goal}</Col>                            
                    </Row>
                </Container>
                </>
                : 
                (<></>)}
            </Row>
            <Row>
                <Col className='col-4'></Col>
                <Col className='col-4 KnowledgeCardShadow' onClick={() => showMoreHandler()}>
                    {showMoreData === false ? <NextPrevButton action="Down"/> : <NextPrevButton action="Up"/>}
                </Col>
                <Col className='col-4'></Col>
            </Row>
        </Container>
    )
}
