import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//componentes
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//helpers
import { LocationFormQuestions } from '../../helpers/Location.Forms.helper';
import { showNext, validate } from '../../helpers/validations.helper';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';


export const NewLocation = () => {
    const navigate = useNavigate();

    //HOOKS
    const formQuestions = {
        name: LocationFormQuestions.text.new.name,
        world_id: LocationFormQuestions.text.new.world_id,
        description: LocationFormQuestions.text.new.description,
        type: LocationFormQuestions.text.new.type,
        government: LocationFormQuestions.text.new.government,
        population: LocationFormQuestions.text.new.population,
        defenses: LocationFormQuestions.text.new.defenses,
        commerce: LocationFormQuestions.text.new.commerce,
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

    const [ formCounter, setFormCounter ] = useState(0);

    const [ newLocationData, setNewLocationData ] = useState({
        name: "",
        world_id: "",
        description: "",
        type: "",
        government: "",
        population: "",
        defenses: "",
        commerce: "",
    });

    const [ validInputField, setValidInputfield ] = useState({
        nameValid: false,    //seteamos false cuando sea un campo obligatorio
        world_idValid: true, //cambiar a false cuando tenga hecha las validaciones
        descriptionValid: true,
        typeValid: true,
        governmentValid: true,
        populationValid: true,
        defensesesValid: true,
        commerceValid: true,
    });
    
    const [ errorInputField, setErrorInputfield ] = useState({
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

    //HANDLERS
    const inputHandler = (e) => {        
        setNewLocationData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
    };

    const formHandlerPrev = () => {
        formCounter > 0 ? setFormCounter(formCounter - 1) : navigate("/locations/my-locations");
        setSubmitStatus(false);
    };
    const formHandlerNext = () => {
        formCounter < 8 ? setFormCounter(formCounter + 1) : setFormCounter(0);
        setSubmitStatus(false);
    };

    //VALIDATIONS
    useEffect(() =>{setSubmitStatus(showNext(validInputField, formCounter));},[newLocationData]);

    useEffect(() => {setSubmitStatus(showNext(validInputField, formCounter));});

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
                gameData={newLocationData.name}
                type="textarea" 
                text={formQuestions.name}
                errorText={errorInputField.nameError}
                placeholder={formPlaceholders.name} 
                name="name" 
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }
            
            {formCounter === 1 && <TutorialQuestions 
                gameData={newLocationData.world_id}
                type="textarea" 
                text={formQuestions.world_id}
                errorText={errorInputField.world_idError}
                placeholder={formPlaceholders.world_id} 
                name="world_id" 
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }
            
            {formCounter === 2 && <TutorialQuestions 
                gameData={newLocationData.description}
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
                gameData={newLocationData.type}
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
                gameData={newLocationData.government}
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
                gameData={newLocationData.population}
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
                gameData={newLocationData.defenses}
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
                gameData={newLocationData.commerce}
                type="textarea" 
                text={formQuestions.commerce}
                errorText={errorInputField.commerceError}
                placeholder={formPlaceholders.commerce} 
                name="commerce" 
                required={false}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e)=>checkError(e)}/>
            }

            {formCounter === 8 && <ConfirmNewRegister data={newLocationData}/>}
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
                        <NextPrevButton gameInfo={newLocationData} action="Submit" clickFunction={() => console.log(newLocationData)}/>
                    </Col>
                </>
                }
            </Row>
        </Container>
    )
};
