import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'

export const CheckBox = ({ checkedData, value, label, className, onChangeFunction }) => {
    const [ data, setData ] = useState(checkedData);
    const [ checkValue, setCheckValue ] = useState(value);

    const [ status, setStatus ] = useState(false);
    
    useEffect(() => { checkHandler(data); }, [ data ]);
    
    const checkHandler = (data) => {  
        let result = false;
                
        for (let i = 0; i < data.length; i++) {            
                if (parseInt(data[i]) === parseInt(value)) {
                    result = true;
                };
            };
                        
        setStatus(result);          // Actualizar el estado según el Array de data
    };

    const handleCheckboxChange = (e) => {
        setStatus(e.target.checked); // Actualizar el estado según el checkbox
        onChangeFunction(e);         // Llamar a la función que viene por props
    };

    return (
        <Col className={className} >
            <input 
                className="form-check-input" 
                value={checkValue} 
                type="checkbox" 
                role="switch" 
                id={status ? "flexSwitchCheckChecked" : "flexSwitchCheckDefault"}
                checked={status} // Input controlado por el estado "status"
                onChange={(e) => handleCheckboxChange(e)} // Manejador de cambio
            />
            <label 
                className="form-check-label" 
                htmlFor={status ? "flexSwitchCheckChecked" : "flexSwitchCheckDefault"}>
                {label}
            </label>
        </Col>
    )
}
