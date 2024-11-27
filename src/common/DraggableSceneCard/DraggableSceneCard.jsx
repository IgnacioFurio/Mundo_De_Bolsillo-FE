import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//common
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';

export const DraggableSceneCard = ({ sceneData, onClickFunction }) => {  
    const [ index, setIndex ] = useState()
    
    const [ scene, setScene ] = useState({
        id: sceneData?.id,
        game_id: sceneData?.game_id,
        title: sceneData?.title,
        description: sceneData?.description,
        location: sceneData?.location,
        characters: sceneData?.CharacterScenes,
        session_index: null,
    });

    const [ charactersAtScene, setCharactersAtScene ] = useState([]);

    const [ showMore, setShowMore ] = useState(false);

    useEffect(() => { getCharactersAtScene(scene); },[scene]);
    
    //HANDLER
    const showMoreHandler = () => {
        showMore === true ? setShowMore(false) : setShowMore(true);
    };

    const getCharactersAtScene = (arr) => {
        let charactersArr = [];
        console.log(arr.characters.length);
        
        if (arr?.characters?.length > 0 ) {
            scene?.characters.map((data) => {
                console.log(data);
                
                charactersArr.push(data.characterId);
            });
        };
        console.log(charactersArr);
        
        setCharactersAtScene(charactersArr.sort((a,b)  => a.name - b.name));
    };

    return (
        <Container className='my-1'>
            <Row className='upperScroll' onClick={onClickFunction}>
                <Col className='d-flex justify-content-center align-items-center ms-3 text-center text-uppercase fw-bold'>
                    {scene?.title}
                </Col>
            </Row>
            {showMore === true ? (
                <Container className='centerScrollLocations col-10'>
                <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                    <Col className='locationIcon col-2 fw-bold text-center'></Col>
                    <Col className='col-10'>
                    {scene?.location?.name}
                    </Col>
                </Row>
                <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                    <Col className='populationIcon col-2 fw-bold text-center'></Col>
                    <Col className='col-10 my-1 d-flex flex-wrap'>
                    {charactersAtScene.map((data) => {
                            return <button key={data.id} className='rounded mx-1 my-1'>{data.name}</button  >
                        })}
                    </Col>
                </Row>
                <Row className='text-center py-1'>
                    <Col className='col-12 mt-1 '> 
                    {scene?.description}
                    </Col>
                </Row>
            </Container>
            ) : (
                <></>
            )}
            
            <Row className='downScroll' onClick={(e) => showMoreHandler(e)}>
                <Col className='col-12 fw-bold text-center text-white'>{scene?.name}</Col>
                <Col>
                    {showMore === false ? <NextPrevButton action="Down"/> : <NextPrevButton action="Up"/>}
                </Col>
            </Row>
        </Container>
    );
};
