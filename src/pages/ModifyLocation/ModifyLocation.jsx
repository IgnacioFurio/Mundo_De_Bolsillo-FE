import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { locationData } from '../../services/location.slice';
import { LocationFormQuestions } from '../../helpers/Location.Forms.helper';
import { getAllWorlds } from '../../services/world.apicalls';
import { Col, Container, Row } from 'react-bootstrap';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { validate } from '../../helpers/validations.helper';

export const ModifyLocation = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(locationData);

    const [ formCounter, setFormCounter ] = useState(0);
    
    const formQuestions = {
        name: LocationFormQuestions.text.modify.name,
        world_id: LocationFormQuestions.text.modify.world_id,
        description: LocationFormQuestions.text.modify.description,
        type: LocationFormQuestions.text.modify.type,
        government: LocationFormQuestions.text.modify.government,
        population: LocationFormQuestions.text.modify.population,
        defenses: LocationFormQuestions.text.modify.defenses,
        commerce: LocationFormQuestions.text.modify.commerce,
    };
    
    const formPlaceholders = {
        name: LocationFormQuestions.placeholder.new.name,
        world_id: LocationFormQuestions.placeholder.new.world_id,
        description: LocationFormQuestions.placeholder.new.description,
        type: LocationFormQuestions.placeholder.new.type,
        government: LocationFormQuestions.placeholder.new.government,
        population: LocationFormQuestions.placeholder.new.population,
        defenses: LocationFormQuestions.placeholder.new.defenses,
        commerce: LocationFormQuestions.placeholder.new.commerce,
    };

    const [ locationInformation, setLocationInformation ] = useState({
        id: dataRdx.locationInformation.id,
        name: dataRdx.locationInformation.name,
        world_id: dataRdx.locationInformation.world_id,
        description: dataRdx.locationInformation.description,
        type: dataRdx.locationInformation.type,
        government: dataRdx.locationInformation.government,
        defenses: dataRdx.locationInformation.defenses,
        commerce: dataRdx.locationInformation.commerce,
    });

    const [ worldInformation, setWorldInformation ] = useState({});

    //only set false when a field is required
    const [ validInputField, setValidInputfield] = useState({
        nameValid: false,
        world_idValid: false,
        descriptionValid: true,
        typeValid: true,
        governmentValid: true,
        defensesValid: true,
        commerceValid: true,
    });
    
    const [ errorInputField, setErrorInputfield] = useState({
        nameError: "",
        world_idError: "",
        descriptionError: "",
        typeError: "",
        governmentError: "",
        defensesError: "",
        commerceError: "",
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    useEffect(() => {
        getWorlds();
    }, []);
    
    useEffect(() => {
        console.log(worldInformation);
    }, [worldInformation]);

    //HANDLER
    const inputHandler = (e) => { 
        setLocationInformation((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };

    //FUNCTIONS
    const getWorlds = () => {

        getAllWorlds()
        .then((result) => {
            let worlds = result.data.data
            
            setWorldInformation(worlds)
        })
        .catch(error => console.log(error));
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
            {formCounter === 0 && <TutorialQuestions 
                gameData={locationInformation.name}
                type="textarea" 
                text={formQuestions.name}
                errorText={errorInputField.nameError}
                placeholder={formPlaceholders.name} 
                name="name" 
                changeFunction={(e) => inputHandler(e)}/>
                }

            <Row className='modifyGameNextPrev d-flex justify-content-center align-items-center'>
            {formCounter < 3 ? 
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                    {submitStatus === true ? <NextPrevButton action="Next" clickFunction={() => gameFormHandlerNext()}/> : <NextPrevButton action="Wait" clickFunction={() => {}}/>}
                    </Col>  
                </>
                :
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => gameFormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NextPrevButton action="Submit" status={submitStatus} clickFunction={() => updateGameInformation()}/>
                    </Col>
                </>
                }
            </Row>
        </Container>
    )
};
