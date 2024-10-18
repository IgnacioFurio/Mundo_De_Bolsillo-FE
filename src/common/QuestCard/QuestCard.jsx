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
    useEffect(() => { console.log(quest); }, [quest]);

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
        <Container className='mt-3'>
            <Row className={questCardDesign} onClick={(e) => questHandler(e)}>
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
                    <Row className='text-center my-1'>
                        <Col className='col-12 mb-1'>{quest?.goal || "??"}</Col>                            
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
