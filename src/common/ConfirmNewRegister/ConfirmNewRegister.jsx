import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
//css
import "./ConfirmNewRegister.css";


export const ConfirmNewRegister = ({ data }) => {

  return (
    <> 
      <Container className='confirmRegisterDesign '>
        <Row className='confirmPosition d-flex justify-content-center'>
          <Col className='registerTitleDesign rounded text-center fs-3 bold m-2'>{data.title}</Col>
          <Col className='registerDescriptionDesign text-center mb-3'>{data.description}</Col>
        </Row>
      </Container>
    </>
  )
}

