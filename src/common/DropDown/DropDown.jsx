import React, { useEffect, useState } from 'react'
import { Container, Dropdown } from 'react-bootstrap'

export const DropDown = ({ newData, attribute, dropDownData, placeholder, clickFunction}) => {
    
    const [ dropData, setDropData ] = useState(dropDownData);

    const [ data, setData ] = useState(newData);

    const [ attributeCheck, setAttributeCheck ] = useState(attribute);

    const [ selectedData, setSelectedData ] = useState(placeholder);

    useEffect(() => {
        
        if(data.world_id != "" && attribute != "world_id") {
            let filteredLocations = [];
            
            for (let i = 0; i < dropData.length; i++) {
                if (data.world_id == dropData[i].world_id) {
                    filteredLocations.push(dropData[i]);
                }          
            }
            setDropData(filteredLocations);
        };

        for (const key in data) {
            if (key == attributeCheck && data[attribute] != "") {
                for (let i = 0; i < dropData.length; i++) {
                    if (dropData[i].id === data[key]) setSelectedData(dropData[i].name);
                };
            };
        };
        
    },[data]);

    useEffect(() => { setData(newData) }, [newData]);

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
