import React from 'react'
//css
import './BackButton.css'

export const BackButton = ({ clickFunction }) => {
  return (
    <div className='backButtonDesign d-flex align-items-center justify-content-center pt-1' onClick={clickFunction}><p className='backText fw-bold'>Volver</p></div>
    )
}
