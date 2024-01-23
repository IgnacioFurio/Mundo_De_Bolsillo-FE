import React from 'react'
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';

export const GameDetails = () => {
    return (
        <Container id={id}>
            <Row>{title}</Row>
            <Row>{description}</Row>
        </Container>
    )
}
