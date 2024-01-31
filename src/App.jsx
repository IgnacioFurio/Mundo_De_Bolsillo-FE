import React from 'react'
import { Body } from './pages/Body/Body'
import { Container, Row } from 'react-bootstrap'
import './App.css'

export const App = () => {
  return (
    <>
      <div >HEADER</div>
      <Body/>
      <div>FOOTER</div>
    </>
  )
}