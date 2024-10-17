import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//helper
import { useSelector } from 'react-redux';
import { validate } from '../../helpers/validations.helper';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { gameData } from '../../services/game.slice';
import { getLocationsByWorldId } from '../../services/location.apicalls';
import { getCharactersByWorldId } from '../../services/character.apicalls';
import { getWorldGatesByGameId } from '../../services/worldgate.apicall';
import { Col, Container, Row } from 'react-bootstrap';
import { createQuest } from '../../services/quest.apicall';
import { SearchBar } from '../../common/SearchBar/SearchBar';
import { CheckBox } from '../../common/CheckBox/CheckBox';

export const NewQuest = () => {

    const navigate = useNavigate();
    const gameRdx = useSelector(gameData)

    //HOOKS
    const [ newQuestData, setNewQuestData ] = useState({
        name: "",
        goal: "",
        delievered_by_character_id: null,
        got_in_location_id: null,
        happens_in_location_id: null,
        characters_id: [],
        status: true /*Predefinimos el estado de la misión como activa*/
    });

    const [ validInputField, setValidInputfield ] = useState({
        nameValid: false,    /*Establecemos como falso los valores que son obligatorios */
        goalValid: true,
        delievered_by_character_idValid: true,
        got_in_location_idValid: true,
        happens_in_location_idValid: true,
        statusValid: true
    });
    
    const [ errorInputField, setErrorInputfield ] = useState({
        nameError: "",
        goalError: "",
        delievered_by_character_idError: "",
        got_in_location_idError: "",
        happens_in_location_idError: "",
        status: ""
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    const [ worlds, setWorlds ] = useState([]);
    const [ characters, setCharacters ] = useState([]);
    const [ charactersQuest, setCharactersQuest ] = useState([]);
    const [ locations, setLocations ] = useState([]);

    const [ searchInput, setSearchInput ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);
    
    //VALIDATIONS
    useEffect(() => { getWorldsData(); },[]);
    
    useEffect(() => {       
        if (Array.isArray(worlds)) {
            getCharactersData();
            getLocationsData();
        };
    },[ worlds ]);

    useEffect(() => { filter(searchInput, characters); },[ searchInput ]);

    useEffect(() => { setSubmitStatus(checkSubmitStatus()); }, [validInputField]);

    // TESTING ZONE ////////////////////////////////
    useEffect(() => { 
        setCharactersQuest(() => {
            let charactersArr = [];
            
            for (let i = 0; i < characters.length; i++) {
                for (let j = 0; j < newQuestData.characters_id.length; j++) {
                    if (characters[i].id === newQuestData.characters_id[j]) {
                        charactersArr.push(characters[i].name); 
                    };
                }
            };
            
            return charactersArr;
        });
        
    }, [newQuestData]);

    // useEffect(() => { console.log(newQuestData.characters_id);  }, [charactersQuest])


    //HANDLERS
    const inputHandler = (e) => {        
        setNewQuestData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };

    //handler y funcion para el componente barra buscadora
    const shearchBarHandler = (e) => { setSearchInput(e.target.value); };

    const filter = ( input, data ) => {
        let result = data.filter((element) => {                        
            if (element.name.toString().toLowerCase().includes(input.toLowerCase()) ) {
                return element;
            }
        });
        
        setSearchResult(result)
    };

    //handler para el dropdown del formulario
    const dropdownHandler = (e) => {       
        setNewQuestData((prevState) => ({
            ...prevState,
            [e.target.name]: parseInt(e.target.value)
        }));

        checkError(e);
    };
    
    //handler para el checkbox
    const checkBoxHandler = (e) => {
        let charactersArr = [];
        charactersArr = newQuestData.characters_id
        
        for (let i = 0; i < charactersArr.length; i++) {           
            if (charactersArr[i] == e.target.value) {
                charactersArr.splice(i, 1);

                setNewQuestData((prevState) => ({
                    ...prevState,
                    characters_id: charactersArr
                }));
                return;
            };           
        };        
        charactersArr.push(parseInt(e.target.value));
        
        setNewQuestData((prevState) => ({
            ...prevState,
            characters_id: charactersArr
        }));
        return 
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

    //apicall para registrar la nueva misión
    const createNewQuest = () => {
        createQuest(newQuestData)
        .then((result) => {
            navigate("/games/game-details");
        })
        .catch((error) => console.log(error))
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

    const checkSubmitStatus = () => {
        for (const key in validInputField) {
            if (validInputField[key] === false) { return false };
        };
        return true;
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
                                <option value={null} label={"Contado por..."}/>
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
                                <option value={null} label={"Escuchado en..."}/>
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
                                <option value={null} label={"Ocurre en..."}/>
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
            {/* BARRA BUSCADORA*/}
            <Row>
                <Col className='col-12 fs-5 fw-bold text-center mt-2'>Personajes en misión</Col>
                <Col className='col-12 text-center'>
                    {charactersQuest.join(", ")}
                </Col>                
            </Row>
            <SearchBar className="col-9 rounded ps-3" onChangeFunction={(e) => shearchBarHandler(e)}/>
            <Row>
                {searchInput !== "" ? 
                    (
                        searchResult.map((data) => {
                            return <CheckBox key={data.id} checkedData={newQuestData.characters_id} value={data.id} label={data.name} className="col-4 form-check form-switch ms-4" onChangeFunction={(e) => checkBoxHandler(e)}/>
                        })
                    ) : (
                        characters.length > 0 ? 
                            (
                                characters.map((data) => {
                                    return <CheckBox key={data.id} checkedData={newQuestData?.characters_id} value={data.id} label={data.name} className="col-4 form-check form-switch ms-4" onChangeFunction={(e) => checkBoxHandler(e)}/>
                                })
                            ) : (
                                <></>
                            )
                    )}
            </Row>
            <Row className='text-center my-1'>
                <Col className='col-12 mt-1 '> 
                    <textarea 
                        className='col-11 text-center rounded'
                        name="goal"
                        required={false}
                        placeholder={"¿De que se trata la misión?"}
                        onChange={(e) => inputHandler(e)}
                        style={{height: 8 + "em"}}/>
                </Col>
            </Row>
            <Row>
                <Col className='col-12 d-flex justify-content-evenly py-3'>
                    <WoodenButton activateButton={true} action="back" clickFunction={() => navigate("/games/game-details")}/>
                    <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => createNewQuest()}/>
                </Col>
            </Row>
        </Container>
    )
}
