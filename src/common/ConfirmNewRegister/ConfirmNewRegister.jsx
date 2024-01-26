import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
//css
import "./ConfirmNewRegister.css";


export const ConfirmNewRegister = ({ data }) => {

  useEffect(() => {
    console.log(data);
  })

  return (
    <>
      <Container className='confirmRegisterDesign'>
        <Row>
          <Col className='registerTitleDesign d-flex justify-content-center rounded fs-3 bold m-2'>{data.title}</Col>
        </Row>
        <Row>
          <Col className='registerDescriptionDesign d-flex justify-content-center text-center mb-3'>{data.description}</Col>
        </Row>
      </Container>
    </>
  )
}

