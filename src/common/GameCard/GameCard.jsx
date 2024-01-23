import React, { useEffect, useState } from 'react'
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//Css
import './GameCard.css'
//GameCard helpers
import { descriptionSlicer } from '../../helpers/GameCard.helper';

export const GameCard = ({dataCard}) => {

    const [ description, setDescription ] = useState(dataCard.description);

    const [ longword, setLongword ] =useState("");


    useEffect(() => {
        setDescription(descriptionSlicer(description));
    },[]);

    return (
        <Container className='gameCard border border-success rounded my-3'>
            <Row >
                <Col className='gameTitle border-bottom border-success-subtle rounded m-2 fs-6 fw-bold'>
                    {dataCard.title}
                </Col>
            </Row>
            <Row>
                <Col className='px-4 fs-6 text-break'>
                    {description}
                </Col>
            </Row>
        </Container>
    )
};
