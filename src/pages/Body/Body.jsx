import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Games } from '../Games/Games'

export const Body = () => {
    return (
        <Routes>
            <Route path='/my-games' element={<Games/>}/>
        </Routes>
    )
}
