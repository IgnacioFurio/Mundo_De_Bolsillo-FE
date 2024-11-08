import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { gameData } from '../../services/game.slice';
import { getWorldGatesByGameId } from '../../services/worldgate.apicall';
import { getLocationsByWorldId } from '../../services/location.apicalls';
import { getCharactersByWorldId } from '../../services/character.apicalls';
import { checkValid, validate } from '../../helpers/validations.helper';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { useNavigate } from 'react-router-dom';
import { getCharactersByQuestrId, modifyQuest } from '../../services/quest.apicall';
import { SearchBar } from '../../common/SearchBar/SearchBar';
import { CheckBox } from '../../common/CheckBox/CheckBox';
import { questInfo } from '../../services/quest.slice';

export const ModifyScene = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sceneRdx = useSelector((state) => state.scene);
    const gameRdx = useSelector(gameData);

    const [ sceneData, setSceneData ] = useState(
        {
            title: "",
            characters_id: [],
            location_id: null,
            description: "",
            game_id: gameRdx?.gameInformation?.id
        }
    );
    
    const [ validInputField, setValidInputField ] = useState(
        {
            titleValid: false, //only set false when required
            characters_idValid: true,
            location_idValid: true,
            descriptionValid: true,
        }
    );
    
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
    const [ worldsId, setWorldsId ] = useState([]);
    
    const [ locations, setLocations ] = useState([]);
    const [ characters, setCharacters ] = useState([]);
    const [ charactersAtScene, setCharactersAtscene ] = useState([]);

    const [ showMoreData, setShowMoreData ] = useState({
        "": false,
        Secretos: false,
        Misiones: false,
    });

    const [ searchInput, setSearchInput ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);

    const [ submitStatus, setSubmitStatus ] = useState(true);

    //APICALLS
    useEffect(() => { getWorldsData(); },[]);
    
    useEffect(() => {       
        if (Array.isArray(worlds)) {
            getCharactersData();
            getLocationsData();
        };
        console.log(worlds);
        
    },[ worlds ]);
    
    useEffect(() => { charactersInQuest();  },[characters]);
    useEffect(() => { filter(searchInput, characters);  },[searchInput]);

    useEffect(() => { setSubmitStatus(checkValid(validInputField)); }, [validInputField]);

    //HANDLERS
    const inputHandler = (e) => {        
        setQuestData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
};

    //handler para el dropdown del formulario
    const dropdownHandler = (e) => {       
        setQuestData((prevState) => ({
            ...prevState,
            [e.target.name]: parseInt(e.target.value)
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

    //handler para el checkbox
    const checkBoxHandler = (e) => {        
        let charactersArr = [];
        charactersArr = questData?.characters_id
        
        for (let i = 0; i < charactersArr.length; i++) {           
            if (charactersArr[i] == e.target.value) {
                charactersArr.splice(i, 1);

                return setQuestData((prevState) => ({
                    ...prevState,
                    characters_id: charactersArr
                }));
            };           
        };        
        charactersArr.push(parseInt(e.target.value));
        
        return setQuestData((prevState) => ({
            ...prevState,
            characters_id: charactersArr
        }));
    };

    const charactersInQuestHandler = (data, characters) => {
        let charactersQuestArr = [];

        for (let i = 0; i < data.length; i++) {            
            for (let j = 0; j < characters.length; j++) {
                if (data[i] === characters[j]?.id) {
                    charactersQuestArr.push(characters[j]);
                };
            };
        };        

        return setCharactersDoingQuest(charactersQuestArr);
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

    //apicall que trae todos los personajes según la quest_id
    const charactersInQuest = () => {
        getCharactersByQuestrId(sceneRdx?.sceneInformation.id)
        .then((result) => {     
            let charactersArr = result.data.data;

            let characters_id = [];
            let characterData = [];
                        
            for (let i = 0; i < charactersArr.length; i++) {
                characters_id.push(charactersArr[i].character_id);
                characterData.push(charactersArr[i].character)
            };

            setCharactersDoingQuest(characterData);

            setQuestData((prevState) => ({
                ...prevState,
                characters_id: characters_id
            }));
        })
        .catch((error) => {console.log(error); })
    };

    //apicall que envia los datos modificados
    const modifyQuestInfo = () => {       
        modifyQuest(questData)
        .then(() => {
            dispatch(questInfo({sceneInformation: {}}));      

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
    
    return (
        <Container className='centerScrollLocations border border-black rounded pt-1'>
            <Row className='QuestCardShadow text-center'>
                <Col className='bannerRibbonQuest fw-bold py-2'>
                    <input 
                        className='col-9 QuestCardShadow fw-bold text-center rounded'
                        name="name"
                        value={sceneRdx?.sceneInformation?.title.toUpperCase()}
                        required={true}
                        placeholder={sceneRdx?.sceneInformation?.title}
                        onChange={(e) => inputHandler(e)}/>
                </Col>
            </Row>
            <Row className='text-start'>                    
                <Container className='centerScrollLocations col-11 mt-1'>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='locationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>
                            <select 
                                className='col-12 rounded'
                                name={"location_id"} 
                                onChange={(e) => dropdownHandler(e)}
                                >
                                <option value={null} label={"Sucede en ..."}/>
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
                                    })
                                )}
                            </select>
                        </Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='populationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10 my-1 d-flex flex-wrap'>
                        {!charactersAtScene ? (
                            <></>
                        ) : (
                            charactersAtScene.map((data) => {
                                return <button key={data.id} className='rounded mx-1 my-1'>{data.name}</button  >
                            })
                        )}
                        </Col>
                        <Col className='col-12'>
                            <SearchBar className="col-12 rounded" onChangeFunction={(e) => shearchBarHandler(e)}/>
                        </Col>
                        {searchInput !== "" ? ( 
                                searchResult.map((data) => {
                                    return  <CheckBox
                                        key={data.id}
                                        checkedData={sceneData?.characters_id}
                                        value={data.id} 
                                        label={data.name} 
                                        className={"col-6 form-check form-switch"}
                                        onChangeFunction={(e) => checkBoxHandler(e)}
                                        />
                                })
                            ) : (
                                characters.map((data) => { 
                                    return  <CheckBox
                                        key={data.id}
                                        checkedData={sceneData?.characters_id}
                                        value={data.id} 
                                        label={data.name} 
                                        className={"col-6 form-check form-switch"}
                                        onChangeFunction={(e) => checkBoxHandler(e)}
                                        />
                        }))}
                    </Row>
                </Container>
            </Row>
            <Row className='text-center py-1'>
                <Col className='col-12 mt-1 '> 
                    <textarea 
                        className='col-11 text-center rounded'
                        name="description"
                        required={false}
                        placeholder={"¿Que ocurré en esta escena?"}
                        onChange={(e) => inputHandler(e)}
                        style={{height: 8 + "em"}}/>
                </Col>
            </Row>
            <Row>
                <Col className='col-12 d-flex justify-content-evenly py-3'>
                    <WoodenButton activateButton={true} action="back" clickFunction={() => navigate("/scenes/scene-details")}/>
                    <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => modifyQuestInfo(questData)}/>
                </Col>
            </Row>
        </Container>
    )
}
