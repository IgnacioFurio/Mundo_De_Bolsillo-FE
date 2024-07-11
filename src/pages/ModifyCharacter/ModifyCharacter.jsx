import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { characterData, characterInfo } from '../../services/character.slice';
//apicall
import { getAllWorlds } from '../../services/world.apicalls';
import { getAllLocations } from '../../services/location.apicalls';
import { modifyCharacter } from '../../services/character.apicalls';
//helper
import { showNext, validate } from '../../helpers/validations.helper';
//common
import { Col, Container, Row } from 'react-bootstrap';
import { CharacterFormQuestions } from '../../helpers/Character.Forms.helper';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { TutorialSelector } from '../../common/TutorialSelector/TutorialSelector';
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';


export const ModifyCharacter = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const characterRdx = useSelector(characterData);

    //HOOKS
    const formQuestions = {
        name: CharacterFormQuestions.text.new.name,
        description: CharacterFormQuestions.text.new.description,
        world_id: CharacterFormQuestions.text.new.world_id,
        from_location_id: CharacterFormQuestions.text.new.from_location_id,
        last_location_known_id: CharacterFormQuestions.text.new.last_location_known_id,
    };

    const formPlaceholders = {
        name: CharacterFormQuestions.placeholder.new.name,
        description: CharacterFormQuestions.placeholder.new.description,
        world_id: CharacterFormQuestions.placeholder.new.world_id,
        from_location_id: CharacterFormQuestions.placeholder.new.from_location_id,
        last_location_known_id: CharacterFormQuestions.placeholder.new.last_location_known_id,
    };

    const [ formCounter, setFormCounter ] = useState(0);

    const [ modifyCharacterData, setModifyCharacterData] = useState({
        id: characterRdx.characterInformation.id,
        name: characterRdx.characterInformation.name,
        description: characterRdx.characterInformation.description,
        world_id: characterRdx.characterInformation.world_id,
        from_location_id: characterRdx.characterInformation.from_location_id,
        last_location_known_id: characterRdx.characterInformation.last_location_known_id,
    });

    const [ worlds, setWorlds ] = useState();
    const [ locations, setLocations ] = useState();
    
    const [ validInputField, setValidInputfield] = useState({
        nameValid: true,  //seteamos false cuando sea un campo obligatorio
        descriptionValid: true,
        world_idValid: true,
        from_location_idValid: true,
        last_location_known_idValid: true,
    });

    const [ errorInputField, setErrorInputfield ] = useState({
        nameError: "",
        descriptionError: "",
        world_idError: "",
        from_location_idError: "",
        last_location_known_idError: ""
    });
    
    const [ submitStatus, setSubmitStatus ] = useState(false);

    //USEEFFECT
    useEffect(() => { 
        getWorlds();
        getLocations();
    }, []); 

    //HANDLERS
    const inputHandler = (e) => {        
        setModifyCharacterData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };

    const formHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/games/game-details");
        setSubmitStatus(false);
    };
    const formHandlerNext = () => {
        formCounter < 5 ? setFormCounter(formCounter + 1) : setFormCounter(0);
        setSubmitStatus(false);
    };

    const selectHandler = (e) => {
        let attribute;

        formCounter == 1 ? 
        attribute = "world_id" : 
        formCounter == 2 ? 
        attribute = "from_location_id" : 
        attribute = "last_location_known_id";        

        setModifyCharacterData((prevState) => ({
            ...prevState,
            [attribute]: parseInt(e.target.id) 
        }));

        if (!isNaN(modifyCharacterData.world_id)) {
            setValidInputfield((prevState) => ({
                ...prevState,
                [attribute + "Valid"]: true
            }));
        };
    };

    //VALIDATIONS
    useEffect(() =>{ setSubmitStatus(showNext(validInputField, formCounter));},[modifyCharacterData]);

    //APICALLS
    const updateCharacterInformation = () => {    
        modifyCharacter(modifyCharacterData)
        .then(() => {
            dispatch(characterInfo({characterInformation: {}}));
            navigate("/games/game-details");
        })
        .catch((error) => {console.log(error);})
    };

    const getWorlds = () => {
        getAllWorlds()
        .then((result) => {
            setWorlds(result.data.data);
        })
        .catch(error => {
            let backendErrorData = {
                message: error.response.data.message,
                valid: error.response.succes
            }
        })
    };

    const getLocations = () => {
        getAllLocations()
        .then((result) => {
            setLocations(result.data.data);
        })
        .catch(error => {
            let backendErrorData = {
                message: error.response.data.message,
                valid: error.response.succes
            }
        })
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
        <Container>
            <Row className='tutorialHeight'>
            {formCounter === 0 && <TutorialQuestions
                gameData={modifyCharacterData.name}
                type="textarea" 
                text={formQuestions.name}
                errorText={errorInputField.nameError}
                placeholder={formPlaceholders.name} 
                name="name" 
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }
            
            {formCounter === 1 && <TutorialSelector 
                newData={modifyCharacterData}
                attribute={"world_id"}
                toSelectData={worlds} 
                type="DropDown" 
                text={formQuestions.world_id}
                errorText={errorInputField.world_idError}
                placeholder={formPlaceholders.world_id} 
                required={true}
                clickFunction={(e) => selectHandler(e)}/>
            }
            
            {formCounter === 2 && <TutorialSelector
                newData={modifyCharacterData}
                attribute={"from_location_id"}
                toSelectData={locations} 
                type="DropDown" 
                text={formQuestions.from_location_id}
                errorText={errorInputField.from_location_idError}
                placeholder={formPlaceholders.from_location_id} 
                required={false}
                clickFunction={(e) => selectHandler(e)}/>
            }
            
            {formCounter === 3 && <TutorialSelector 
                newData={modifyCharacterData}
                attribute={"last_location_known_id"}
                toSelectData={locations}
                type="DropDown" 
                text={formQuestions.last_location_known_id}
                errorText={errorInputField.last_location_known_idError}
                placeholder={formPlaceholders.last_location_known_id} 
                required={false}
                clickFunction={(e) => selectHandler(e)}/>
            }

            {formCounter === 4 && <TutorialQuestions 
                gameData={modifyCharacterData.description}
                type="textarea" 
                text={formQuestions.description}
                errorText={errorInputField.descriptionError}
                placeholder={formPlaceholders.description} 
                name="description" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }
            
            {formCounter === 5 && <ConfirmNewRegister data={modifyCharacterData}/>}
            </Row>

            <Row className='nextPrev d-flex justify-content-center align-items-center'>
            {formCounter < 5 ?  //Sección para los botones de avanzar/retroceder o enviar información en los formularios
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => formHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                    {submitStatus === true ? <NextPrevButton action="Next" clickFunction={() => formHandlerNext()}/> : <NextPrevButton action="Wait" clickFunction={() => {}}/>}
                    </Col>  
                </>
                :
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => formHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NextPrevButton gameInfo={modifyCharacterData} action="Submit" clickFunction={() => updateCharacterInformation()}/>
                    </Col>
                </>
                }
            </Row>
        </Container>
    )
};