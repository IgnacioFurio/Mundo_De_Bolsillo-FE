import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';

export const NewKnowledge = () => {

    const [ newKnowledge, setKnowledge ] = useState({
        title: "",
        description: "",
        about_character_id: "",
        heard_from_character_id: "",
        about_location_id: "",
        heard_on_location_id: "",
        veracity: "",
    });

    return (
        <Container className='detailsBackground border border-black rounded pt-3'>
            <Row className='text-center'>
                <Col className='bannerRibbon fw-bold d-flex justify-content-center align-items-center pb-3'>
                    <input className='rounded col-9'></input>
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
            <Row className='text-center my-1'>
                <Col className='col-1'/>
                <input className='col-10 rounded'></input>
                <Col className='col-1'/>
            </Row>
        </Container>
    )
};
