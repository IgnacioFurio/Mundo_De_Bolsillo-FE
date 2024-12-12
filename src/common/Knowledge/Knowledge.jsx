import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton'
import { KnowledgeCard } from '../KnowledgeCard/KnowledgeCard'
import { useNavigate } from 'react-router-dom';
import "./Knowledge.css";

export const Knowledge = ({ aboutCharacterData }) => {

    const navigate = useNavigate();

    return (
    <Container className='py-2'>
            <Row>
                <Col className='my-4'>
                    <NewRegisterButton name={"Nuevo Rumor/Secreto"} clickFunction={(e) => navigate("/knowledge/new-knowledge")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                {!aboutCharacterData ? (
                    <div className='text-center fw-bold'>Error 404 Información no encontrada</div>
                ) : (
                    aboutCharacterData.map(data => { return <KnowledgeCard key={data.id} aboutCharacterData={data}/>})
                )}
            </Row>
        </Container>
    )
};
