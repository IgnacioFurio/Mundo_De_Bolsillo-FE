import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton';
import { getScenesByGameId } from '../../services/scene.apicalls';
import { SceneCard } from '../SceneCard/SceneCard';

export const Scenes = ({ gameData }) => {
    const navigate = useNavigate();

    const [ scenes, setScenes ] = useState([]);

    const [ gameInformation, setGameInformation ] = useState(gameData);

    //USEEFFECT
    useEffect(() => { getAllScenesByGameId(); },[gameInformation]);
    useEffect(() => { console.log(scenes); },[scenes]);

    const getAllScenesByGameId = () => {
        getScenesByGameId(gameInformation.id)
        .then((result) => {            
            setScenes(result?.data?.data);
        })
        .catch((error) => {console.log(error)})
    };

    return (
        <Container>
            <Row>
                <Col className='my-4'>
                    <NewRegisterButton name={"Nueva Escena"} clickFunction={(e) => navigate("/scenes/new-scene")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-1'>
            {scenes.map(data => {
                return <Col key={data.id} className='col-11 col-sm-11 col-md-8 m-1'>                        
                            <SceneCard sceneData={data}/>
                        </Col>
            })}
            </Row>
        </Container>
    )
}
