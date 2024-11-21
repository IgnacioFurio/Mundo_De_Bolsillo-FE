import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { sessionData, sessionInfo } from '../../services/session.slice';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { sceneInfo } from '../../services/scene.slice';
import { deleteSession } from '../../services/session.apicalls';

export const SessionDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sessionRdx = useSelector(sessionData);

    const [ session, setSession ] = useState(
        {
            id: sessionRdx?.sessionInformation?.id,
            game_id: sessionRdx?.sessionInformation?.game_id,
            title: sessionRdx?.sessionInformation?.title,
            description: sessionRdx?.sessionInformation?.description,
            scenesAtSession: sessionRdx?.sessionInformation?.scenesAtSession
        }
    );

    useEffect(() => { sortOff(session?.scenesAtSession)}, [sessionRdx]);

    //FUNCTIONS
    const navigateBack = (e) => {
        // eliminar la información guardada en redux acerca de la escena
        dispatch(sceneInfo({sceneInformation: {}})); 
        navigate("/games/game-details");
    };

    const sortOff = (arr) => {        
        const sortArr = [...arr].sort((a,b) => a.session_index - b.session_index);

        setSession((prevState) => (
            {
                ...prevState,
                scenesAtSession: sortArr
            }
        ));
    };

    //ACPICALLS
    const deleteSessionById = () => {
        deleteSession(session?.id)
        .then((result) => {
            dispatch(sessionInfo({sessionInformation: {}}));      
            navigate("/games/game-details")
        })
        .catch(error => console.log(error))
    };

    return (
        <Container>
            <Row className='d-flex justify-content-evenly py-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigateBack()}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("/sessions/modify-session")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => deleteSessionById()}/></Col>
            </Row> 
            <Row className='upperScroll'>
                <Col className='d-flex justify-content-center align-items-center ms-3 text-center text-uppercase fw-bold'>
                    {sessionRdx?.sessionInformation?.title}
                </Col>
            </Row>
                <Container className='centerScrollLocations col-10'>
                    <Row className='text-center py-1'>
                        <Col className='col-12 mt-1 '> 
                            {sessionRdx?.sessionInformation?.description}
                        </Col>
                    </Row>
                    {sessionRdx?.sessionInformation?.scenesAtSession?.length > 0 ? (
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
            <Row className='downScroll'>
                <Col className='col-12 fw-bold text-center text-white'>{}</Col>
            </Row>
        </Container>
    )
}
