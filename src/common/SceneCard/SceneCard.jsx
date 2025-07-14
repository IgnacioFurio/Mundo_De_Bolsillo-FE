import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch } from 'react-redux';
import { characterInfo } from '../../services/character.slice';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//common
import { NextPrevButton } from '../NextPrevButton/NextPrevButton';
import { WoodenButton } from '../WoodenButton/WoodenButton';
import { sceneInfo } from '../../services/scene.slice';
import { ButtonInfoCard } from '../ButtonInfoCard/ButtonInfoCard';
import { getKnowledgeByCharacterId, getKnowledgeByLocationId, getKnowledgeKnownByCharacterId,  } from '../../services/knowledge.apicalls';
import { getQuestByCharacterId } from '../../services/quest.apicall';

export const SceneCard = ({ sceneData }) => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [ scene, setScene ] = useState({
        id: sceneData?.id,
        game_id: sceneData?.game_id,
        title: sceneData?.title,
        description: sceneData?.description,
        location: sceneData?.location,
        characters: sceneData?.CharacterScenes,
    });

    const [ charactersAtScene, setCharactersAtScene ] = useState([]);
    const [ charactersKnowledge, setChararactersKnowledge] = useState([]);
    const [ locationKnowledge, setLocationKnowledge] = useState([]);
    const [ aboutCharacters, setAboutCharacters ] = useState([]);
    const [ filteredKNowledge, setFilteredKnowledge ] = useState([])

    const [ charactersQuest, setChararactersQuest] = useState([]);

    const [ showMore, setShowMore ] = useState(false);

    //USEEFFECT
    useEffect(() => { 
        getCharactersAtScene(); 
        filterKnownKnowledge();                
    },[scene]);

    useEffect(() => { 
        if (charactersAtScene.length > 0) {
            getAllKnowledgeAtScene();
            getAllQuestByCharactersId();
        };        
    }, [charactersAtScene]);

    //HANDLER
    const showMoreHandler = () => {
        showMore === true ? setShowMore(false) : setShowMore(true);
    };

    const sceneDetailsHandler = (e) => {
        dispatch(sceneInfo({sceneInformation: scene}));
        navigate("/games/game-details/scenes/scene-details");
    };

    const getCharactersAtScene = () => {
        let charactersArr = [];

        scene.characters.map((data) => {
            charactersArr.push(data.characterId);
        });

        setCharactersAtScene(charactersArr);
    };

    //APICALLS
    const getAllKnowledgeAtScene = () => {        
        const characters_id = charactersAtScene.map(data => data.id);

        getKnowledgeKnownByCharacterId(characters_id)
        .then((result) => {                      
            setChararactersKnowledge(result?.data?.data.flat());
        })
        .catch((error) => console.log(error))

        getKnowledgeByLocationId(scene?.location?.id)
        .then((result) => { 
            setLocationKnowledge(result?.data?.data.flat());
        })
        .catch((error) => console.log(error))
        
        getKnowledgeByCharacterId(characters_id)
        .then((result) => { 
            setAboutCharacters(result?.data?.data.flat());
        })
        .catch((error) => console.log(error))
    };

    const getAllQuestByCharactersId = () => {
        const characters_id = charactersAtScene.map(data => data.id);

        getQuestByCharacterId(characters_id)
        .then((result) => {
            setChararactersQuest(result?.data?.data);
        })
        .catch((error) => console.log(error))
    };

    //FUNCIOTNS
    const filterKnownKnowledge = () => {
        let knownKnowledgeIds = new Set(charactersKnowledge.map(data => data.Knowledge.id)); 

        let result = aboutCharacters.filter((data) => !knownKnowledgeIds.has(data.id));
        
        setFilteredKnowledge(result);
    };

    return (
        <Container className='shadowCard'>
            <Row className='upperScroll' onClick={() => sceneDetailsHandler()}>
                <Col className='d-flex justify-content-center align-items-center ms-3 text-center text-uppercase fw-bold'>
                    {scene?.title}
                </Col>
            </Row>
            {showMore === true ? (
                <Container className='centerScrollLocations col-10'>
                <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                    <Col className='locationIcon col-2 fw-bold text-center' title='Localización'></Col>
                    <Col className='col-10 my-1 d-flex flex-wrap'>
                        <ButtonInfoCard infoCard={scene?.location} source={"location"}/>
                    </Col>
                </Row>
                <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                    <Col className='populationIcon col-2 fw-bold text-center' title='Personajes'></Col>
                    <Col className='col-10 my-1 d-flex flex-wrap'>
                    {charactersAtScene.map((data) => {
                            return <ButtonInfoCard key={data.id} infoCard={data} source={"characters"}/>
                        })}
                    </Col>
                </Row>
                <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                    <Col className='knowledgeIcon col-2 fw-bold text-center' title='Información'></Col>
                    <Col className='col-10 my-1 d-flex flex-wrap'>
                        {charactersKnowledge.map((data) => {    
                            console.log(data);
                                             
                                return <ButtonInfoCard key={data.Knowledge.id} infoCard={data} moreData={charactersAtScene} source={"knowledge"}/>
                            })}
                        {/* {filteredKNowledge.map((data) => { 
                                return <ButtonInfoCard key={data.id} infoCard={data}  source={"knowledge"}/>
                            })}
                        {locationKnowledge.map((data) => { 
                                return <ButtonInfoCard key={data.id} infoCard={data} source={"knowledge"}/>
                            })} */}
                    </Col>
                </Row>
                <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                    <Col className='questIcon col-2 fw-bold text-center' title='Misiones'></Col>
                    <Col className='col-10 my-1 d-flex flex-wrap'>
                    {charactersQuest.map((data) => {
                            return <ButtonInfoCard key={data.id} infoCard={data} source={"quest"}/>
                        })}
                    </Col>
                </Row>
                <Row className='text-center py-1'>
                    <Col className='col-12 mt-1 '> 
                    {scene?.description}
                    </Col>
                </Row>
            </Container>
            ) : (
                <></>
            )}
            
            <Row className='downScroll' onClick={(e) => showMoreHandler(e)}>
                <Col className='col-12 fw-bold text-center text-white'>{scene?.name}</Col>
                <Col>
                    {showMore === false ? <NextPrevButton action="Down"/> : <NextPrevButton action="Up"/>}
                </Col>
            </Row>
        </Container>
    );
};
