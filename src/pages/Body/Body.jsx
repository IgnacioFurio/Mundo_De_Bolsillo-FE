import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Games } from '../Games/Games'
import { GameDetails } from '../GameDetails/GameDetails'
import { NewGame } from '../NewGame/NewGame'
import { ModifyGame } from '../ModifyGame/ModifyGame'
import { Container } from 'react-bootstrap'
import './Body.css';

export const Body = () => {
    return (
        <Container className='bodyDesign'>
            <Routes>
                <Route path='/games/my-games' element={<Games/>}/>
                <Route path='/games/game-details' element={<GameDetails/>}/>
                <Route path='/games/new-game' element={<NewGame/>}/>
                <Route path='/games/modify-game' element={<ModifyGame/>}/>
            </Routes>
        </Container>
    )
}
