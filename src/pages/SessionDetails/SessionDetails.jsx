import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { sessionData, sessionInfo } from '../../services/session.slice';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { SceneCard } from '../../common/SceneCard/SceneCard';
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
        const sortArr = [...arr].sort((a,b) => a?.session_index - b?.session_index);

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
        <Container className='shadowCard'>
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
                            {session?.scenesAtSession?.map((data) => {
                                return  <Col key={data.id} className='col-12 mx-1 my-2'>
                                    <SceneCard sceneData={data}/>
                                </Col>
                            })}
                    </Row>
                    ) : (
                    <Row className='text-center py-1'>
                        <Col className='col-12 mt-1 fw-bold'> 
                            Sin escenas aún
                        </Col>
                    </Row>
                    )
                }
            </Container>
            <Row className='downScroll'>
                <Col className='col-12 fw-bold text-center text-white'>{}</Col>
            </Row>
        </Container>
    )
}
