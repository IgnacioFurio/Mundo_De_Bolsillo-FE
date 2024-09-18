import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton';
import { QuestCard } from '../QuestCard/QuestCard';

export const Quest = ({ aboutQuestData }) => {
    const navigate = useNavigate();

    const [ quest, setQuest ] = useState(aboutQuestData);

    return (
        <Container>
            <Row>
                <Col className='my-4'>
                    <NewRegisterButton name={"Nueva Misión"} clickFunction={(e) => navigate("")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-1'>
            {quest.map(data => {
                return <QuestCard key={data.id} characterQuestData={data}>{data.quest.name}</QuestCard>
            })}
            </Row>
        </Container>
    )
}
