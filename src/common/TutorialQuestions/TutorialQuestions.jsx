import React, { useEffect } from 'react'
//bootstrap
import { Col, Container, Form, Row } from 'react-bootstrap'


export const TutorialQuestions = ({ gameData, text, type, placeholder, name, required, changeFunction, blurFunction}) => {

    return (
        <Container>
            <Row>
                <Col className='fs-4 text-center bold'>
                    {text}
                </Col>
            </Row>
            <Form className='m-3'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control 
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
