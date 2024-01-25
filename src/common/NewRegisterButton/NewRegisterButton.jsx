import React, { useEffect } from 'react'
//bootstrap
import { Container, Row , Col, Button} from 'react-bootstrap';
//css
import "./NewRegisterButton.css";


export const NewRegisterButton = ({name, clickFunction}) => {

    return (
        <div className='NewRegisterButton fw-bold  p-2' onClick={clickFunction}>
            {name}
        </div>
    )
}
