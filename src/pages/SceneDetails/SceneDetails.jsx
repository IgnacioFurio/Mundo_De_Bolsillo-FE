import React, { useEffect, useState } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux';
import { locationData, locationInfo } from '../../services/location.slice';
import { sceneData, sceneInfo } from '../../services/scene.slice';
//components
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
//apicall
import { deleteLocation } from '../../services/location.apicalls';
import { deleteScene } from '../../services/scene.apicalls';

export const SceneDetails = () => {
    //HOOKS
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const sceneRdx = useSelector(sceneData);
    const [ charactersAtScene, setCharactersAtScene ] = useState([]);
    
    //USEEFFECT
    useEffect(() => {console.log(sceneRdx?.sceneInformation?.id);  }, []);
    
    useEffect(() => { getCharactersAtScene(); }, [sceneRdx]);
    //FUNCTIONS
    const navigateBack = (e) => {
        // eliminar la información guardada en redux acerca de la escena
        dispatch(sceneInfo({sceneInformation: {}})); 
        navigate("/games/game-details");
    };

    //APICALLS
    const deleteSceneData = () => {
        deleteScene(sceneRdx?.sceneInformation?.id)
        .then(result => {
            navigateBack();
        })
        .catch((error) => {console.log(error);})
    };

    //FUNCITONS
    const getCharactersAtScene = () => {
        let charactersArr = [];

        sceneRdx?.sceneInformation?.characters.map((data) => {
            charactersArr.push(data.characterId);
        });

        setCharactersAtScene(charactersArr);
    };

    return (
        <Container className='col-12 col-sm-11 col-md-8 pb-2'>
            <Row className='d-flex justify-content-evenly py-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigateBack()}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("/scenes/modify-scene")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => deleteSceneData()}/></Col>
            </Row> 
            <Row className='upperScroll d-flex justify-content-center align-items-center pt-2' >
                <Col className='col-9 text-center fs-4 fw-bold eb-garamond-font ps-3'>{sceneRdx?.sceneInformation?.title.toUpperCase()} </Col>
            </Row>
            <Container className='centerScrollLocations col-10'>
                <Row className='borderDataCard align-items-center col-10 py-1 px-2'>                            
                    <Col className='locationIcon col-1 fw-bold text-center'></Col>
                    <Col className='col-9'>{sceneRdx?.sceneInformation?.location?.name}</Col>
                </Row> 
                <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>                            
                    <Col className='populationIcon col-1 fw-bold'></Col>
                    <Col className='col-10 my-1 d-flex flex-wrap'>
                    {charactersAtScene.map((data) => {
                            return <button key={data.id} className='rounded mx-1 my-1'>{data.name}</button  >
                        })}
                    </Col>                
                </Row>
                <Row className='borderDataCard d-flex align-items-center mt-0 py-1 px-2'>                            
                    <Col className='col-12 text-center'> {sceneRdx?.sceneInformation?.description}</Col>
                </Row>
            </Container> 
            <Row className='downScroll d-flex justify-content-center align-items-center'>
                <Col className='col-12 text-center fw-bold'>{sceneRdx?.sceneInformation?.type}</Col>
            </Row>
        </Container>
    )
};
