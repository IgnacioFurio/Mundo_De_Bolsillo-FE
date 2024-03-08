import React, { useEffect, useState } from 'react'
//bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//css
import './SwitchSelector.css'

export const SwitchSelector = ({ value, dataGates, label, name, type, clickFunction }) => {
    const [ switchDesign, setSwitchDesign ] = useState();

    const [ switchStatus, setSwitchStatus ] = useState();

    useEffect(() => {
        console.log(dataGates);
        if (dataGates[value] === false) {
            setSwitchDesign("switchDesignOff col-2 d-flex justify-content-start align-items-center m-0 p-0")
            setSwitchStatus("switchOff m-0 p-0")
        } else if (dataGates[value] === true) {
            setSwitchDesign("switchDesignOn col-2 d-flex justify-content-end align-items-center m-0 p-0")
            setSwitchStatus("switchOn m-0 p-0")
        }
    });

    return (
        <Container onClick={clickFunction} name={name} type={type}>
            <Row className="selectDesign my-3 p-1 d-flex justify-content-center align-items-center">
                <Col className={switchDesign} id={value} value={value}>
                    <div className={switchStatus} id={value}></div>
                </Col>
                <Col className='col-10' id={value} value={value}>{label}</Col>
            </Row>
        </Container>
    );
}
;