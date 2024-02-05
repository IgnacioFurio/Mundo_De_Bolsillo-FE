import React, { useEffect } from 'react'
//bootstrap
import { Container } from 'react-bootstrap';
//css
import "./NewRegisterButton.css";


export const NewRegisterButton = ({name, clickFunction}) => {

    return (
        <Container className='d-flex justify-content-center'>
            <div className='NewRegisterButton d-flex align-items-center justify-content-center fw-bold' onClick={clickFunction}>
                <p className='burnedText fs-5 p-4 pb-3'>{name}</p>
            </div>
        </Container>
    )
}
