import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { locationData, locationInfo } from '../../services/location.slice';
//apicall
import { getAllWorlds } from '../../services/world.apicalls';
//common
import { Col, Container, Row } from 'react-bootstrap';
import { LocationFormQuestions } from '../../helpers/Location.Forms.helper';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { TutorialSelector } from '../../common/TutorialSelector/TutorialSelector';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
//helpers
import { checkValid, validate } from '../../helpers/validations.helper';
import { modifyLocation } from '../../services/location.apicalls';


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

    const [ worldsToEngage, setWorldsToEngage ] = useState();

    //only set false when a field is required
    const [ validInputField, setValidInputfield] = useState({
        nameValid: true,
        world_idValid: true,
        descriptionValid: true,
        typeValid: true,
        governmentValid: true,
        populationValid: true,
        defensesValid: true,
        commerceValid: true,
    });
    
    const [ errorInputField, setErrorInputfield] = useState({
        nameError: "",
        world_idError: "",
        descriptionError: "",
        typeError: "",
        governmentError: "",
        populationError: "",
        defensesError: "",
        commerceError: "",
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    useEffect(() => { getWorlds(); }, []);
    
    useEffect(() => { }, [worldInformation]);
    
    useEffect(() => {
        console.log(locationInformation);
    }, [locationInformation]);

    //VALIDATION
    useEffect(() => { setSubmitStatus(checkValid(validInputField)); }, [locationInformation]);
    useEffect(() => { setSubmitStatus(checkValid(validInputField)); });

    //HANDLER
    const FormHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/games/game-details");
    };
    const FormHandlerNext = () => {
        formCounter < 8 ? setFormCounter(formCounter + 1) : setFormCounter(0);
    };

    const inputHandler = (e) => { 
        setLocationInformation((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };

    const selectHandler = (e) => {
        setLocationInformation((prevState) => ({
            ...prevState,
            world_id: parseInt(e.target.id) 
        }));

        if (!isNaN(locationInformation.world_id)) {
            setValidInputfield((prevState) => ({
                ...prevState,
                world_idValid: true
            }));
        };
    };

    //APICALL
    const getWorlds = () => {

        getAllWorlds()
        .then((result) => {
            let worlds = result.data.data
            
            setWorldInformation(worlds)
        })
        .catch(error => console.log(error));
    };

    const updateLocationInformation = () => {    
        modifyLocation(locationInformation)
        .then(() => {
            dispatch(locationInfo({locationInformation: {}}));
            navigate("/games/game-details");
        })
        .catch((error) => {console.log(error);})
        
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
            <Row>
            {formCounter === 0 && <TutorialQuestions 
                gameData={locationInformation.name}
                type="textarea" 
                text={formQuestions.name}
                errorText={errorInputField.nameError}
                placeholder={formPlaceholders.name} 
                name="name" 
                changeFunction={(e) => inputHandler(e)}/>
                }
            
            {formCounter === 1 && <TutorialSelector 
                newLocationData={locationInformation}
                worldsData={worldInformation}
                type="DropDown" 
                text={formQuestions.world_id}
                errorText={errorInputField.world_idError}
                placeholder={formPlaceholders.world_id} 
                required={true}
                clickFunction={(e) => selectHandler(e)}/>
            }

            {formCounter === 2 && <TutorialQuestions 
                gameData={locationInformation.description}
                type="textarea" 
                text={formQuestions.description}
                errorText={errorInputField.descriptionError}
                placeholder={formPlaceholders.description} 
                name="description" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }

            {formCounter === 3 && <TutorialQuestions 
                gameData={locationInformation.type}
                type="textarea" 
                text={formQuestions.type}
                errorText={errorInputField.typeError}
                placeholder={formPlaceholders.type} 
                name="type" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }
            
            {formCounter === 4 && <TutorialQuestions 
                gameData={locationInformation.government}
                type="textarea" 
                text={formQuestions.government}
                errorText={errorInputField.governmentError}
                placeholder={formPlaceholders.government} 
                name="government" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }
            
            {formCounter === 5 && <TutorialQuestions 
                gameData={locationInformation.population}
                type="textarea" 
                text={formQuestions.population}
                errorText={errorInputField.populationError}
                placeholder={formPlaceholders.population} 
                name="population" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }
            
            {formCounter === 6 && <TutorialQuestions 
                gameData={locationInformation.defenses}
                type="textarea" 
                text={formQuestions.defenses}
                errorText={errorInputField.defensesError}
                placeholder={formPlaceholders.defenses} 
                name="defenses" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }
            
            {formCounter === 7 && <TutorialQuestions 
                gameData={locationInformation.commerce}
                type="textarea" 
                text={formQuestions.commerce}
                errorText={errorInputField.commerceError}
                placeholder={formPlaceholders.commerce} 
                name="commerce" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }        

            {formCounter === 8 && <ConfirmNewRegister data={locationInformation}/>}
            </Row>  

            <Row className='modifyGameNextPrev d-flex justify-content-center align-items-center'>
            {formCounter < 8 ? 
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => FormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                    {submitStatus === true ? <NextPrevButton action="Next" clickFunction={() => FormHandlerNext()}/> : <NextPrevButton action="Wait" clickFunction={() => {}}/>}
                    </Col>  
                </>
                :
                <>
                    <Col className='d-flex justify-content-start'>
                        <NextPrevButton action="Prev" clickFunction={() => FormHandlerPrev()}/>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NextPrevButton action="Submit" status={submitStatus} clickFunction={() => updateLocationInformation()}/>
                    </Col>
                </>
                }
            </Row>
        </Container>
    )
};
