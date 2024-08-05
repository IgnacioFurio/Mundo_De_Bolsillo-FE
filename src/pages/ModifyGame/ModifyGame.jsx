import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { gameData, gameInfo } from '../../services/game.slice';
//apicall
import { modifyGame } from '../../services/game.apicalls';
import { getAllWorlds } from '../../services/world.apicalls';
import { createWorldGate, deleteWorldGate, getWorldGatesByGameId } from '../../services/worldgate.apicall';
//common
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
import { TutorialSelector } from '../../common/TutorialSelector/TutorialSelector';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//helper
import { GameFormQuestions } from '../../helpers/Games.Forms.helper';
import { checkValid, validate } from '../../helpers/validations.helper';
//css
import "./ModifyGame.css";
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { SwitchSelector } from '../../common/SwitchSelector/SwitchSelector';

export const ModifyGame = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(gameData);

    const [ formCounter, setFormCounter ] = useState(0);
    
    const formQuestions = {
        title: GameFormQuestions.text.modify.title,
        description: GameFormQuestions.text.modify.description,
        worldgate: GameFormQuestions.text.modify.worldgate
    };
    
    const formPlaceholders = {
        title: GameFormQuestions.placeholder.modify.title,
        description: GameFormQuestions.placeholder.modify.description
    };

    const [ gameInformation, setGameInformation ] = useState({
        id: dataRdx.gameInformation.id,
        title: dataRdx.gameInformation.title,
        description: dataRdx.gameInformation.description
    });

    const [ worldInformation, setWorldInformation ] = useState([]);

    const [ worldsToEngage, setWorldsToEngage ] = useState([]);

    //only set false when a field is required
    const [ validInputField, setValidInputfield] = useState({
        titleValid: true,
        descriptionValid: true,
    });
    
    const [ errorInputField, setErrorInputfield] = useState({
        titleError: "",
        descriptionError: "",
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    //VALIDATIONS
    useEffect(() => { getWorlds(); },[]);
    useEffect(() => { 
        checkValid(validInputField);  
        console.log(submitStatus); },[gameInformation]);
    
    //HANDLERS
    const inputHandler = (e) => {        
        setGameInformation((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };
    
    const selectHandler = (e) => {    
        let worlds_id = e.target.id

        for(const key in worldsToEngage) {
            if (key == worlds_id && worldsToEngage[worlds_id] === true) {
                return setWorldsToEngage((prevState) => ({
                    ...prevState, 
                    [e.target.id]: false
                }));
            } else if(key == worlds_id && worldsToEngage[worlds_id] === false) {
                return setWorldsToEngage((prevState) => ({
                    ...prevState, 
                    [e.target.id]: true
                }));
            }
        };
    };

    //APICALL
    const updateGameInformation = () => {
        let keys = Object.keys(worldsToEngage)

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            if (worldsToEngage[key] === true) {
                createWorldGate({game_id: dataRdx.gameInformation.id, world_id: Math.floor(keys[i])})
                .then(() => {})
                .catch(error => {
                    let backendErrorData = {
                        message: error.response.data.message,
                        valid: error.response.succes
                    }
                });
            } else if (worldsToEngage[key] === false) {
                deleteWorldGate({game_id: dataRdx.gameInformation.id, world_id: Math.floor(keys[i])})
                .then(() => {
                    console.log("hello");
                })
                .catch(error => {
                    console.log(error);
                    let backendErrorData = {
                        message: error.response.data.message,
                        valid: error.response.succes
                    }
                });              
            }
        };        

        modifyGame(gameInformation)
        .then(() => { 
            dispatch(gameInfo({gameInformation: gameInformation}))
            navigate('/games/game-details');
        })
        .catch(error => {
            let backendErrorData = {
                message: error.response.data.message,
                valid: error.response.succes
            }
        });
    };

    const getWorlds = () => {

        getAllWorlds()
        .then((result) => {
            let worlds = result.data.data;
            setWorldInformation(worlds);

            for (let i = 0; i < worlds.length; i++) {
                setWorldsToEngage((prevState) => ({
                    ...prevState, 
                    [worlds[i].id]: false
                }));                
            };

            getWorldGatesByGameId(gameInformation.id) //set worldsToEngage 
            .then(result => {
                let worlds = result.data.data;
                for (let i = 0; i < worlds.length; i++) {
                    setWorldsToEngage((prevState) => ({
                        ...prevState, 
                        [worlds[i].World.id]: true
                    }));
                };
            })
            .catch(error => console.log(error));
        })
        .catch(error => {
            let backendErrorData = {
                message: error.response.data.message,
                valid: error.response.succes
            };
        });
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
        <Container className='col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7'>          
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='detailsStone mt-4 py-2'>
                    <div className='gamePortraitTitle d-flex justify-content-center p-3'>
                        <input 
                            className='col-9 gameDetailsTitleInput fs-4 fw-bold text-center rounded'
                            name="title"
                            required={true}
                            placeholder={gameInformation.title}
                            onChange={(e) => inputHandler(e)}/>
                    </div>
                </Col>                    
            </Row>
            <Row className='detailsBackground mx-1'>
                <Col className='col-1'/>
                    <textarea 
                        className='col-10 text-center rounded mt-2'
                        name="description"
                        required={false}
                        type='textarea'
                        placeholder={gameInformation.description}
                        onChange={(e) => inputHandler(e)}
                        style={{height: 5 + "em"}}/>
                <Col className='col-1'/>                
                <Col className='col-12 text-center fw-bold mt-3'>Mundos enlazados</Col>     
                
                { !worldInformation ? (
                        <></>
                    ) : (
                        <>
                        {worldInformation.map((data) => 
                            {return <SwitchSelector
                                key={data.id}
                                value={data.id}
                                dataGates={worldsToEngage} 
                                label={data.name} 
                                name={data.name} 
                                clickFunction={(e) => selectHandler(e)} />    
                            })}
                        </>
                        )} 
                <Col className='col-12 d-flex justify-content-evenly py-3'>
                    <WoodenButton activateButton={true} action="back" clickFunction={() => navigate("/games/game-details")}/>
                    <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => updateGameInformation()}/>
                </Col>
            </Row>
        </Container>
    )
};
