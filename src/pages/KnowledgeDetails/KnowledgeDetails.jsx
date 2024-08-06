import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { knowledgeData, knowledgeInfo } from '../../services/knowledge.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';

export const KnowledgeDetails = () => {

    const knowledgeRdx = useSelector(knowledgeData);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [ secret, setSecret ] = useState();

    //USEEFFECT
    useEffect(() => { setSecret(knowledgeRdx.knowledgeInformation); },[]);
    useEffect(() => { console.log(secret); },[knowledgeRdx]);

    //HANDLERS
    const navigateBack = () => {
        dispatch(knowledgeInfo({knowledgeInformation: {}}));      
        navigate("/games/game-details");
    };

    return (
        <Container>
        <Row className='d-flex justify-content-evenly pt-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigateBack("/games/my-games")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("/knowledge/modify-knowledge")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => {}}/></Col>
        </Row>
        <Container className='centerScrollLocations border border-black rounded mt-3 pt-1'>
            <Row className='text-center'>
                <Col className='bannerRibbon fw-bold py-2'>
                    {secret?.title}
                </Col>
            </Row>
            <Row className='text-start'>                    
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
            </Row>
            <Row className='text-center my-1'>
                <Col className='col-12 mb-1'>{secret?.description}</Col>
            </Row>
        </Container>
        </Container>
    )
}
