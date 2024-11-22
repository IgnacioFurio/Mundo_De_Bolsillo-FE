import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sessionData } from '../../services/session.slice';
import { SearchBar } from '../../common/SearchBar/SearchBar';
import { DraggableSceneCard } from '../../common/DraggableSceneCard/DraggableSceneCard';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { getScenesByGameId } from '../../services/scene.apicalls';
import { checkValid, validate } from '../../helpers/validations.helper';

export const ModifySession = () => {
    const navigate = useNavigate();
    const sessionRdx = useSelector(sessionData);
    
    const [ session, setSession ] = useState(
        {
            title: sessionRdx?.sessionInformation?.title,
            description: sessionRdx?.sessionInformation?.description,
            game_id: sessionRdx?.sessionInformation?.id,
            scenesAtSession: sessionRdx?.sessionInformation?.scenesAtSession,
        }
    );

    const [ validInputField, setValidInputField ] = useState(
        {   //valor en falso para los requeridos
            titleValid: true,
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

    const [ searchInput, setSearchInput ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);

    const [ submitStatus, setSubmitStatus ] = useState(false);

    useEffect(() => {         
        getAllScenesByGameId(session?.game_id);
        sortOff(session?.scenesAtSession);
    }, [sessionRdx]);

    useEffect(() => { setSubmitStatus(checkValid(validInputField)); }, [validInputField]);

    // useEffect(() => { console.log(scenes);  }, [session]);

    //HANDLERS
    const inputHandler = (e) => {              
        setSession((prevState) => ({
            ...prevState,
            [e.target.name]: e?.target?.value
        }));

        checkError(e);
    };

    //APICALLS
    const getAllScenesByGameId = (gameId) => {
        getScenesByGameId(gameId)
        .then((result) => {
            let scenes = result?.data?.data
                        
            setScenes(scenes);
        })
        .catch((error) => {console.log(error)})
    };

    //FUNCTIONS
    const setScenesForSession = (e, dataId, source) => {                  
        if (source === "scenes") {
            const sceneSession = scenes.filter(scene => scene.id === dataId);            
            const avaliableScenes = scenes.filter(scene => scene.id !== dataId);
            
            setSession((prevState) => (
                {
                    ...prevState,
                    scenesAtSession: [
                        ...(prevState.scenesAtSession || []),
                        ...sceneSession
                    ]
                }
            ));

            setScenes(avaliableScenes);

        } else if (source === "scenesAtSession") {
            const sceneSession = session?.scenesAtSession.filter(scene => scene.id !== dataId);             
            const avaliableScenes = session?.scenesAtSession.filter(scene => scene.id === dataId);
            
            setSession((prevState) => (
                {
                    ...prevState,
                    scenesAtSession: sceneSession
                }
            ));

            setScenes((prevState) =>
                [
                    ...prevState,
                    ...avaliableScenes,
                ]
            );
        };
    };

    const sortOff = (arr) => {        
        const sortArr = [...arr].sort((a,b) => a.session_index - b.session_index);
        
        setSession((prevState) => (
            {
                ...prevState,
                scenesAtSession: sortArr
            }
        ));
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

    return (
        <Container className='col-12 col-sm-11 col-md-8 pb-2'>
            <Row className='upperScroll d-flex justify-content-center align-items-center' >
                <input 
                    className='col-9 QuestCardShadow fw-bold fs-5 text-center eb-garamond-font rounded ms-4'
                    name="title"
                    required={true}
                    value={session.title}
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
                            {!session?.scenesAtSession ? (
                                    <></>
                                ) : (
                                    session?.scenesAtSession.map((data, index) => {
                                        return <button 
                                            key={data.id}
                                            draggable="true"
                                            className='col-12 d-flex justify-content-evenly align-items-center rounded my-1'
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
                        <SearchBar
                            className="col-12 rounded" 
                            onChangeFunction={(e) => shearchBarHandler(e)}
                            placeholder={"¿Qué escena buscas?"}/>
                        {!searchInput ? (
                                scenes.map((data) => {
                                    return <DraggableSceneCard 
                                        key={data.id}
                                        sceneData={data} 
                                        onClickFunction={(e) => setScenesForSession(e, data.id, "scenes")}
                                        scenes={scenes}/>
                                })
                            ) : (
                                searchResult.map((data) => {
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
                            value={session.description}
                            placeholder={"Resumen de ha de ocurrir en la sesión"}
                            onChange={(e) => inputHandler(e)}
                            style={{height: 8 + "em"}}/>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-12 d-flex justify-content-evenly py-3'>
                        <WoodenButton activateButton={true} action="back" clickFunction={() => navigate("/games/game-details")}/>
                        <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => createNewSession()}/>
                    </Col>
                </Row>
            </Container> 
            <Row className='downScroll d-flex justify-content-center align-items-center'>
                <Col className='col-12 text-center fw-bold'>{}</Col>
            </Row>
        </Container>
    );
}
