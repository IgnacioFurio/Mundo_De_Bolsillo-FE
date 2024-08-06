import React, { useEffect, useState } from 'react'
import { knowledgeData, knowledgeInfo } from '../../services/knowledge.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';
import "./KnowledgeCard.css";
import { useNavigate } from 'react-router-dom';

export const KnowledgeCard = ({ aboutCharacterData }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const knowledgeRdx = useSelector(knowledgeData);

    //HOOKS
    const [ secret, setSecret ] = useState();

    const [ showMoreData, setShowMoreData ] = useState(false);

    //USEEFFECT
    useEffect(() => { setSecret(aboutCharacterData); }, [secret]);

    //HANDLER
    const showMoreHandler = () => {
        showMoreData === false ? setShowMoreData(true) : setShowMoreData(false);
    };

    const knowledgeHandler = (e) => {
        dispatch(knowledgeInfo({ knowledgeInformation: aboutCharacterData }));
        navigate('/knowledge/knowledge-details');
    };

    return (
        <Container className='mt-3'>
            <Row className='KnowledgeCardShadow text-center' onClick={(e) => knowledgeHandler(e)}>
                <Col className='bannerRibbon fw-bold py-2'>
                    {secret?.title}
                </Col>
            </Row>
            <Row className='text-start'>                    
                {showMoreData === true ? 
                <>
                <Container className='centerScrollLocations col-11 mt-1'>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='characterIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{secret?.aboutCharacter?.name || "??"}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{secret?.heardFromCharacter?.name || "??"}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='locationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{secret?.aboutLocation?.name || "??"}</Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>{secret?.heardOnLocation?.name || "??"}</Col>
                    </Row>
                </Container>
                <Container>
                    <Row className='text-center my-1'>
                        <Col className='col-12 mb-1'>{secret?.description}</Col>                            
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
};
