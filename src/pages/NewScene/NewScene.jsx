import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { characterData, characterInfo } from '../../services/character.slice';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { useNavigate } from 'react-router-dom';
import { deleteCharacter, getCharactersByWorldId } from '../../services/character.apicalls';
import { getKnowledgeByCharacterId } from '../../services/knowledge.apicalls';
import { Knowledge } from '../../common/Knowledge/Knowledge';
import { Quest } from '../../common/Quest/Quest';
import { CheckBox } from '../../common/CheckBox/CheckBox';
import { getQuestByCharacterId } from '../../services/quest.apicall';
import { gameData } from '../../services/game.slice';
import { validate } from '../../helpers/validations.helper';
import { getWorldGatesByGameId } from '../../services/worldgate.apicall';
import { getLocationsByWorldId } from '../../services/location.apicalls';

export const NewScene = () => {
    //HOOKS
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const gameRdx = useSelector(gameData);

    const [ newSceneData, setNewSceneData ] = useState(
        {
            title: "",
            characters_id: [],
            location_id: "",
            description: "",
        }
    );

    const [ worlds, setWorlds ] = useState([]);
    const [ worldsId, setWorldsId ] = useState([]);
    
    const [ locations, setLocations ] = useState([]);
    const [ characters, setCharacters ] = useState([]);

    const [ showMoreData, setShowMoreData ] = useState({
        "": false,
        Secretos: false,
        Misiones: false,
    });

    //USEEFFECT
    useEffect(() => { getAllDataByWorldId();  }, []);

    useEffect(() => {
        getAllLocationsVyWorldId();
        getAllCharactersByWorldId();
    }, [worldsId]);

    useEffect(() => {console.log(newSceneData);  }, [newSceneData])

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
    
    //APICALL
    //apicall que trae todas las localizaciones segun el game_id
    const getAllDataByWorldId = () => {
        getWorldGatesByGameId(gameRdx?.gameInformation?.id) //traemos la información de los mundos enlazados
        .then((result) => { 
            let worldArr = result?.data?.data
            let worldsIdArr = [];
            
            for (let i = 0; i < worldArr?.length; i++) {
                worldsIdArr?.push(worldArr[i]?.World.id);           
            };

            setWorlds(worldArr);                            //seteamos los mundos
            setWorldsId(worldsIdArr);                       //Seteamos los id de los mundos
        })
        .catch((error) => console.log(error))
    };

    const getAllLocationsVyWorldId = () => {
        getLocationsByWorldId(worldsId) //traemos las localizaciones usando el array de los id de los mundos
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
    //FUNCTION
    const navigateBack = () => {
        dispatch(characterInfo({characterInformation: {}}));
        navigate("/games/game-details")
    }; 

    const InfoHandler = (e) => {
        setShowMoreData({
            "": false,
            Secretos: false,
            Misiones: false,
        });

        if (showMoreData[e.target.value] == false) {
            setShowMoreData({
                ...showMoreData,
                [e.target.value]: true
            });
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

        // setValidInputfield((prevState) => ({
        //     ...prevState,
        //     [e.target.name + 'Valid']: check.valid
        // }));
        
        // setErrorInputfield((prevState) => ({
        //     ...prevState,
        //     [e.target.name + 'Error']: error
        // }));
    };

    return (
        <Container className='col-12 col-sm-11 col-md-8 pb-2'>
            <Row className='upperScroll d-flex justify-content-center align-items-center' >
                <input 
                    className='col-9 QuestCardShadow fw-bold text-center eb-garamond-font rounded ms-4'
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
                    <Col className='col-10'>
                    </Col>
                    {!characters ? ( 
                            <></>
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
                <Row className='borderDataCard py-2'>
                    <select className='MoreInfoSelector text-center fw-bold' onClick={(e) => InfoHandler(e)}> 
                        <option value="">Información sobre:</option>
                        <option value="Secretos">Rumores/Secretos</option>
                        <option value="Misiones">Misiones</option>
                    </select>
                </Row>
                
                {showMoreData.Secretos == true ? <Knowledge value={"Secretos"} aboutCharacterData={aboutCharacter} /> : <></>}
                {showMoreData.Misiones == true ? <Quest value={"Misiones"} aboutQuestData={aboutQuest}/> : <></>}
                
            </Container> 
            <Row className='downScroll d-flex justify-content-center align-items-center'>
                <Col className='col-12 text-center fw-bold'>{}</Col>
            </Row>
        </Container>
    );
};

