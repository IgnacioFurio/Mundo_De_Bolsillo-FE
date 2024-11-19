import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { SearchBar } from '../../common/SearchBar/SearchBar';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gameData } from '../../services/game.slice';
import { validate } from '../../helpers/validations.helper';
import { getScenesByGameId } from '../../services/scene.apicalls';
import { DraggableSceneCard } from '../../common/DraggableSceneCard/DraggableSceneCard';

export const NewSession = () => {
    const navigate = useNavigate();
    const gameRdx = useSelector(gameData);
    
    const [ newSessionData, setNewSessionData ] = useState(
        {
            title: "",
            description: "",
            game_id: gameRdx?.gameInformation?.id
        }
    );

    const [ validInputField, setValidInputField ] = useState(
        {   //valor en falso para los requeridos
            titleValid: false,
            descriptionValid: true,
            game_idValid: true,
        }
    );

    const [ errorInputField, setErrorInputfield ] = useState(
        {
            titleError: "",
            descriptionError: "",
            game_idError: "",
        }
    );

    const [ scenes, setScenes ] = useState([]);
    const [ scenesAtSession, setScenesAtSession ] = useState([]);

    const [ submitStatus, setSubmitStatus ] = useState(false);

    //USEEFFECT
    useEffect(() => { getAllScenesByGameId(gameRdx?.gameInformation?.id) }, []);

    useEffect(() => {    }, [scenesAtSession]);

    //HANDLERS
    const inputHandler = (e) => {      
        console.log(e.target.value);
        
        setNewSessionData((prevState) => ({
            ...prevState,
            [e.target.name]: e?.target?.value
        }));

        checkError(e);
    };

    //APICALLS
    const getAllScenesByGameId = (gameId) => {
        getScenesByGameId(gameId)
        .then((result) => {
            setScenes(result?.data?.data);
        })
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


    //FUNCTIONS
    const setScenesForSession = (e, dataId, source) => {        
        if (source === "scenes") {
            const newSceneSession = scenes.filter(scene => scene.id === dataId);            
            const avaliableScenes = scenes.filter(scene => scene.id !== dataId);

            setScenesAtSession(prevScenesAtSession => [
                ...prevScenesAtSession,
                ...newSceneSession
            ]);
            setScenes(avaliableScenes);
        } else if (source === "scenesAtSession") {
            const sceneSession = scenesAtSession.filter(scene => scene.id !== dataId); 
            
            const avaliableScenes = scenesAtSession.filter(scene => scene.id === dataId);

            setScenesAtSession(sceneSession);
            setScenes(prevScenes => [
                ...prevScenes,
                ...avaliableScenes
            ]);
        };
    };

    const startDrag = (e, index) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("sceneIndex", index);
    };

    const draggingOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e, index) => {
        e.preventDefault();
        
        // Recuperar los índices como números
        const draggedIndex = parseInt(e.dataTransfer.getData("sceneIndex"), 10);
        
        // Crear una copia del array para modificar
        const updatedList = [...scenesAtSession];
        
        // Sacar el elemento arrastrado
        const [ draggedItem ] = updatedList.splice(draggedIndex, 1);

        if (draggedIndex < index) {
            updatedList.splice(index, 0, draggedItem);            
        } else if (draggedIndex > index) {
            updatedList.splice(index, 0, draggedItem);
        };
        
        // Actualizar la lista
        setScenesAtSession(updatedList);
    };

    return (
        <Container className='col-12 col-sm-11 col-md-8 pb-2'>
            <Row className='upperScroll d-flex justify-content-center align-items-center' >
                <input 
                    className='col-9 QuestCardShadow fw-bold fs-5 text-center eb-garamond-font rounded ms-4'
                    name="title"
                    required={true}
                    placeholder={"¿Cómo llamarás a la sesión?"}
                    onChange={(e) => inputHandler(e)}
                    />
            </Row>
            <Container className='centerScrollLocations col-10'>
                <Row 
                    className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'
                    droppable="true">                            
                    <Col className='col-12 my-1 text-center fw-bold'>Escenas</Col>
                    <Col 
                        className='col-12 py-2 rounded' 
                        droppabe="true" 
                        style={{
                            border: '1px solid #ddd',
                            cursor: 'move',
                            alignContent: "center"
                        }}>
                            {!scenesAtSession ? (
                                    <></>
                                ) : (
                                    scenesAtSession.map((data, index) => {
                                        return <button 
                                            key={data.id}
                                            draggable="true"
                                            className='col-12 d-flex justify-content-evenly align-items-center rounded my-1'
                                            data-index={index}
                                            onClick={(e) => setScenesForSession(e, data.id, "scenesAtSession")}
                                            onDragStart={(e) => startDrag(e, index)}
                                            onDragOver={(e) => draggingOver(e)}
                                            onDrop={(e) => onDrop(e, index)}>
                                            {index}{" "}{data.title}
                                        </button>
                                    })
                                )
                            }
                    </Col>
                </Row>
                <Row>
                    <Col className='col-12'>
                        <SearchBar className="col-12 rounded" onChangeFunction={(e) => shearchBarHandler(e)}/>
                        {!scenes ? (
                                <></>
                            ) : (
                                scenes.map((data) => {
                                    return <DraggableSceneCard 
                                        key={data.id}
                                        sceneData={data} 
                                        onClickFunction={(e) => setScenesForSession(e, data.id, "scenes")}
                                        scenes={scenes}/>
                                })
                        )}
                    </Col>
                </Row>
                <Row className='text-center py-1'>
                    <Col className='col-12 mt-1 '> 
                        <textarea 
                            className='col-11 text-center rounded'
                            name="description"
                            required={false}
                            placeholder={"Resumen de lo ocurrido en la sesión"}
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