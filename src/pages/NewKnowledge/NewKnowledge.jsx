import React, { useEffect, useState } from 'react'
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { validate } from '../../helpers/validations.helper';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { useSelector } from 'react-redux';
import { gameData } from '../../services/game.slice';
import { getWorldGatesByGameId } from '../../services/worldgate.apicall';
import { getLocationsByWorldId } from '../../services/location.apicalls';
import { getCharactersByWorldId } from '../../services/character.apicalls';
import { createKnowledge } from '../../services/knowledge.apicalls';
import { SubmitButton } from '../../common/SubmitButton/SubmitButton';

export const NewKnowledge = () => {
    const gameRdx = useSelector(gameData);

    const [ worlds, setWorlds ] = useState([]);

    const [ locations, setLocations ] = useState([]);
    const [ characters, setCharacters ] = useState([]);

    //HOOKS
    const [ placeholder, setPlaceholder ] = useState({
        title: "",
        description: "",
        about_character_id: "",
        heard_from_character_id: "",
        about_location_id: "",
        heard_on_location_id: "",
        veracity: "",
    });

    const [ newKnowledgeData, setNewKnowledgeData ] = useState({
        title: "",
        description: "",
        about_character_id: null ,
        heard_from_character_id: null,
        about_location_id: null,
        heard_on_location_id: null,
        veracity: true,
    });
    
    const [ validInputField, setValidInputField ] = useState({
        titleValid: false,
        descriptionValid: true,
        about_character_idValid: true,
        heard_from_character_idValid: true,
        about_location_idValid: true,
        heard_on_location_idValid: true,
        veracityValid: true,
    });
    
    const [ errorInputField, setErrorInputField ] = useState({
        titleError: false,
        descriptionError: true,
        about_character_idError: true,
        heard_from_character_idError: true,
        about_location_idError: true,
        heard_on_location_idError: true,
        veracityError: true,
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    //USEEFFECT
    //primer renderizado de los componentes
    useEffect(() => { getWorldsData(); }, []);

    //mundos
    useEffect(() => { 
        getLocationsData(); 
        getCharactersData();
    }, [worlds]);

    //personajes y localizaciones
    useEffect(() => {console.log(locations);},[locations]); 
    useEffect(() => {console.log(characters);},[characters]);

    //validaciones
    useEffect(() => { 
        setSubmitStatus(checkSubmitStatus());
        console.log(newKnowledgeData);
    }, [validInputField]);

    //HANDLERS
    //handler para los inputs del formulario
    const inputHandler = (e) => {  
        setNewKnowledgeData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };
    
    //handler para el dropdown del formulario
    const dropdownHandler = (e) => {
        setNewKnowledgeData((prevState) => ({
            ...prevState,
            [e.target.name]: parseInt(e.target.value)
        }));

        checkError(e);
    };

    //APICALLS
    //apicall que trae los mundos segun el id de la partida
    const getWorldsData = () => {
        getWorldGatesByGameId(gameRdx.gameInformation.id)//leemos el id de la partida en redux
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

    //apicall que crea una nueva pieza de conocimiento
    const createNewKnowledge = () => {
        createKnowledge(newKnowledgeData)
        .then((result) => {
            console.log("crear nueva conocimiento");
            console.log(result.data.data);
        })
        .catch((error) => {console.log(error);})
    };

    //CHECKS
    const checkError = (e) => {
        let error = "";
    
        let check = validate(
            e.target.name,
            e.target.value,
            e.target.required
            );
            
        error = check.message;

        setValidInputField((prevState) => ({
            ...prevState,
            [e.target.name + 'Valid']: check.valid
        }));
        
        setErrorInputField((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    };

    const checkSubmitStatus = () => {
        for (const key in validInputField) {
            if (validInputField[key] === false) { return false };
        };

        return true;
    };

    return (
        <Container className='detailsBackground border border-black rounded pt-3'>
            <Row className='text-center'>
                <Col className='bannerRibbon fw-bold d-flex justify-content-center align-items-center pb-3'>
                    <input 
                        className='col-9 text-center rounded'
                        name="title"
                        required={true}
                        placeholder={"Título"}
                        onChange={(e) => inputHandler(e)}/>
                </Col>
            </Row>
            <Row className='borderDataCard centerScrollLocations d-flex border border-black justify-content-start align-items-center py-1 mx-2'>                            
                <Col className='characterIcon col-2 fw-bold text-center'></Col>
                <select className='col-9 rounded' 
                        name={"about_character_id"}
                        onChange={(e) => dropdownHandler(e)}
                        >
                    <option value={null} label={"¿Sobre que personaje?"}/>
                    {characters.map((data) => { 
                        return  <option
                                key={data.id}
                                value={data.id}
                                label={data.name}
                                />
                    })}
                </select>

            </Row>
            <Row className='borderDataCard centerScrollLocations d-flex border border-black justify-content-start align-items-center py-1 mx-2'>                            
                <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                <select className='col-9 rounded' 
                        name={"heard_from_character_id"} 
                        onChange={(e) => dropdownHandler(e)}
                        >
                    <option value={null} label={"¿Escuchado de quien?"}/>
                    {characters.map((data) => { 
                        return  <option
                                key={data.id}
                                value={data.id}
                                label={data.name}
                                />
                    })}
                </select>

            </Row>
            <Row className='borderDataCard centerScrollLocations d-flex border border-black justify-content-start align-items-center py-1 mx-2'>                            
                <Col className='locationIcon col-2 fw-bold text-center'></Col>
                <select className='col-9 rounded'
                    name={"about_location_id"} 
                    onChange={(e) => dropdownHandler(e)}
                    >
                    <option value={null} label={"¿Sobre que lugar?"}/>
                    {locations.map((data) => { 
                        return  <option
                                key={data.id}
                                value={data.id}
                                label={data.name}
                                />
                    })};
                </select>

            </Row>
            <Row className='borderDataCard centerScrollLocations d-flex border border-black justify-content-start align-items-center py-1 mx-2'>                            
                <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                <select className='col-9 rounded'
                    name={"heard_on_location_id"} 
                    onChange={(e) => dropdownHandler(e)}
                    >
                    <option value={null} label={"¿Escuchado dónde?"}/>
                    {locations.map((data) => { 
                        return  <option
                                key={data.id}
                                value={data.id}
                                label={data.name}
                                name={"heard_on_location_id"}
                                onClick={() => {}}
                                >
                                    {data.name}
                                </option>
                    })}
                </select>
            </Row>
            <Row className='text-center my-2'>
                <Col className='col-1'/>
                <input 
                    className='col-10 text-center rounded'
                    name="description"
                    required={false}
                    placeholder={"Descripción"}
                    onChange={(e) => inputHandler(e)}/>
                <Col className='col-1'/>
            </Row>
            <Row className='d-flex justify-content-center py-2'>
                <Col className='col-4 p-0'>
                    <SubmitButton clickFunction={() => createKnowledge}/>
                </Col>
            </Row>
        </Container>
    )
};
