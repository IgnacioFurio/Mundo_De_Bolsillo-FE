import React, { useEffect, useState } from 'react';
//bootstrap
import { Col, Container, Form, Row } from 'react-bootstrap'
//css
import './TutorialSelector.css';
import { SwitchSelector } from '../SwitchSelector/SwitchSelector';

export const TutorialSelector = ({ data, text, errorText, clickFunction }) => {    
    const [ dataSelector, setDataSelector ] = useState(data);

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
                    {dataSelector.map((data) => {
                    return <SwitchSelector
                        key={data.id}
                        value={data.id}
                        label={data.name}
                        name={data.name}
                        clickFunction={clickFunction}
                        />})}
                </Form.Group>
            </Form>            
        </Container>
    )
};
