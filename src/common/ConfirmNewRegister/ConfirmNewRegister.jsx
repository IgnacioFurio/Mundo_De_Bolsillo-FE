import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
//css
import "./ConfirmNewRegister.css";


export const ConfirmNewRegister = ({ data }) => {

  return (
    <>
      <Container className='confirmRegisterDesign'>
        <Row className='d-flex justify-content-center align-items-center'>
          <Col className='registerTitleDesign rounded text-center fs-3 bold m-2'>{data.title}</Col>
        </Row>
        <Row>
          <Col className='registerDescriptionDesign text-center mb-3'>{data.description}</Col>
        </Row>
      </Container>
    </>
  )
}

