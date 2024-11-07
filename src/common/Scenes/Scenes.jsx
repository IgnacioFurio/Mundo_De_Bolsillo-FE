import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton';
import { LocationCard } from '../LocationCard/LocationCard';
import { getLocationsByWorldId } from '../../services/location.apicalls';
import { getAllWorlds } from '../../services/world.apicalls';
import { extractWorldId } from '../../helpers/GameDetails.helper';
import { getScenesByGameId } from '../../services/scene.apicalls';

export const Scenes = ({ gameData }) => {
    const navigate = useNavigate();

    const [ scenes, setScenes ] = useState([]);

    const [ gameInformation, setGameInformation ] = useState(gameData);

    //USEEFFECT
    useEffect(() => { getAllScenesByGameId(); },[gameInformation]);

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
                            {/* <LocationCard locationsData={data} worldsData={worlds}/> */}
                        </Col>
            })}
            </Row>
        </Container>
    )
}
