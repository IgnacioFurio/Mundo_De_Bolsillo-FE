import React, { useEffect, useState } from 'react'
//bootstrap
import { Col, Container, Form, Row } from 'react-bootstrap';
//css
import './SwitchSelector.css'

export const SwitchSelector = ({ value, label, name, type, clickFunction }) => {
    const [ status, setStatus ] = useState(false); 

    const [ switchDesign, setSwitchDesign ] = useState();

    const [ switchStatus, setSwitchStatus ] = useState();

    useEffect(() => {
        if (status === false) {
            setSwitchDesign("switchDesignOff col-2 d-flex justify-content-start align-items-center m-0 p-0")
            setSwitchStatus("switchOff m-0 p-0")
        } else if (status === true) {
            setSwitchDesign("switchDesignOn col-2 d-flex justify-content-end align-items-center m-0 p-0")
            setSwitchStatus("switchOn m-0 p-0")
        }
    });

    const switchHandler = () => {
        status === true ? setStatus(false) : setStatus(true);
    };

    return (
        <Container onClick={clickFunction} name={name} type={type}>
            <Row className="selectDesign my-3 p-1 d-flex justify-content-center align-items-center">
                <Col className={switchDesign} id={value} value={value} onClick={() => switchHandler()}>
                    <div className={switchStatus} id={value}></div>
                </Col>
                <Col className='col-10' id={value} value={value} onClick={() => switchHandler()}>{label}</Col>
            </Row>
        </Container>
    );
}
;