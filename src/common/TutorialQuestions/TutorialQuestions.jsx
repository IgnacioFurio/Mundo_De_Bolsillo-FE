import React, { useEffect } from 'react'
//bootstrap
import { Col, Container, Form, Row } from 'react-bootstrap'

export const TutorialQuestions = ({ text, type, placeholder, name, changeFunction}) => {

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
                    onChange={changeFunction}
                    />
                </Form.Group>
            </Form>
            
        </Container>
    ) 
}
