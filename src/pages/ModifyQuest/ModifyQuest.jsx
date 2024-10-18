import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { gameData } from '../../services/game.slice';
import { getWorldGatesByGameId } from '../../services/worldgate.apicall';
import { getLocationsByWorldId } from '../../services/location.apicalls';
import { getCharactersByWorldId } from '../../services/character.apicalls';
import { validate } from '../../helpers/validations.helper';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { useNavigate } from 'react-router-dom';

export const ModifyQuest = () => {
    const navigate = useNavigate();

    const questRdx = useSelector((state) => state.quest);
    const gameRdx = useSelector(gameData);

    const [ questInformation, setQuestInformation ] = useState({
        name: questRdx?.questInformation?.name,
        goal:  questRdx?.questInformation?.goal,
        delievered_by_character_id:  questRdx?.questInformation?.delievered_by_character_id,
        got_in_location_id:  questRdx?.questInformation?.got_in_location_id,
        happens_in_location_id:  questRdx?.questInformation?.happens_in_location_id,
        characters_id: [],
        status: true /*Predefinimos el estado de la misión como activa*/
    });

    const [ validInputField, setValidInputfield ] = useState({
        nameValid: false,    /*Establecemos como falso los valores que son obligatorios */
        goalValid: true,
        delievered_by_character_idValid: true,
        got_in_location_idValid: true,
        happens_in_location_idValid: true,
        characters_idValid: true,
        statusValid: true
    });
    
    const [ errorInputField, setErrorInputfield ] = useState({
        nameError: "",
        goalError: "",
        delievered_by_character_idError: "",
        got_in_location_idError: "",
        happens_in_location_idError: "",
        characters_idError: "",
        status: ""
    });

    const [ worlds, setWorlds ] = useState([]);
    const [ characters, setCharacters ] = useState([]);
    const [ locations, setLocations ] = useState([]);

    const [ submitStatus, setSubmitStatus ] = useState(false);

    useEffect(() => {console.log(questRdx.questInformation);
    }, []);

    //APICALLS
    useEffect(() => { getWorldsData(); },[]);
    
    useEffect(() => {       
        if (Array.isArray(worlds)) {
            getCharactersData();
            getLocationsData();
        };
    },[ worlds ]);
    
    useEffect(() => { console.log(questInformation) },[questInformation]);

    //HANDLERS
    const inputHandler = (e) => {        
        setQuestInformation((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
};

    //handler para el dropdown del formulario
    const dropdownHandler = (e) => {       
        setQuestInformation((prevState) => ({
            ...prevState,
            [e.target.name]: parseInt(e.target.value)
        }));

        checkError(e);
    };

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

     //CHECKS
    const checkError = (e) => {     
        let error = "";
    
        let check = validate(
            e.target.name,
            e.target.value,
            e.target.required
            );
            
        error = check.message;

        setValidInputfield((prevState) => ({
            ...prevState,
            [e.target.name + 'Valid']: check.valid
        }));
        
        setErrorInputfield((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    };
    
    return (
        <Container className='centerScrollLocations border border-black rounded pt-1'>
            <Row className='QuestCardShadow text-center'>
                <Col className='bannerRibbonQuest fw-bold py-2'>
                    <input 
                        className='col-9 QuestCardShadow fw-bold text-center rounded'
                        name="name"
                        required={true}
                        placeholder={questRdx?.questInformation?.name || "Título"}
                        onChange={(e) => inputHandler(e)}/>
                </Col>
            </Row>
            <Row className='text-start'>                    
                <Container className='centerScrollLocations col-11 mt-1'>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>
                            <select 
                                className='col-12 rounded'
                                name={"delievered_by_character_id"} 
                                onChange={(e) => dropdownHandler(e)}
                                >
                                <option 
                                    value={questRdx?.questInformation?.delieveredByCharacter?.id} 
                                    label={`Contado por...: ${questRdx?.questInformation?.delieveredByCharacter?.name}`}
                                />
                                {!characters ? ( 
                                        <></>
                                    ) : (
                                    characters.map((data) => { 
                                        return  <option
                                            key={data.id}
                                            value={data.id}
                                            label={data.name}
                                            >
                                                {data.name}
                                            </option>
                                }))}
                            </select>
                        </Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>
                            <select 
                                className='col-12 rounded'
                                name={"got_in_location_id"} 
                                onChange={(e) => dropdownHandler(e)}
                                >
                                <option 
                                    value={questRdx?.questInformation?.gotInLocation?.id} 
                                    label={`Escuchado en: ${questRdx?.questInformation.gotInLocation.name}` }
                                    />
                                {!locations ? ( 
                                        <></>
                                    ) : (
                                    locations.map((data) => { 
                                        return  <option
                                            key={data.id}
                                            value={data.id}
                                            label={data.name}
                                            >
                                                {data.name}
                                            </option>
                                }))}
                            </select>
                        </Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='locationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'> 
                        <select 
                                className='col-12 rounded'
                                name={"happens_in_location_id"} 
                                onChange={(e) => dropdownHandler(e)}
                                >
                                <option 
                                    value={questRdx?.questInformation?.happensInLocation?.id} 
                                    label={`Ocurre en: ${questRdx?.questInformation?.happensInLocation?.name}`}
                                    />
                                {!locations ? ( 
                                        <></>
                                    ) : (
                                    locations.map((data) => { 
                                        return  <option
                                            key={data.id}
                                            value={data.id}
                                            label={data.name}
                                            >
                                                {data.name}
                                            </option>
                                }))}
                            </select>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row>
                <Col className='col-12 d-flex justify-content-evenly py-3'>
                    <WoodenButton activateButton={true} action="back" clickFunction={() => navigate("/quests/quest-details")}/>
                    <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => {}}/>
                </Col>
            </Row>
        </Container>
    )
}
