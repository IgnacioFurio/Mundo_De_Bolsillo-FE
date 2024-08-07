import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { WoodenButton } from '../../common/WoodenButton/WoodenButton'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gameData } from '../../services/game.slice';
import { getWorldGatesByGameId } from '../../services/worldgate.apicall';
import { getLocationsByWorldId } from '../../services/location.apicalls';
import { getCharactersByWorldId } from '../../services/character.apicalls';
import { createKnowledge, modifyKnowledge } from '../../services/knowledge.apicalls';
import { validate } from '../../helpers/validations.helper';
import { knowledgeData } from '../../services/knowledge.slice';

export const ModifyKnowledge = () => {
    const navigate = useNavigate();
    const gameRdx = useSelector(gameData);
    
    const knowledgeRdx = useSelector(knowledgeData);

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

    const [ modifyKnowledgeData, setModifyKnowledgeData ] = useState({
        id: knowledgeRdx?.knowledgeInformation?.id,
        title: knowledgeRdx?.knowledgeInformation?.title,
        description: knowledgeRdx?.knowledgeInformation?.description,
        about_character_id: knowledgeRdx?.knowledgeInformation?.about_character_id ,
        heard_from_character_id: knowledgeRdx?.knowledgeInformation?.heard_from_character_id,
        about_location_id: knowledgeRdx?.knowledgeInformation?.about_location_id,
        heard_on_location_id: knowledgeRdx?.knowledgeInformation?.heard_on_location_id,
        veracity: knowledgeRdx?.knowledgeInformation?.veracity,
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

    //validaciones
    useEffect(() => { setSubmitStatus(checkSubmitStatus()); }, [validInputField]);

    //HANDLERS
    //handler para los inputs del formulario
    const inputHandler = (e) => {  
        setModifyKnowledgeData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };
    
    //handler para el dropdown del formulario
    const dropdownHandler = (e) => {
        setModifyKnowledgeData((prevState) => ({
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

    //apicall que modificara una nueva pieza de conocimiento
    const modifyKnowledgeInfo = () => {
        if (submitStatus === true) {
            modifyKnowledge(modifyKnowledgeData)
            .then((result) => {
                navigate("/games/game-details")
            })
            .catch((error) => {console.log(error);})            
        };
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
        <Container className='detailsBackground border border-black rounded py-2'>
            <Row className='KnowledgeCardShadow text-center py-1'>
                <Col className='bannerRibbon fw-bold d-flex justify-content-center align-items-center pb-3'>
                    <input 
                        className='col-9 knowledgeTitle fw-bold text-center rounded'
                        name="title"
                        required={true}
                        placeholder={knowledgeRdx?.knowledgeInformation?.title}
                        onChange={(e) => inputHandler(e)}/>
                </Col>
            </Row>
            <Row className='borderDataCard centerScrollLocations d-flex border border-black justify-content-start align-items-center py-1 mx-2'>                            
                <Col className='characterIcon col-2 fw-bold text-center'></Col>
                <select className='col-9 rounded' 
                        name={"about_character_id"}
                        onChange={(e) => dropdownHandler(e)}
                        >
                    <option 
                        value={knowledgeRdx.knowledgeInformation.id} 
                        label={`Acerca de: ${knowledgeRdx?.knowledgeInformation?.aboutCharacter?.name || "??"}`}
                        />
                    <option value={null} label={"??"}/>
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
                    <option 
                        value={knowledgeRdx?.knowledgeInformation?.heardFromCharacter?.id} 
                        label={`Escuchado de: ${knowledgeRdx?.knowledgeInformation?.heardFromCharacter?.name || "??"}`}
                        />
                    <option value={null} label={"??"}/>
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
                    <option 
                        value={knowledgeRdx?.knowledgeInformation?.aboutLocation?.id} 
                        label={`Sobre: ${knowledgeRdx?.knowledgeInformation?.aboutLocation?.name || "??"}`}
                        />
                    <option value={null} label={"??"}/>
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
                    <option 
                        value={knowledgeRdx?.knowledgeInformation?.heardOnLocation?.id} 
                        label={`Escuchado en: ${knowledgeRdx?.knowledgeInformation?.heardOnLocation?.name || "??"}`}
                        />
                    <option value={null} label={"??"}/>
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
                <textarea 
                    className='col-10 text-center rounded'
                    name="description"
                    required={false}
                    type='textarea'
                    placeholder={knowledgeRdx?.knowledgeInformation?.description}
                    onChange={(e) => inputHandler(e)}
                    style={{height: 8 + "em"}}
                    />
                <Col className='col-1'/>
            </Row>

            <Row className='d-flex justify-content-evenly py-1'>
                <Col className='col-4 d-flex justify-content-center'>
                    <WoodenButton activateButton={true} action="back" clickFunction={() => navigate("/knowledge/knowledge-details")}/>
                </Col>
                <Col className='col-4 p-0'>
                    <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => modifyKnowledgeInfo()}/>
                </Col>
            </Row>
        </Container>
    )
}
