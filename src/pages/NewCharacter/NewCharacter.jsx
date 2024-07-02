import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const NewCharacter = () => {
    const navigate = useNavigate();

    //HOOKS
    const formQuestions = {};
    const formPlaceholders = {};
    const [ formCounter, setFormCounter ] = useState(0);

    const [ newCharacterData, setNewCharacterData] = useState({
        name: "",
        description: "",
        world_id: "",
        from_location_id: "",
        last_location_known_id: "",
    });
    
    const [ validInputField, setValidInputfield] = useState({
        nameValid: false,  //seteamos false cuando sea un campo obligatorio
        descriptionValid: true,
        world_idValid: true,
        from_location_idValid: true,
        last_location_known_idValid: true,
    });

    const [ errorInputField, setErrorInputfield ] = useState({
        nameError: "",
        descriptionError: "",
        word_idError: "",
        from_location_idError: "",
        last_location_known_idError: ""
    });
    
    const [ submitStatus, setSubmitStatus ] = useState(false);


    return (
        <div>NewCharacter</div>
    );
};
