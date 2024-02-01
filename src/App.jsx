import React from 'react'
import { Body } from './pages/Body/Body'
import { Container, Row } from 'react-bootstrap'
import './App.css'

export const App = () => {
  return (
    <div className="appDesign">
      <div className='headerDesign'>HEADER</div>
      <Body className="bodyDesign"/>
      <div className='footerDesign'>FOOTER</div>
    </div>
  )
}