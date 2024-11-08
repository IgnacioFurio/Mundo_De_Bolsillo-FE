import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { characterInfo } from '../../services/character.slice';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { useNavigate } from 'react-router-dom';
import { getCharactersByWorldId } from '../../services/character.apicalls';
import { CheckBox } from '../../common/CheckBox/CheckBox';
import { gameData } from '../../services/game.slice';
import { checkValid, validate } from '../../helpers/validations.helper';
import { getWorldGatesByGameId } from '../../services/worldgate.apicall';
import { getLocationsByWorldId } from '../../services/location.apicalls';
import { SearchBar } from '../../common/SearchBar/SearchBar';
import { createScene } from '../../services/scene.apicalls';

export const NewScene = () => {
    //HOOKS
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const gameRdx = useSelector(gameData);

    const [ newSceneData, setNewSceneData ] = useState(
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

    //USEEFFECT
    useEffect(() => { getAllDataByWorldId();  }, []);

    useEffect(() => {
        if (Array.isArray(worldsId)) {
            getAllLocationsByWorldId();
            getAllCharactersByWorldId();
        };
    }, [worldsId]);

    useEffect(() => { showCharactersInScene(); },[newSceneData]);

    useEffect(() => { filter(searchInput, characters); },[ searchInput ]);

    useEffect(() => { setSubmitStatus(checkValid(validInputField)); }, [validInputField]);

    useEffect(() => {console.log(submitStatus);  }, [submitStatus]);
    //HANDLERS
    const inputHandler = (e) => {        
        setNewSceneData((prevState) => ({
            ...prevState,
            [e.target.name]: e?.target?.value
        }));

        checkError(e);
    };
    
    //handler para el dropdown del formulario
    const dropdownHandler = (e) => {       
        setNewSceneData((prevState) => ({
            ...prevState,
            [e.target.name]: parseInt(e.target.value)
        }));

        checkError(e);
    };

    //handler para el checkbox
    const checkBoxHandler = (e) => {
        let charactersArr = [];
        charactersArr =  newSceneData?.characters_id
        
        for (let i = 0; i < charactersArr.length; i++) {           
            if (charactersArr[i] == e.target.value) {
                charactersArr.splice(i, 1);

                setNewSceneData((prevState) => ({
                    ...prevState,
                    characters_id: charactersArr
                }));
                return;
            };           
        };        
        charactersArr.push(parseInt(e.target.value));
        
        setNewSceneData((prevState) => ({
            ...prevState,
            characters_id: charactersArr
        }));
        return 
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
    
    //APICALL
    //apicall que trae los mundos segun el game_id
    const getAllDataByWorldId = () => {
        getWorldGatesByGameId(gameRdx?.gameInformation?.id) //traemos la información de los mundos enlazados
        .then((result) => { 
            let worldArr = result?.data?.data
            let worldsIdArr = [];
            
            for (let i = 0; i < worldArr?.length; i++) {
                worldsIdArr?.push(worldArr[i]?.World.id);           
            };

            setWorlds(worldArr);             //seteamos los mundos
            setWorldsId(worldsIdArr);        //Seteamos los id de los mundos
        })
        .catch((error) => console.log(error))
    };

    //traemos las localizaciones usando el array de los id de los mundos
    const getAllLocationsByWorldId = () => {
        getLocationsByWorldId(worldsId) 
        .then((result) => {
            let arr = result?.data?.data;
            
            let locations = [];            
            
            for (let i = 0; i < arr?.length; i++) {
                for (let j = 0; j < arr[i]?.length; j++) {
                    locations?.push(arr[i][j]);                        
                };
            };
            
            setLocations(locations);//seteamos las localizaciones
        })
        .catch((error) => {console.log(error)});
    };

    const getAllCharactersByWorldId = () => {
        getCharactersByWorldId(worldsId)
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
        .catch((error) => {console.log(error)})
    };

    const createNewScene = () => {
        createScene(newSceneData)
        .then((result) => {
            navigate("/games/game-details");
        })
        .catch((error) => console.log(error))
    };
    //FUNCITONS
    const showCharactersInScene = () => {        
        const charactersScene = characters.filter((data) => {            
            return newSceneData?.characters_id.includes(data.id)
        });
        setCharactersAtscene(charactersScene);
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
        
        // setErrorInputfield((prevState) => ({
        //     ...prevState,
        //     [e.target.name + 'Error']: error
        // }));
    };

    return (
        <Container className='col-12 col-sm-11 col-md-8 pb-2'>
            <Row className='upperScroll d-flex justify-content-center align-items-center' >
                <input 
                    className='col-9 QuestCardShadow fw-bold fs-5 text-center eb-garamond-font rounded ms-4'
                    name="title"
                    required={true}
                    placeholder={""}
                    onChange={(e) => inputHandler(e)}
                    />
            </Row>
            <Container className='centerScrollLocations col-10'>
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
                                    checkedData={newSceneData?.characters_id}
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
                                    checkedData={newSceneData?.characters_id}
                                    value={data.id} 
                                    label={data.name} 
                                    className={"col-6 form-check form-switch"}
                                    onChangeFunction={(e) => checkBoxHandler(e)}
                                    />
                    }))}
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
                        <WoodenButton activateButton={true} action="back" clickFunction={() => navigate("/games/game-details")}/>
                        <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => createNewScene()}/>
                    </Col>
                </Row>
            </Container> 
            <Row className='downScroll d-flex justify-content-center align-items-center'>
                <Col className='col-12 text-center fw-bold'>{}</Col>
            </Row>
        </Container>
    );
};

