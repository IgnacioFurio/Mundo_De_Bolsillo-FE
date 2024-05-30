import React, { useEffect, useState } from 'react'
import { Container, Dropdown, DropdownButton } from 'react-bootstrap'

export const DropDown = ({ newLocationData, worldsData, placeholder, clickFunction}) => {
    const [ dropData, SetDropData ] = useState(worldsData);

    const [ selectedData, setSelectedData ] = useState(placeholder);

    useEffect(() => {
        if (newLocationData.world_id !== "") {
            for (let i = 0; i < dropData.length; i++) {
                if (dropData[i].id === newLocationData.world_id) setSelectedData(dropData[i].name);
            };
        };
    });

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
