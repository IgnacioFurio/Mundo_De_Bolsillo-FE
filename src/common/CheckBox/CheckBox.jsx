import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'

export const CheckBox = ({ checkedData, value, label, className, onChangeFunction }) => {
    const [ data, setData ] = useState([]);

    const [ status, setStatus ] = useState(false);

    useEffect(() => { setData(checkedData); }, []);
    
    useEffect(() => { setStatus(checkHandler(data)); }, [ data ]);
    
    const checkHandler = (data) => {  
        let result = false;
                
        for (let i = 0; i < data.length; i++) {            
                if (data[i] === value) {
                    result = true;
                };
            };
            
        return result;
    };

    return (
        <>
            {status === false ? (
                <Col className={className} onChange={onChangeFunction}>
                    <input className="form-check-input" value={value} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{label}</label>
                </Col>
            ) : (
                <Col className={className} onChange={onChangeFunction}>
                <input className="form-check-input" value={value} type="checkbox" role="switch" id="flexSwitchCheckChecked" checked/>
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{label}</label>
            </Col>
            )}
            
        </>
    )
}
