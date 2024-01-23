import React, { useEffect, useState } from 'react'
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//Css
import './GameCard.css'
//GameCard helpers
import { descriptionSlicer } from '../../helpers/GameCard.helper';

export const GameCard = ({dataCard}) => {

    const [ description, setDescription ] = useState(dataCard.description);

    const [ showMore, setShowMore ] = useState(false);
    const [ showMoreStyle, setShowMoreStyle] = useState("gameCard border border-success rounded my-3");


    useEffect(() => {
        setDescription(descriptionSlicer(description));
        showMore ? setShowMoreStyle("gameCardShow border border-success rounded my-3") : setShowMoreStyle("gameCard border border-success rounded my-3");
    },[]);

    const handleShowDescription = () => {

    };

    return (
        <Container className={showMoreStyle} onClick={() => {}}>
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
