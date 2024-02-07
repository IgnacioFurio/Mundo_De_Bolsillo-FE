import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//apicall
import { getAllWorlds } from '../../services/world.apicalls';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//component
import { NewRegisterButton } from '../../common/NewRegisterButton/NewRegisterButton';
import { WorldCard } from '../../common/WorldCard/WorldCard';


export const Worlds = () => {

    const navigate = useNavigate();

    const [ worlds, setWorlds ] = useState([]);

    useEffect(()=>{
        console.log(worlds);
    })
    useEffect(() => {

        getAllWorlds()
        .then(result => {setWorlds(result.data.data);})
        .catch(error => console.log(error));
    },[]);

    return (
        <Container>
            <Row >
                <Col className='d-flex justify-content- mt-4'>
                    <NewRegisterButton name={"Nuevo Mundo"} clickFunction={(e) => navigate("")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-4'>
                    {worlds.map(data => {
                        return <>
                                <Col className='col-10 col-sm-10 col-md-8 col-lg-4 m-1'>
                                    <WorldCard key={data.id} dataCard={data}/>
                                </Col>
                            </>
                    })}
            </Row>
        </Container>
    )
};
