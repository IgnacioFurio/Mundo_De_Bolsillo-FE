import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton';

export const Quest = () => {
    const navigate = useNavigate();

    const [ quest, setQuest ] = useState([]);

    const [ worlds, setWorlds ] = useState();


    useEffect(() => {    },[]);

    return (
        <Container>
            <Row>
                <Col className='my-4'>
                    <NewRegisterButton name={"Nueva Misión"} clickFunction={(e) => navigate("")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-1'>
            {quest.map(data => {
                return <div>{data.name}</div>
            })}
            </Row>
        </Container>
    )
}
