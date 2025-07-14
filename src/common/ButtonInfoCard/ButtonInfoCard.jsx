import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { WoodenButton } from '../WoodenButton/WoodenButton';
import "./ButtonInfoCard.css";


export const ButtonInfoCard = ({ infoCard, moreData, source }) => {
    const [show, setShow] = useState(false);

    const [ sourceType, setSourceType ] = useState(source);

    const [ buttonClassName, setButtonClassName ]  = useState('buttonInfoCard mx-1 my-1');

    const [ characters, setCharacters ] = useState(moreData ?? []);
    const [ charactersKnowledge, setCharactersKnowledge ] = useState(infoCard?.charactersKnow ?? []);
    const [ charactersIgnoringKnowledge, setCharactersIgnoringKnowledge ] = useState([]);

    const [ charactersGrantedKnowledge , setCharactersGrantedKnowledge ] = useState("");

    useEffect(() => { 
        classButtonHandler(source);
        filterCharactersKnowledge(characters, charactersKnowledge)       
     }, []);

    //HANDLERS
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const classButtonHandler = (source) => {
        if (source === "characters") {
            if (infoCard.npc === false) {
                setButtonClassName('buttonInfoCard blueButton mx-1 my-1');
            } else if (infoCard.npc === true) {
                setButtonClassName('buttonInfoCard redButton mx-1 my-1');
            }
        };
        
        if (source === "knowledge" && charactersKnowledge) {
            let newClassName = '';
            let hasPlayerCharacter = charactersKnowledge.some(data => data.npc === false);
            let hasNonPlayerCharacter = charactersKnowledge.some(data => data.npc === true);
            
            if (hasPlayerCharacter === true && hasNonPlayerCharacter === true ) {
                newClassName = 'buttonInfoCard purpleButton mx-1 my-1';
            } else  if (hasPlayerCharacter === true) {
                newClassName = 'buttonInfoCard blueButton mx-1 my-1';
            } else  if (hasNonPlayerCharacter === true) {
                newClassName = 'buttonInfoCard redButton mx-1 my-1';
            };
            
            setButtonClassName(newClassName);
        };
    };

    //FUNCTIONS
    const filterCharactersKnowledge = (characters, charactersKnowledge) => {
        let charactersIdKnowledge = charactersKnowledge.map(data => {return data.id}) 

        let charactersSet = new Set(charactersIdKnowledge)
        let ignorantCharacters = characters.filter(data => !charactersSet.has(data.id))
        setCharactersIgnoringKnowledge(ignorantCharacters);
    };

    return (
        <>
            <button 
                className={buttonClassName}
                onClick={() => handleShow()}>
                    {infoCard?.name|| infoCard?.title || infoCard?.Knowledge?.title || infoCard?.quest?.name}
            </button>   
            <Modal show={show} centered onHide={() => handleClose()}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body >
                    <Col className='bannerRibbon text-center fw-bold py-2'>
                        {infoCard?.name || infoCard?.title|| infoCard?.Knowledge?.title || infoCard?.quest?.name}
                    </Col>
                    {sourceType === "location" ? (
                        <Container className='centerScrollLocations col-10 '>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='governmentIcon col-1 fw-bold text-center'></Col>
                                <Col className='col-9'>{infoCard?.government || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>                            
                                <Col className='defensesIcon col-1 fw-bold'></Col>
                                <Col className='col-10'> {infoCard?.defenses || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                                <Col className='commerceIcon col-1 fw-bold'></Col>
                                <Col className='col-10'> {infoCard?.commerce || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                                <Col className='populationIcon col-1 fw-bold'></Col>
                                <Col className='col-10'> {infoCard?.population || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center mt-0 py-1 px-2'>
                                <Col className='worldIcon col-1 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.World?.name || "??"}</Col>
                            </Row>
                        </Container>
                    ) : (
                        <></>
                    )}
                    {sourceType  === "characters" ? (
                        <Container className='centerScrollLocations col-10'>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='text-center'>{infoCard?.description ||"??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='fromLocationIcon col-2 fw-bold'/>
                                <Col className='col-10 tex-center'>{infoCard?.fromLocation?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex justify-content-start align-items-center py-1 px-2' >
                                <Col className='lastLocationKnownIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.lastLocationKnown?.name || "??"}</Col>
                            </Row>
                        </Container>
                    ) : (
                        <></>
                    )}

                    {sourceType  === "knowledge" ? (
                        <Container className='centerScrollLocations col-11 mt-1'>
                            <Row className='d-flex justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='col-12 text-center'>{ infoCard?.description || infoCard?.Knowledge?.description || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='charactersKnowIcon col-2 fw-bold text-center' title='Lo saben ...'></Col>
                                <Col className='col-10 flex-wrap    '>
                                    {/*Characters that know the info*/}
                                    {Array.isArray(characters) ? (
                                        charactersKnowledge.map((data) => (
                                            <button key={data.id} className='buttonInfoCard greenButton mx-1 my-1'>
                                            {data.name}
                                            </button>
                                        ))
                                        ) : (
                                        <p>??</p>
                                        )}
                                    {/*Characters that ignore the info*/}
                                    {Array.isArray(characters) ? (
                                        charactersIgnoringKnowledge.map((data) => (
                                            <button key={data.id} className='buttonInfoCard greyButton mx-1 my-1'>
                                            {data.name}
                                            </button>
                                        ))
                                        ) : (
                                        <p>??</p>
                                        )}
                                </Col>
                                <Col className='col-2 d-flex justify-content-center border' onClick={() => filterCharactersKnowledge(characters, charactersKnowledge)}>+</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='characterIcon col-2 fw-bold text-center' title='Acerca de ...'></Col>
                                <Col className='col-10'>{infoCard?.aboutCharacter?.name || infoCard?.Knowledge?.aboutCharacter?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='heardFromCharacterIcon  col-2 fw-bold text-center' title='Contado por ...'></Col>
                                <Col className='col-10'>{ infoCard?.heardFromCharacter?.name || infoCard?.Knowledge?.heardFromCharacter?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='locationIcon col-2 fw-bold text-center' title='Ocurre en ...'></Col>
                                <Col className='col-10'>{infoCard?.aboutLocation?.name || infoCard?.Knowledge?.aboutLocation?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='heardOnLocationIcon col-2 fw-bold text-center' title='Escuchado en ...'></Col>
                                <Col className='col-10'>{infoCard?.heardOnLocation?.name || infoCard?.Knowledge?.heardOnLocation?.name || "??"}</Col>
                            </Row>
                        </Container>
                    ) : (
                        <></>
                    )}
                    
                    {sourceType  === "quest" ? (
                        <Container className='centerScrollLocations col-11 mt-1'>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='heardFromCharacterIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.delieveredByCharacter?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='heardOnLocationIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.gotInLocation?.name || "??"}</Col>
                            </Row>
                            <Row className='borderDataCard d-flex border border-black justify-content-start align-items-center py-1 px-2'>                            
                                <Col className='locationIcon col-2 fw-bold text-center'></Col>
                                <Col className='col-10'>{infoCard?.happensInLocation?.name || "??"}</Col>
                            </Row>
                            <Row className='text-center my-1'>
                                <Col className='col-12 mb-1'>{infoCard?.quest?.goal || "??"}</Col>                            
                            </Row>
                        </Container>
                        ) : (
                        <></>
                    )}
                    <Col className='col-12 d-flex justify-content-evenly py-3'>
                        <WoodenButton activateButton={true} action="delive" clickFunction={() => handleClose()}/>
                    </Col>
                </Modal.Body>
            </Modal>
        </>
    )
};
