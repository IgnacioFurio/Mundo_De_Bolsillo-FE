import React, { useEffect, useState } from 'react'
//components
import { InfoButton } from '../InfoButton/InfoButton';
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
    },[]);

    useEffect(() => {
        showMore ? setShowMoreStyle("gameCardShow border border-success rounded my-3") : setShowMoreStyle("gameCard border border-success rounded my-3");

    }, [showMore]);

    const handleShowDescription = () => {
        showMore ? setShowMore(false) : setShowMore(true);        
    };


    return (
        <Container className={showMoreStyle} >
            <Row >
                <Col className='gameTitle border-bottom border-success-subtle rounded m-2 fs-6 fw-bold'>
                    {dataCard.title}
                </Col>
            </Row>
            <Row>
                <Col className='px-4 fs-6 text-break'>
                    {showMore ? dataCard.description : description}
                </Col>
            </Row>
            <Row>                    
                <Col className="d-flex justify-content-end align-items-end">
                {description.length === 83 ? <InfoButton clickFunction={() => handleShowDescription()} status={showMore}/> : ""}
                </Col>
            </Row> 
        </Container>
    )
};