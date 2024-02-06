import React, { useEffect, useState } from 'react'
//Redux
import { useDispatch } from 'react-redux';

//components
import { InfoButton } from '../InfoButton/InfoButton';
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//GameCard helpers
import { descriptionSlicer } from '../../helpers/GameCard.helper';
import { gameInfo } from '../../services/game.slice';
import { useNavigate } from 'react-router-dom';
//Css
import './GameCard.css'

export const GameCard = ({ dataCard }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [ description, setDescription ] = useState(dataCard.description);

    const [ showMore, setShowMore ] = useState(false);
    const [ showMoreStyle, setShowMoreStyle] = useState("gameCard my-3");


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
            <Row>
                <Col className='gameTitle fs-6 fw-bold' onClick={(e) => handleClickGame(e)}>
                    {dataCard.title}
                </Col>
                <Col className='px-4 fs-6 text-break col-12' onClick={(e) => handleClickGame(e)}>
                    {showMore ? dataCard.description : description}
                </Col>
                <Col className="d-flex justify-content-end align-items-center col-12">
                    {description.length === 83 ? <InfoButton clickFunction={(e) => handleShowDescription(e)} status={showMore}/> : ""}
                </Col>
            </Row>

        </Container>
    )
};
