import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { validate } from '../../helpers/validations.helper';
import { NextPrevButton } from '../../common/NextPrevButton/NextPrevButton';
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { useSelector } from 'react-redux';
import { gameData } from '../../services/game.slice';

export const NewKnowledge = () => {
    const gameRdx = useSelector(gameData);

    const [ worlds, setWorlds ] = useState([]);

    //HOOKS
    const [ placeholder, setPlaceholder ] = useState({
        title: "",
        description: "",
        about_character_id: "",
        heard_from_character_id: "",
        about_location_id: "",
        heard_on_location_id: "",
        veracity: "",
    });

    const [ newKnowledgeData, setNewKnowledgeData ] = useState({
        title: "",
        description: "",
        about_character_id: "",
        heard_from_character_id: "",
        about_location_id: "",
        heard_on_location_id: "",
        veracity: "",
    });
    
    const [ validInputField, setValidInputField ] = useState({
        titleValid: false,
        descriptionValid: true,
        about_character_idValid: true,
        heard_from_character_idValid: true,
        about_location_idValid: true,
        heard_on_location_idValid: true,
        veracityValid: true,
    });
    
    const [ errorInputField, setErrorInputField ] = useState({
        titleError: false,
        descriptionError: true,
        about_character_idError: true,
        heard_from_character_idError: true,
        about_location_idError: true,
        heard_on_location_idError: true,
        veracityError: true,
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    //USEEFFECT
    useEffect(() => { 
        console.log(gameRdx.gameInformation.id);

    }, []);

    // useEffect(() => { console.log(newKnowledgeData); }, [newKnowledgeData]);
    // useEffect(() => { console.log(submitStatus); }, [submitStatus]);
    useEffect(() => { setSubmitStatus(checkSubmitStatus()); }, [validInputField]);

    //HANDLERS
    const inputHandler = (e) => {  
        setNewKnowledgeData((prevState) => ({
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

        setValidInputField((prevState) => ({
            ...prevState,
            [e.target.name + 'Valid']: check.valid
        }));
        
        setErrorInputField((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    };

    const checkSubmitStatus = () => {
        for (const key in validInputField) {
            if (validInputField[key] === false) { return false };
        };

        return true;
    };

    return (
        <Container className='detailsBackground border border-black rounded pt-3'>
            <Row className='text-center'>
                <Col className='bannerRibbon fw-bold d-flex justify-content-center align-items-center pb-3'>
                    <input 
                        className='col-9 text-center rounded'
                        name="title"
                        required={true}
                        onChange={(e) => inputHandler(e)}/>
                </Col>
            </Row>
            <Row className='borderDataCard centerScrollLocations d-flex border border-black justify-content-start align-items-center py-1 mx-2'>                            
                <Col className='characterIcon col-2 fw-bold text-center'></Col>
                <input className='rounded col-9'></input>
            </Row>
            <Row className='borderDataCard centerScrollLocations d-flex border border-black justify-content-start align-items-center py-1 mx-2'>                            
                <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                <input className='rounded col-9'></input>
            </Row>
            <Row className='borderDataCard centerScrollLocations d-flex border border-black justify-content-start align-items-center py-1 mx-2'>                            
                <Col className='locationIcon col-2 fw-bold text-center'></Col>
                <input className='rounded col-9'></input>
            </Row>
            <Row className='borderDataCard centerScrollLocations d-flex border border-black justify-content-start align-items-center py-1 mx-2'>                            
                <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                <input className='rounded col-9'></input>
            </Row>
            <Row className='text-center my-2'>
                <Col className='col-1'/>
                <input 
                    className='col-10 text-center rounded'
                    name="description"
                    required={false}
                    onChange={(e) => inputHandler(e)}/>
                <Col className='col-1'/>
            </Row>
            <Row className='d-flex justify-content-center  my-2'>
                <Col className='col-4'>
                    <WoodenButton action="send" clickFunction={() => {}}/>
                </Col>
            </Row>
        </Container>
    )
};
