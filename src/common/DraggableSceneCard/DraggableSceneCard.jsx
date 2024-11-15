import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch } from 'react-redux';
import { characterInfo } from '../../services/character.slice';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//common
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';
import { WoodenButton } from '../WoodenButton/WoodenButton';
import { sceneInfo } from '../../services/scene.slice';

export const DraggableSceneCard = ({ sceneData, onClickFunction, scenes }) => {  
    const [ index, setIndex ] = useState()
    
    const [ scene, setScene ] = useState({
        id: sceneData?.id,
        game_id: sceneData?.game_id,
        title: sceneData?.title,
        description: sceneData?.description,
        location: sceneData?.location,
        characters: sceneData?.CharacterScenes,
        session_index: "",
    });

    useEffect(() => { getIndex(scenes, scene.id);  },[scene]);
    useEffect(() => { console.log(scenes[index]);
    },[index]);

    

    const getIndex = (arr, id) => {
        const indexOf = arr.findIndex(item => item.id === id);

        setIndex(indexOf);
        console.log(indexOf);         
    };

    return (
        <Container>
            <Row className='upperScroll mb-2'>
                <Col 
                    className='d-flex justify-content-center align-items-center ms-3 text-center text-uppercase fw-bold'
                    onClick={onClickFunction}>
                    {scene?.title}
                </Col>
            </Row>            
        </Container>
    );
};
