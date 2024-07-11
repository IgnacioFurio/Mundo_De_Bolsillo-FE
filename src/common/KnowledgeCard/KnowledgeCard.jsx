import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';

export const KnowledgeCard = ({ aboutCharacterData }) => {

    useEffect(() => {console.log(aboutCharacterData);});
    return (
        <Container>
            <Row className='text-center pt-2'>
                <Col className='col-12 fw-bold '>{aboutCharacterData.title}</Col>
                <Col className='col-12'>{aboutCharacterData.description}</Col>
            </Row>
        </Container>
    )
};
