import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';
import { sessionInfo } from '../../services/session.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SessionCard = ({ sessionData }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ session, setSession ] = useState(
        {
            id: sessionData?.id,
            game_id: sessionData?.game_id,
            title: sessionData?.title,
            description: sessionData?.description,
            scenesAtSession: sessionData?.Scenes
        }
    );

    const [ showMore, setShowMore ] = useState(false);

    useEffect(() => { sortOff(session?.scenesAtSession) }, []);
    //HANDLER
    const showMoreHandler = () => {
        showMore === true ? setShowMore(false) : setShowMore(true);
    };

    const sessionDetailsHandler = (e) => {
        dispatch(sessionInfo({sessionInformation: session}));
        navigate("/games/game-details/session/session-details");
    };

    //FUNCTIONS
    
    const sortOff = (arr) => {        
        const sortArr = [...arr].sort((a,b) => a.session_index - b.session_index);

        setSession((prevState) => (
            {
                ...prevState,
                scenesAtSession: sortArr
            }
        ));
    };

    return (
        <Container>
            <Row className='upperScroll' onClick={() => sessionDetailsHandler()}>
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
                    {session?.scenesAtSession?.length > 0 ? (
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
                    {session?.scenesAtSession?.map((data) => {
                        return  <Row key={data.id} className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                    <Col className='col-1 text-center'>
                                        {data.session_index + 1}
                                    </Col>
                                    <Col className='col-10 text-start'>
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
