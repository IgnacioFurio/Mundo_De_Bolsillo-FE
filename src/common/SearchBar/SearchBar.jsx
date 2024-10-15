import React from 'react'
import { Col, Row } from 'react-bootstrap'

export const SearchBar = ({className, onChangeFunction}) => {
    return (
        <Row>
            <Col className='d-flex justify-content-center py-2'>
                    <input 
                        className={className}
                        name="searchBar"
                        placeholder={"Nombre del personaje"}
                        onChange={onChangeFunction}/>
            </Col>
        </Row>
    )
}
