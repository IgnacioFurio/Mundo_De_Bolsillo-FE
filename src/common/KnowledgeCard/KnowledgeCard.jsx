import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';

export const KnowledgeCard = ({ aboutCharacterData }) => {

    //HOOKS
    const [ secret, setSecret ] = useState();

    const [ showMoreData, setShowMoreData ] = useState(false);

    useEffect(() => {
        setSecret(aboutCharacterData);
    }, [secret]);

    //HANDLER
    const showMoreHandler = () => {
        showMoreData === false ? setShowMoreData(true) : setShowMoreData(false);
    };

    return (
        <Container>
            <Row className='border border-dark rounded-3 text-center mt-2 py-1'>
                <Col className='col-12 border-bottom border-black fw-bold py-1'>{secret?.title}</Col>
                <Col className='col-12 mb-1'>{secret?.description}</Col>
                <Col onClick={() => showMoreHandler()}>{showMoreData === false ? "Más" : "Menos"}</Col>
            </Row>
        </Container>
    )
};
