import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TutorialQuestions } from '../../common/TutorialQuestions/TutorialQuestions';
import { ConfirmNewRegister } from '../../common/confirmNewRegister/confirmNewRegister';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';

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
        word_idError: "",
        from_location_idError: "",
        last_location_known_idError: ""
    });
    
    const [ submitStatus, setSubmitStatus ] = useState(false);


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
