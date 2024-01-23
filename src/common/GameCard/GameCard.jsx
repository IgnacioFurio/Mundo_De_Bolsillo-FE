import React, { useEffect, useState } from 'react'
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//Css
import './GameCard.css'

export const GameCard = ({dataCard}) => {

    const [ description, setDescription ] = useState(dataCard.description);

    const [ longword, setLongword ] =useState("");


    useEffect(() => {
        if (description.length > 90) {setDescription(description.slice(0,90) + "...")};
    },[]);

    return (
        <Container className='gameCard border border-success rounded my-2'>
            <Row >
                <Col className='gameTitle border-bottom border-success-subtle rounded m-2 fs-5 fw-bold'>
                    {dataCard.title}
                </Col>
            </Row>
            <Row>
                <Col className='px-4 fs-6'>
                    {description}
                </Col>
            </Row>
        </Container>
    )
};
