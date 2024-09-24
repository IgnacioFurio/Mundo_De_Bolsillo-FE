import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';
import "./QuestCard.css"
import { questData, questInfo } from '../../services/quest.slice';

export const QuestCard = ({ characterQuestData }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    //HOOKS
    const [ quest, setQuest ] = useState();

    const [ showMoreData, setShowMoreData ] = useState(false);

    const [ questCardDesign, setQuestCardDesign ] = useState();

    const [ titleCardDesign, setTitleCardDesign ] = useState();

    //USEEFFECT
    useEffect(() => { setQuest(characterQuestData.quest); }, []);

    useEffect(() => { questStatusHandler(quest); }, [quest]);

    //HANDLER
    const showMoreHandler = () => {
        showMoreData === false ? setShowMoreData(true) : setShowMoreData(false);
    };

    const questStatusHandler = () => {
        quest?.status === true ? setQuestCardDesign("QuestCardShadow text-center") : setQuestCardDesign("QuestCardShadowComplete text-center")
        quest?.status === true ? setTitleCardDesign("bannerRibbonQuest fw-bold py-2") : setTitleCardDesign("bannerRibbonQuestComplete fw-bold py-2")
    };

    const questHandler = (e) => {
        dispatch(questInfo({ questInformation: quest }));
        navigate('/quests/quest-details');
    };

    return (
        <Container className='mt-3' onClick={(e) => questHandler(e)}>
            <Row className={questCardDesign}>
                <Col className={titleCardDesign}>
                    {quest?.name}
                </Col>
            </Row>
            <Row className='text-start'>                    
                {showMoreData === true ? 
                <>
                <Container className='centerScrollLocations col-11 mt-1'>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{quest?.delievered_by_character_id || "??"}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{quest?.got_in_location_id || "??"}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='locationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{quest?.happens_in_location_id || "??"}</Col>
                    </Row>
                </Container>
                <Container>
                    <Row className='text-center my-1'>
                        <Col className='col-12 mb-1'>{quest?.goal}</Col>                            
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
