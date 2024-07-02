import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { showNext, validate } from '../../helpers/validations.helper';
import { TutorialSelector } from '../../common/TutorialSelector/TutorialSelector';
import { getAllWorlds } from '../../services/world.apicalls';

export const NewCharacter = () => {
    const navigate = useNavigate();

    //HOOKS
    const formQuestions = {};
    const formPlaceholders = {};
    const [ formCounter, setFormCounter ] = useState(0);

    const [ newCharacterData, setNewCharacterData] = useState({
        name: "",
        description: "",
        world_id: "",
        from_location_id: "",
        last_location_known_id: "",
    });

    const [ worlds, setWorlds ] = useState();
    
    const [ validInputField, setValidInputfield] = useState({
        nameValid: false,  //seteamos false cuando sea un campo obligatorio
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
    useEffect(() => { getWorlds() }, []); //apicall for my worlds

    useEffect(() => { console.log(newCharacterData); }, [newCharacterData]); 

    //HANDLERS
    const inputHandler = (e) => {        
        setNewCharacterData((prevState) => ({
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
        formCounter < 8 ? setFormCounter(formCounter + 1) : setFormCounter(0);
        setSubmitStatus(false);
    };

    const selectHandler = (e) => {
        setNewCharacterData((prevState) => ({
            ...prevState,
            world_id: parseInt(e.target.id) 
        }));

        if (!isNaN(newCharacterData.world_id)) {
            setValidInputfield((prevState) => ({
                ...prevState,
                world_idValid: true
            }));
        };
    };

    //VALIDATIONS
    useEffect(() =>{ setSubmitStatus(showNext(validInputField, formCounter));},[newCharacterData]);

    //APICALLS
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
                gameData={newCharacterData.name}
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
                newData={newCharacterData}
                worldsData={worlds}
                type="DropDown" 
                text={formQuestions.world_id}
                errorText={errorInputField.world_idError}
                placeholder={formPlaceholders.world_id} 
                required={true}
                clickFunction={(e) => selectHandler(e)}/>
            }
            
            {formCounter === 8 && <ConfirmNewRegister data={newCharacterData}/>}
            </Row>

            <Row className='nextPrev d-flex justify-content-center align-items-center'>
            {formCounter < 8 ?  //Sección para los botones de avanzar/retroceder o enviar información en los formularios
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
                        <NextPrevButton gameInfo={newLocationData} action="Submit" clickFunction={() => createNewLocation()}/>
                    </Col>
                </>
                }
            </Row>
        </Container>
    );
};
