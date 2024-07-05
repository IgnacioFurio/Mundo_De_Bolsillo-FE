import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NewRegisterButton } from '../NewRegisterButton/NewRegisterButton';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { getAllWorlds } from '../../services/world.apicalls';
import { extractWorldId } from '../../helpers/GameDetails.helper';
import { getCharactersByWorldId } from '../../services/character.apicalls';


export const Characters = ({ worldGates }) => {
    const navigate = useNavigate();

    const [ characters, setCharacters ] = useState([]);

    const [ worlds, setWorlds ] = useState();


    useEffect(() => {
        getCharactersByWorldId(extractWorldId(worldGates))
        .then(result => {
            let arr = result.data.data;
            let characters = [];

            for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr[i].length; j++) {
                        characters.push(arr[i][j]);                        
                    }
            };
            setCharacters(characters);
        })
        .catch(error => console.log(error.response.data.error))

        getAllWorlds()
        .then(result => {setWorlds(result.data.data);})
        .catch(error => console.log(error));
        console.log(characters);
    },[]);
    
    return (
        <Container>
            <Row>
                <Col className='my-4'>
                    <NewRegisterButton name={"Añadir Personaje"} clickFunction={(e) => navigate("/characters/new-character")}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-1'>
            {characters.map(data => {
                return <Col key={data.id} className='col-11 col-sm-10 col-md-8 col-lg-5 m-2'>   
                            <CharacterCard characterData={data} worldsData={worlds}/>
                        </Col>
            })}
            </Row>
        </Container>
    )
};
