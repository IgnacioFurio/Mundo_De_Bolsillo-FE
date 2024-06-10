import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton';
import { getAllWorlds } from '../../services/world.apicalls';
import { extractWorldId } from '../../helpers/GameDetails.helper';

export const Characters = () => {
    const navigate = useNavigate();

    const [ characters, setCharacters ] = useState([]);

    const [ worlds, setWorlds ] = useState();


    useEffect(() => {
        // getLocationsByWorldId(extractWorldId(worldGates))
        // .then(result => {
        //     let arr = result.data.data;
        //     let locations = [];

        //     for (let i = 0; i < arr.length; i++) {
        //             for (let j = 0; j < arr[i].length; j++) {
        //                 locations.push(arr[i][j]);                        
        //             }
        //     };
        //     setLocations(locations);
        // })
        // .catch(error => console.log(error.response.data.error))

        getAllWorlds()
        .then(result => {setWorlds(result.data.data);})
        .catch(error => console.log(error));
    },[]);
    
    return (
        <Container>
            <Row>
                <Col className='my-4'>
                    <NewRegisterButton name={"Añadir Personaje"} clickFunction={(e) => navigate("")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-1'>
            {/* {characters.map(data => {
                return <Col key={data.id} className='col-11 col-sm-11 col-md-8 m-1'>                        
                            <LocationCard locationsData={data} worldsData={worlds}/>
                        </Col>
            })} */}
            </Row>
        </Container>
    )
};
