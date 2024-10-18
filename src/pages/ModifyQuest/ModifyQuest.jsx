import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { gameData } from '../../services/game.slice';
import { getWorldGatesByGameId } from '../../services/worldgate.apicall';
import { getLocationsByWorldId } from '../../services/location.apicalls';
import { getCharactersByWorldId } from '../../services/character.apicalls';

export const ModifyQuest = () => {
    const questRdx = useSelector((state) => state.quest);
    const gameRdx = useSelector(gameData)

    const [ worlds, setWorlds ] = useState([]);
    const [ characters, setCharacters ] = useState([]);
    const [ charactersQuest, setCharactersQuest ] = useState([]);
    const [ locations, setLocations ] = useState([]);

    useEffect(() => {console.log(gameRdx.gameInformation);
    }, []);

    //APICALLS
    useEffect(() => { getWorldsData(); },[]);
    
    useEffect(() => {       
        if (Array.isArray(worlds)) {
            getCharactersData();
            getLocationsData();
        };
    },[ worlds ]);
    
    useEffect(() => { console.log(characters) },[]);
        //APICALLS
    //apicall que trae los mundos segun el id de la partida
    const getWorldsData = () => {
        getWorldGatesByGameId(gameRdx?.gameInformation?.id)//leemos el id de la partida en redux
        .then((result) => {
            let data = result?.data?.data;
            let worlds = []; //array dónde guardaremos los id de los mundos
            
            for (let i = 0; i < data.length; i++) { //reccorremos los datos
                const world = data[i].World;        //extraemos los mundos y sus id
                worlds.push(world.id);              //enviamos los id al array de worlds
            };
            
            setWorlds(worlds); //seteamos los mundos en su hook
        })
        .catch((error) => {console.log(error);});
    };
    
    //apicall que trae todas las localizaciones segun el world_id
    const getLocationsData = () => {
        getLocationsByWorldId(worlds)//traemos las localizaciones usando el array de los id de los mundos
        .then((result) => {
            let arr = result?.data?.data;
            let locations = [];            
            
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    locations.push(arr[i][j]);                        
                }
            };
            
            setLocations(locations);//seteamos las localizaciones en su hook
        })
        .catch((error) => {console.log(error)});
    };
    
    //apicall que trae todos los personajes segun el world_id
    const getCharactersData = () => {
        getCharactersByWorldId(worlds)//traemos los personajes usando el array de los id de los mundos
        .then((result) => {            
            let arr = result?.data?.data;
            let characters = [];
            
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    characters.push(arr[i][j]);                        
                }
            };
            
            setCharacters(characters);//seteamos los personajes en su hook
        })
        .catch((error) => {console.log(error)});
    };
    
    return (
        <Container className='centerScrollLocations border border-black rounded pt-1'>
            <Row className='QuestCardShadow text-center'>
                <Col className='bannerRibbonQuest fw-bold py-2'>
                    <input 
                        className='col-9 QuestCardShadow fs-4 fw-bold text-center rounded'
                        name="name"
                        required={true}
                        placeholder={"Título"}
                        onChange={() => {}}/>
                </Col>
            </Row>
        </Container>
    )
}
