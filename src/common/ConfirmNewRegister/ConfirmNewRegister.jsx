import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
//css
import "./ConfirmNewRegister.css";


export const ConfirmNewRegister = ({ data }) => {

  const [ values, setValues] = useState([Object.keys(data)]);

  return (
    <> 
      <Container className='confirmRegisterDesign '>
        <Row className='confirmPosition d-flex justify-content-center'>
          {values[0][1] === "title" ? <Col className='registerTitleDesign text-center fs-3 fw-bold m-0'>{data.title}</Col> : <Col className='registerTitleDesign text-center fs-3 fw-bold m-0'>{data.name}</Col>}
          <Col className='registerDescriptionDesign text-center mb-3'>{data.description}</Col>
        </Row>
      </Container>
    </>
  )
}

