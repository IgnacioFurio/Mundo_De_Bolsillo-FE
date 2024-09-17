import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { characterData, characterInfo } from '../../services/character.slice';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { useNavigate } from 'react-router-dom';
import { deleteCharacter } from '../../services/character.apicalls';
import { KnowledgeCard } from '../../common/KnowledgeCard/KnowledgeCard';
import { getKnowledgeByCharacterId } from '../../services/knowledge.apicalls';
import { Knowledge } from '../../common/Knowledge/Knowledge';
import { Quest } from '../../common/Quest/Quest';
import { getQuestByCharacterId } from '../../services/quest.apicall';

export const CharacterDetails = () => {
    //HOOKS
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const characterRdx = useSelector(characterData);

    const [ aboutCharacter, setAboutCharacter ] = useState();
    
    const [ aboutQuest, setAboutQuest ] = useState();

    const [ questList, setQuestList ] = useState();

    const [ showMoreData, setShowMoreData ] = useState({
        "": false,
        Secretos: false,
        Misiones: false,
    });

    //USEEFFECT
    useEffect(() => { gatherDataFromCharacter(); }, [showMoreData]);
    
    //APICALL
    const gatherDataFromCharacter = () => {
        getKnowledgeByCharacterId(characterRdx?.characterInformation?.id)
        .then((result) => { setAboutCharacter(result.data.data); })
        .catch((error) => { console.log(error); })

        getQuestByCharacterId(characterRdx?.characterInformation?.id)
        .then((result) => { setAboutQuest(result.data.data);})
        .catch((error) => { console.log(error); })
    };

    const deleteCharacterData = () => {
        deleteCharacter(characterRdx.characterInformation.id)
        .then(result => {
            dispatch(characterInfo({characterInformation: {}}));
            navigateBack();
        })
        .catch((error) => {console.log(error);})
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

    return (
        <Container className='col-12 col-sm-11 col-md-8 pb-2'>
            <Row className='d-flex justify-content-evenly py-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigateBack()}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("/characters/modify-character")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => deleteCharacterData()}/></Col>
            </Row> 
            <Row className='upperScroll d-flex justify-content-center align-items-center' >
                <Col className='characterPicture fw-bold eb-garamond-font'>{characterRdx?.characterInformation?.name?.toUpperCase()} </Col>
            </Row>
            <Container className='centerScrollLocations col-10'>
                <Row className='borderDataCard align-items-center py-1 px-2'>                            
                    <Col className='text-center'>{characterRdx?.characterInformation?.description}</Col>
                </Row> 
                <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>                            
                    <Col className='fromLocationIcon col-1 fw-bold'></Col>
                    <Col className='col-10'> {characterRdx?.characterInformation?.fromLocation?.name}</Col>
                </Row>
                <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                    <Col className='lastLocationKnownIcon col-1 fw-bold'></Col>
                    <Col className='col-10'> {characterRdx?.characterInformation?.lastLocationKnown?.name}</Col>
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
                <Col className='col-12 text-center fw-bold'>{characterRdx?.characterInformation?.name}</Col>
            </Row>
        </Container>
    );
};
