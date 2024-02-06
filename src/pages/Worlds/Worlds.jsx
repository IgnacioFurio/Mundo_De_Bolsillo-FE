import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//apicall
import { getAllWorlds } from '../../services/world.apicalls';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
import { NewRegisterButton } from '../../common/NewRegisterButton/NewRegisterButton';


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
                                <Col className='col-1 col-sm-1 col-md-2 col-lg-1'/>
                                <Col className='col-10 col-sm-10 col-md-8 col-lg-4'>
                                    {/* <GameCard key={data.id} dataCard={data}/> */}
                                </Col>
                                <Col className='col-1 col-sm-1 col-md-2 col-lg-1'/>
                            </>
                    })}
            </Row>
        </Container>
    )
};
