import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton';
import { LocationCard } from '../LocationCard/LocationCard';
import { getAllLocations, getLocationsByWorldId } from '../../services/location.apicalls';
import { getAllWorlds } from '../../services/world.apicalls';
import { extractWorldId } from '../../helpers/GameDetails.helper';

export const Locations = ({worldGates}) => {
    const navigate = useNavigate();

    const [ locations, setLocations ] = useState([]);
    const [ worlds, setWorlds ] = useState(worldGates);


    useEffect(() => {
        
        console.log(worldGates);
        getLocationsByWorldId(extractWorldId(worldGates.sort(function(a,b) {return a - b})))
        .then(result => {
            let arr = result.data.data;
            console.log(arr);
            let locations = [];

            for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr[i].length; j++) {
                        locations.push(arr[i][j]);                        
                    }
            };

            setLocations(locations);
        })
        .catch(error => console.log(error.response.data.error))

        getAllWorlds()
        .then(result => {setWorlds(result.data.data);})
        .catch(error => console.log(error));
        console.log(locations);
    },[]);

    return (
        <Container>
            <Row>
                <Col className='my-4'>
                    <NewRegisterButton name={"Nueva Localización"} clickFunction={(e) => navigate("/locations/new-location")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-1'>
            {locations.map(data => {
                return <Col key={data.id} className='col-11 col-sm-10 col-md-8 col-lg-5 m-1'>                        
                            <LocationCard locationsData={data} worldsData={worlds}/>
                        </Col>
            })}
            </Row>
        </Container>
    )
}
