import React, { useEffect } from 'react'
//bootstrap
import { Container, Row , Col, Button} from 'react-bootstrap';
//css
import "./NewRegisterButton.css";


export const NewRegisterButton = ({name}) => {

    useEffect(() => {
    });
    return (
        <div className='NewRegisterButton fw-bold  p-2'>
            {name}
        </div>
    )
}
