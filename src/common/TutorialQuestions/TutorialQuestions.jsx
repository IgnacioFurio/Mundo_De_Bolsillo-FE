import React, { useEffect } from 'react'
//bootstrap
import { Col, Container, Form, Row } from 'react-bootstrap'
import './TutorialQuestions.css';


export const TutorialQuestions = ({ gameData, text, type, placeholder, name, required, changeFunction, blurFunction}) => {

    return (
        <Container>
            <Row className='d-flex justify-content-center py-3 mb-5'>
                <Col className='textDesign col-12 col-sm-8 col-md-6 text-center bold py-3 mb-5'>
                    {text}
                </Col>
            </Row>
            <Form className='d-flex justify-content-center m-3 mt-5'>
                <Form.Group className='col-10 col-sm-7 col-md-5'>
                    <Form.Control
                    className="inputDesign"
                    type={type} 
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    onChange={changeFunction}
                    onBlur={blurFunction}
                    value={gameData}
                    />
                </Form.Group>
            </Form>            
        </Container>
    ) 
}
