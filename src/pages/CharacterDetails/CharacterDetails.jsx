import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { characterData } from '../../services/character.slice';

export const CharacterDetails = () => {

    const characterRdx = useSelector(characterData);

    useEffect(() => {
        console.log(characterRdx.characterInformation);
    },[]);

    return (
        <div>CharacterDetails</div>
    )
};
