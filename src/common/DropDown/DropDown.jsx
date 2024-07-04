import React, { useEffect, useState } from 'react'
import { Container, Dropdown, DropdownButton } from 'react-bootstrap'

export const DropDown = ({ newData, attribute, worldsData, placeholder, clickFunction}) => {
    const [ dropData, SetDropData ] = useState(worldsData);

    const [ data, setData ] = useState(newData);

    const [ attributeCheck, setAttributeCheck ] = useState(attribute);

    const [ selectedData, setSelectedData ] = useState(placeholder);

    useEffect(() => {
        for (const key in data) {
            if (key == attributeCheck && data[key] != "") {
                for (let i = 0; i < dropData.length; i++) {
                    if (dropData[i].id === data[key]) setSelectedData(dropData[i].name);
                };
            };
        };
        
    },[data]);

    useEffect(() => { 
        console.log(selectedData);
        setData(newData) });

    return (
        <Container className='col-12 d-flex justify-content-center align-items-center'>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {selectedData}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {dropData.map((data) => {
                        return <Dropdown.Item 
                                    key={data.id}
                                    id={data.id}
                                    onClick={clickFunction}
                                    >{data.name}
                                </Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    )
}
