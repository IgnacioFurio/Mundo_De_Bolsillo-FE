import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
//helper
import { validate } from '../../helpers/validations.helper';
import { Col, Container, Row } from 'react-bootstrap';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';

export const NewQuest = () => {

    const navigate = useNavigate();

    //HOOKS
    const [ newQuestData, setNewQuestData ] = useState({
        name: "",
        goal: "",
        delievered_by_character_id: "",
        got_in_location_id: "",
        happens_in_location_id: "",
        status: true
    });

    const [ validInputField, setValidInputfield ] = useState({
        nameValid: false,    //only set false when a field is required
        goalValid: true,
        delievered_by_character_idValid: true,
        got_in_location_idValid: true,
        happens_in_location_idValid: true,
        statusValid: true
    });
    
    const [ errorInputField, setErrorInputfield ] = useState({
        nameError: "",
        goalError: "",
        delievered_by_character_idError: "",
        got_in_location_idError: "",
        happens_in_location_idError: "",
        status: ""
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    const [worldInformation, setWorldInformation ] = useState();
    const [worldsToEngage, setWorldsToEngage ] = useState();
    
    //HANDLERS
    const inputHandler = (e) => {        
        setNewQuestData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        checkError(e);
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
        <Container className='centerScrollLocations border border-black rounded pt-1'>
            <Row className='QuestCardShadow text-center'>
                <Col className='bannerRibbonQuest fw-bold py-2'>
                    <input 
                        className='col-9 QuestCardShadow fs-4 fw-bold text-center rounded'
                        name="title"
                        required={true}
                        placeholder={"Título"}
                        onChange={(e) => inputHandler(e)}/>
                </Col>
            </Row>
            <Row className='text-start'>                    
                <Container className='centerScrollLocations col-11 mt-1'>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>
                            <input 
                                className='col-12 rounded'
                                name="title"
                                required={false}
                                placeholder={"Contado por..."}
                                onChange={(e) => inputHandler(e)}/>
                        </Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'>
                            <input 
                                    className='col-12 rounded'
                                    name="title"
                                    required={false}
                                    placeholder={"Escuchado en..."}
                                    onChange={(e) => inputHandler(e)}/>
                        </Col>
                    </Row>
                    <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                        <Col className='locationIcon col-2 fw-bold text-center'></Col>
                        <Col className='col-10'> 
                            <input 
                                className='col-12 rounded'
                                name="title"
                                required={false}
                                placeholder={"Ocurre en..."}
                                onChange={(e) => inputHandler(e)}/>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row className='text-center my-1'>
                <Col className='col-12 mb-1'> 
                    <input 
                        className='col-11 text-center rounded'
                        name="title"
                        required={true}
                        placeholder={"Contado por..."}
                        onChange={(e) => inputHandler(e)}/>
                </Col>
            </Row>
            <Row>
                <Col className='col-12 d-flex justify-content-evenly py-3'>
                    <WoodenButton activateButton={true} action="back" clickFunction={() => navigate("/games/my-games")}/>
                    <WoodenButton activateButton={submitStatus} action="submit" clickFunction={() => createNewGame()}/>
                </Col>
            </Row>
        </Container>
    )
}
