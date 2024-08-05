import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//common
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { TutorialSelector } from '../../common/TutorialSelector/TutorialSelector';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
//helper
import { checkValid, validate } from '../../helpers/validations.helper';
import { GameFormQuestions } from '../../helpers/Games.Forms.helper';
//bootstrap
import { Col, Container, Row  } from 'react-bootstrap'
//apicall
import { createGame } from '../../services/game.apicalls';
import { getAllWorlds } from '../../services/world.apicalls';
import { createWorldGate, deleteWorldGate } from '../../services/worldgate.apicall';
//css
import './NewGame.css';
import { SwitchSelector } from '../../common/SwitchSelector/SwitchSelector';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';

export const NewGame = () => {

    const navigate = useNavigate();

    //HOOKS
    const formQuestions = {
        title: GameFormQuestions.text.new.title,
        description: GameFormQuestions.text.new.description,
        worldgate: GameFormQuestions.text.new.worldgate
    };
    
    const formPlaceholders = {
        title: GameFormQuestions.placeholder.new.title,
        description: GameFormQuestions.placeholder.new.description
    };

    const [ formCounter, setFormCounter ] = useState(0);

    const [ newGameData, setNewGameData ] = useState({
        title: "",
        description: ""
    });

    const [ validInputField, setValidInputfield ] = useState({
        titleValid: false,    //only set false when a field is required
        descriptionValid: true,
        worldgate: true
    });
    
    const [ errorInputField, setErrorInputfield ] = useState({
        titleError: "",
        descriptionError: ""
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    const [worldInformation, setWorldInformation ] = useState();
    const [worldsToEngage, setWorldsToEngage ] = useState();
    
    //VALIDATIONS
    useEffect(() => { getWorlds() }, []);
    
    useEffect(() =>{ setSubmitStatus(checkValid(validInputField)); },[newGameData]);
    
    useEffect(() =>{ 
        console.log(newGameData);
        console.log(worldsToEngage);
        setSubmitStatus(checkValid(validInputField)) });

    //HANDLERS
    const inputHandler = (e) => {        
        setNewGameData((prevState) => ({
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
    const createNewGame = () => { 

        createGame(newGameData)
        .then((result) => { 
            let gameId = result.data.data.id;
            let worldsId = Object.keys(worldsToEngage);
            
            for (let i = 0; i < worldsId.length; i++) {
                let worldId = worldsId[i];

                if (worldsToEngage[worldId] === true) {
                    createWorldGate({game_id: gameId, world_id: worldId })
                    .then(() => {
                        setTimeout(() => {
                            navigate("/games/my-games")
                        }, 1000)
                    })
                    .catch(error => { console.log(error.response.data.error); });
                };
            }; 
            
            setTimeout(() => {
                navigate('/games/my-games');
            }, 1000);
        })
        .catch(error => { console.log(error.response.data.error); });
    }; 

    const getWorlds = () => {

        getAllWorlds()
        .then((result) => {
            let worlds = result.data.data
            setWorldInformation(worlds)

            for (let i = 0; i < worlds.length; i++) { /*Keep the worldGate state in a hook */
                setWorldsToEngage((prevState) => ({
                    ...prevState, 
                    [worlds[i].id]: false
                }));                
            };
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
                            placeholder={"Título"}
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
                        placeholder={"Descripción"}
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
                    <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => createNewGame()}/>
                </Col>
            </Row>
        </Container>
        );
}