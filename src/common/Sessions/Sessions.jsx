import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton';
import { useNavigate } from 'react-router-dom';
import { getSessionsByGameId } from '../../services/session.apicalls';
import { SessionCard } from '../SessionCard/SessionCard';

export const Sessions = ({ gameData }) => {
    const navigate = useNavigate();

    const [ sessions, setSessions ] = useState([]);
    const [ gameInformation, setGameInformation ] = useState(gameData);

    //USEEFFECT
    useEffect(() => { getAllSessionByGameId(); },[gameInformation]);

    const getAllSessionByGameId = () => {
        getSessionsByGameId(gameInformation?.id)
        .then((result) => { setSessions(result?.data?.data); })
        .catch(error => console.log(error))
    };

    return (
        <Container>
            <Row>
                <Col className='my-4'>
                    <NewRegisterButton 
                        name={"Nueva Sesión"} 
                        clickFunction={(e) => navigate("/sessions/new-session")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-1'>
            {sessions.map(data => {
                return <SessionCard key={data.id} sessionData={data}/>
            })}
            </Row>
        </Container>
    )
};