import React, { useEffect, useState } from 'react';
//component
import { SwitchSelector } from '../SwitchSelector/SwitchSelector';
//bootstrap
import { Col, Container, Form, Row } from 'react-bootstrap'
//css
import './TutorialSelector.css';
import { DropDown } from '../DropDown/DropDown';

export const TutorialSelector = ({ newLocationData, worldsData, type, dataGates, text, errorText, placeholder, clickFunction }) => {    
    const [ dataSelector, setDataSelector ] = useState(worldsData);

    return (
        <Container>
            <Row className='d-flex justify-content-center py-3 mb-5'>
                {errorText !== "" ? 
                    <Col className='textDesign col-12 col-sm-8 col-md-6 text-center bold py-3 mb-5'>{errorText}</Col> :
                    <Col className='textDesign col-12 col-sm-8 col-md-6 text-center bold py-3 mb-5'>{text}</Col>
                } 
            </Row>
            <Form className='d-flex justify-content-center m-3 mt-5'>
                <Form.Group className='col-10 col-sm-7 col-md-5'>
                    {/* {dataSelector.map((data) => {
                        return <SwitchSelector
                            key={data.id}
                            value={data.id}
                            label={data.name}
                            name={data.name}
                            clickFunction={clickFunction}
                            dataGates={dataGates}
                            />})} */}
                    {type === "DropDown" ? 
                        <DropDown
                            newLocationData={newLocationData}
                            worldsData={dataSelector}
                            placeholder={placeholder}
                            clickFunction={clickFunction}
                        />
                    :
                    <></>}
                </Form.Group>
            </Form>            
        </Container>
    )
};
