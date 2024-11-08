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
import { modifyScene } from '../../services/scene.apicalls';

export const ModifyScene = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sceneRdx = useSelector((state) => state.scene);
    const gameRdx = useSelector(gameData);

    const [ sceneData, setSceneData ] = useState(
        {
            title: sceneRdx?.sceneInformation?.title,
            characters: sceneRdx?.sceneInformation?.characters,
            characters_id: sceneRdx?.sceneInformation.characters.map((data) => {
                return data.character_id;
            }),
            location_id: sceneRdx?.sceneInformation?.location_id,
            location: sceneRdx?.sceneInformation?.location,
            description: sceneRdx?.sceneInformation?.description,
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

    const [ errorInputField, setErrorInputfield ] = useState(
        {
            titleError: "",
            characters_idError: "",
            location_idError: "",
            descriptionError: "",
        }
    );

    const [ worlds, setWorlds ] = useState([]);
    const [ worldsId, setWorldsId ] = useState([]);
    
    const [ locations, setLocations ] = useState([]);
    const [ characters, setCharacters ] = useState([]);
    const [ charactersAtScene, setCharactersAtscene ] = useState([]);

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
    },[ worlds ]);
    
    //Aqui duplico codigo porque debido al orden de creación de los componentes hay que mostra los 
    //personajes nada mas llega la información a desde la apicall
    useEffect(() => { showCharactersAtScene(sceneData); },[characters]);
    useEffect(() => { 
        showCharactersAtScene(sceneData); 
        console.log(sceneData);
    }, [sceneData]);
    
    useEffect(() => { filter(searchInput, characters);  },[searchInput]);
    useEffect(() => { setSubmitStatus(checkValid(validInputField)); }, [validInputField]);

    //HANDLERS
    const inputHandler = (e) => {        
        setSceneData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
};

    //handler para el dropdown del formulario
    const dropdownHandler = (e) => {       
        setSceneData((prevState) => ({
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
        charactersArr = sceneData?.characters_id
        
        for (let i = 0; i < charactersArr.length; i++) {           
            if (charactersArr[i] == e.target.value) {
                charactersArr.splice(i, 1);

                return setSceneData((prevState) => ({
                    ...prevState,
                    characters_id: charactersArr
                }));
            };           
        };        
        charactersArr.push(parseInt(e.target.value));
        
        return setSceneData((prevState) => ({
            ...prevState,
            characters_id: charactersArr
        }));
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

    //apicall que modifica la informacion de la escena en la base de datos
    const modifySceneInfo = () => {
        modifyScene(sceneData)
        .then((response) => (
            console.log(response.data.data)            
        ))
        .catch((error) => {console.log(error)})
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
        
        setErrorInputfield((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    };

    //FUNCITONS
    const showCharactersAtScene = () => {      
        const charactersScene = characters.filter((data) => {            
            return sceneData.characters_id.includes(data.id)
        });
        setCharactersAtscene(charactersScene);
    };
    
    return (
        <Container className='centerScrollLocations border border-black rounded pt-1'>
            <Row className='QuestCardShadow text-center'>
                <Col className='bannerRibbonQuest fw-bold py-2'>
                    <input 
                        className='col-9 QuestCardShadow fw-bold text-center text-uppercase rounded'
                        name="title"
                        value={sceneData?.title}
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
                                <option 
                                    value={sceneRdx?.sceneInformation?.id} 
                                    label={`Sucede en ${sceneRdx?.sceneInformation?.location?.name}`}
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
                        value={sceneData?.description}
                        required={false}
                        placeholder={"¿Que ocurré en esta escena?"}
                        onChange={(e) => inputHandler(e)}
                        style={{height: 8 + "em"}}/>
                </Col>
            </Row>
            <Row>
                <Col className='col-12 d-flex justify-content-evenly py-3'>
                    <WoodenButton activateButton={true} action="back" clickFunction={() => navigate("/games/game-details/scenes/scene-details")}/>
                    <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => modifySceneInfo(questData)}/>
                </Col>
            </Row>
        </Container>
    )
}
