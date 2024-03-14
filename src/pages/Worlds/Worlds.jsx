import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//apicall
import { getAllWorlds } from '../../services/world.apicalls';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//component
import { NewRegisterButton } from '../../common/NewRegisterButton/NewRegisterButton';
import { WorldCard } from '../../common/WorldCard/WorldCard';
import { worldData } from '../../services/world.slice';
import { useSelector } from 'react-redux';


export const Worlds = () => {

    const navigate = useNavigate();

    const [ worlds, setWorlds ] = useState([]);

    const dataRdx = useSelector(worldData);

    useEffect(() => {

        getAllWorlds()
        .then(result => {setWorlds(result.data.data);})
        .catch(error => console.log(error));

        console.log(dataRdx);
    },[]);

    return (
        <Container>
            <Row >
                <Col className='my-4'>
                    <NewRegisterButton name={"Nuevo Mundo"} clickFunction={(e) => navigate("/worlds/new-world")}/>
                </Col>
            </Row>
            {worlds.map(data => {
                return <Row className='d-flex justify-content-center mt-1'>
                        <Col className='col-10 col-sm-10 col-md-8 col-lg-4 m-1'>
                            <WorldCard key={data.id} dataCard={data}/>
                        </Col>
                    </Row>
            })}
        </Container>
    )
};
