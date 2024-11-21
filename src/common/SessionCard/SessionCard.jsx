import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';

export const SessionCard = ({ sessionData }) => {

    const [ session, setSession ] = useState(
        {
            id: sessionData.id,
            game_id: sessionData.game_id,
            title: sessionData.title,
            description: sessionData.description,
        }
    );

    const [ scenesAtSession, setScenesAtSession ] = useState(sessionData.Scenes);

    const [ showMore, setShowMore ] = useState(false);

    useEffect(() => {console.log(scenesAtSession);  }, []);

    //HANDLER
    const showMoreHandler = () => {
        showMore === true ? setShowMore(false) : setShowMore(true);
    };

    return (
        <Container>
            <Row className='upperScroll' onClick={() => sceneDetailsHandler()}>
                <Col className='d-flex justify-content-center align-items-center ms-3 text-center text-uppercase fw-bold'>
                    {sessionData?.title}
                </Col>
            </Row>
            {showMore === true ? (
                <Container className='centerScrollLocations col-10'>
                    <Row className='text-center py-1'>
                        <Col className='col-12 mt-1 '> 
                            {session?.description}
                        </Col>
                    </Row>
                    {scenesAtSession.length > 0 ? (
                        <Row className='text-center py-1'>
                            <Col className='col-12 mt-1 fw-bold'> 
                                Escenas:
                            </Col>
                        </Row>
                        ) : (
                        <Row className='text-center py-1'>
                            <Col className='col-12 mt-1 fw-bold'> 
                                Sin escenas aún
                            </Col>
                        </Row>
                        )
                    }
                    {scenesAtSession.map((data) => {
                        return  <Row key={data.id} className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                    <Col className='col-3 text-center'>
                                        {data.session_index + 1}
                                    </Col>
                                    <Col className='col-9 text-start'>
                                        {data.title}
                                    </Col>
                                </Row>
                    })}
                </Container>
            ) : (
                <></>
            )}
            
            <Row className='downScroll' onClick={(e) => showMoreHandler(e)}>
                <Col className='col-12 fw-bold text-center text-white'>{}</Col>
                <Col>
                    {showMore === false ? <NextPrevButton action="Down"/> : <NextPrevButton action="Up"/>}
                </Col>
            </Row>
        </Container>
    )
}
