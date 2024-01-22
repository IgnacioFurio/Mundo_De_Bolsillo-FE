import React, { useEffect, useState } from 'react'
//microservices
import { getAllgames } from '../../services/game.apicalls';

export const Games = () => {
    const [ games, setGames ] = useState([]);

    useEffect(() => {
        getAllgames()
        .then(result => {setGames(result.data.data);})
        .catch(error => console.log(error));
    },[]);

    useEffect(() => {
        console.log(games);
    });

    return (
        <div>Games</div>
    )
}
