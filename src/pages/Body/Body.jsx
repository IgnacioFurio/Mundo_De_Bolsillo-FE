import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Games } from '../Games/Games'
import { GameDetails } from '../GameDetails/GameDetails'

export const Body = () => {
    return (
        <Routes>
            <Route path='/my-games' element={<Games/>}/>
            <Route path='/game-details' element={<GameDetails/>}/>
        </Routes>
    )
}
