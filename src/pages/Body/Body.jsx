import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Games } from '../Games/Games'
import { GameDetails } from '../GameDetails/GameDetails'
import { NewGame } from '../NewGame/NewGame'
import { ModifyGame } from '../ModifyGame/ModifyGame'
import { Container } from 'react-bootstrap'
import { Worlds } from '../Worlds/Worlds'
import { WorldDetails } from '../WorldDetails/WorldDetails'
import { NewWorld } from '../NewWorld/NewWorld'
import { ModifyWorld } from '../ModifyWorld/ModifyWorld'
import { NewLocation } from '../NewLocation/NewLocation'
import { ModifyLocation } from '../ModifyLocation/MOdifyLocation'
import { LocationDetails } from '../LocationDetails/LocationDetails'
import './Body.css';
import { NewCharacter } from '../NewCharacter/NewCharacter'
import { CharacterDetails } from '../CharacterDetails/CharacterDetails'
import { ModifyCharacter } from '../ModifyCharacter/ModifyCharacter'

export const Body = () => {
    return (
        <Container className='bodyDesign'>
            <Routes>
                <Route path='/games/my-games' element={<Games/>}/>
                <Route path='/games/game-details' element={<GameDetails/>}/>
                <Route path='/games/new-game' element={<NewGame/>}/>
                <Route path='/games/modify-game' element={<ModifyGame/>}/>
                <Route path='/worlds/my-worlds' element={<Worlds/>}/>
                <Route path='/worlds/world-details' element={<WorldDetails/>}/>
                <Route path='/worlds/new-world' element={<NewWorld/>}/>
                <Route path='/worlds/modify-world' element={<ModifyWorld/>}/>
                <Route path='/locations/new-location' element={<NewLocation/>}/>
                <Route path='/locations/modify-location' element={<ModifyLocation/>}/>
                <Route path='/games/game-details/locations/location-details' element={<LocationDetails/>}/>
                <Route path='/characters/new-character' element={<NewCharacter/>}/>
                <Route path='/games/game-details/characters/character-details' element={<CharacterDetails/>}/>
                <Route path='/characters/modify-character' element={<ModifyCharacter/>}/>
            </Routes>
        </Container>
    )
}
