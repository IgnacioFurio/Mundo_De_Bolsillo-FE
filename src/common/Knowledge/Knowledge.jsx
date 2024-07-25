import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton'
import { KnowledgeCard } from '../KnowledgeCard/KnowledgeCard'
import "./Knowledge.css";
import { useNavigate } from 'react-router-dom';

export const Knowledge = ({ aboutCharacterData }) => {

    const navigate = useNavigate();

    const [ knowledgeData, setKnowledgeDAta ] = useState(aboutCharacterData);

    return (
    <Container className='py-2'>
            <Row>
                <Col className='my-4'>
                    <NewRegisterButton name={"Nuevo Rumor/Secreto"} clickFunction={(e) => navigate("")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
            {knowledgeData.map(data => {
                return <KnowledgeCard key={data.id} aboutCharacterData={data}/>
            })}
            </Row>
        </Container>
    )
};