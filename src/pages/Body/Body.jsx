import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Games } from '../Games/Games'
import { GameDetails } from '../GameDetails/GameDetails'
import { NewGame } from '../NewGame/Newgame'
import { ModifyGame } from '../ModifyGame/ModifyGame'

export const Body = () => {
    return (
        <Routes>
            <Route path='/games/my-games' element={<Games/>}/>
            <Route path='/games/game-details' element={<GameDetails/>}/>
            <Route path='/games/new-game' element={<NewGame/>}/>
            <Route path='/games/modify-game' element={<ModifyGame/>}/>
        </Routes>
    )
}
