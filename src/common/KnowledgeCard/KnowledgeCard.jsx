import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';
import "./KnowledgeCard.css";

export const KnowledgeCard = ({ aboutCharacterData }) => {

    //HOOKS
    const [ secret, setSecret ] = useState();

    const [ showMoreData, setShowMoreData ] = useState(false);

    useEffect(() => { setSecret(aboutCharacterData); }, [secret]);

    //HANDLER
    const showMoreHandler = () => {
        showMoreData === false ? setShowMoreData(true) : setShowMoreData(false);
    };

    return (
        <>
        <Container className='border border-black rounded mt-3'>
            <Row className='text-center'>
                <Col className='bannerRibbon col-12 fw-bold'>
                    {secret?.title}
                </Col>
            </Row>
            <Row className='text-start'>                    
                {showMoreData === true ? 
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
                : 
                (<></>)}
            </Row>
            <Row className='text-center my-1'>
                <Col className='col-12 mb-1'>{secret?.description}</Col>
                    
            </Row>
            <Row>
                <Col className='col-4'></Col>
                <Col className='col-4' onClick={() => showMoreHandler()}>
                    {showMoreData === false ? <NextPrevButton action="Down"/> : <NextPrevButton action="Up"/>}
                </Col>
                <Col className='col-4'></Col>
            </Row>
        </Container>
        </>
    )
};
