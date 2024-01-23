import React, { useEffect, useState } from 'react'
//microservices
import { getAllgames } from '../../services/game.apicalls';
//components
import { GameCard } from '../../common/GameCard/GameCard';

export const Games = () => {
    const [ games, setGames ] = useState([]);

    useEffect(() => {
        getAllgames()
        .then(result => {setGames(result.data.data);})
        .catch(error => console.log(error));
    },[]);

    useEffect(() => {
    });

    return (
        <div className='m-3'>
        {games.map(data => {return <GameCard key={data.id} dataCard={data}/>})}
        </div>
    )
}
