import React from 'react'
import { Col, Row } from 'react-bootstrap'

export const SearchBar = ({className, onChangeFunction, placeholder}) => {
    return (
        <Row>
            <Col className='d-flex justify-content-center py-2'>
                    <input 
                        className={className}
                        name="searchBar"
                        placeholder={placeholder}
                        onChange={onChangeFunction}/>
            </Col>
        </Row>
    )
}
