import React, { useEffect, useState } from 'react'
//Redux
import { useDispatch } from 'react-redux';

//components
import { InfoButton } from '../InfoButton/InfoButton';
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//Css
import './GameCard.css'
//GameCard helpers
import { descriptionSlicer } from '../../helpers/GameCard.helper';
import { gameInfo } from '../../services/game.slice';
import { useNavigate } from 'react-router-dom';

export const GameCard = ({ dataCard}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [ description, setDescription ] = useState(dataCard.description);

    const [ showMore, setShowMore ] = useState(false);
    const [ showMoreStyle, setShowMoreStyle] = useState("gameCard border border-success rounded my-3");


    useEffect(() => {
        setDescription(descriptionSlicer(dataCard.description)); 
    },[]);

    useEffect(() => {
        showMore ? setShowMoreStyle("gameCardShow my-3") : setShowMoreStyle("gameCard my-3");
    }, [showMore]);

    const handleShowDescription = () => {
        showMore ? setShowMore(false) : setShowMore(true);        
    };

    const handleClickGame = (e) => {
        dispatch(gameInfo({gameInformation: dataCard}));
        navigate("/games/game-details");
    };

    return (
        <Container className={showMoreStyle}>
            <Row onClick={(e) => handleClickGame(e)}>
                <Col className='gameTitle border-bottom border-success-subtle rounded m-2 fs-6 fw-bold'>
                    {dataCard.title}
                </Col>
            </Row>
            <Row onClick={(e) => handleClickGame(e)}>
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
