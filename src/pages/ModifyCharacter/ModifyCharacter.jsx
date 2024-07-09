import React from 'react'

export const ModifyCharacter = () => {
    const navigate = useNavigate();

    //HOOKS
    const formQuestions = {
        name: CharacterFormQuestions.text.new.name,
        description: CharacterFormQuestions.text.new.description,
        world_id: CharacterFormQuestions.text.new.world_id,
        from_location_id: CharacterFormQuestions.text.new.from_location_id,
        last_location_known_id: CharacterFormQuestions.text.new.last_location_known_id,
    };

    const formPlaceholders = {
        name: CharacterFormQuestions.placeholder.new.name,
        description: CharacterFormQuestions.placeholder.new.description,
        world_id: CharacterFormQuestions.placeholder.new.world_id,
        from_location_id: CharacterFormQuestions.placeholder.new.from_location_id,
        last_location_known_id: CharacterFormQuestions.placeholder.new.last_location_known_id,
    };

    const [ formCounter, setFormCounter ] = useState(0);

    const [ newCharacterData, setNewCharacterData] = useState({
        name: "",
        description: "",
        world_id: "",
        from_location_id: "",
        last_location_known_id: "",
    });

    const [ worlds, setWorlds ] = useState();
    const [ locations, setLocations ] = useState();
    
    const [ validInputField, setValidInputfield] = useState({
        nameValid: false,  //seteamos false cuando sea un campo obligatorio
        descriptionValid: true,
        world_idValid: false,
        from_location_idValid: true,
        last_location_known_idValid: true,
    });

    const [ errorInputField, setErrorInputfield ] = useState({
        nameError: "",
        descriptionError: "",
        world_idError: "",
        from_location_idError: "",
        last_location_known_idError: ""
    });
    
    const [ submitStatus, setSubmitStatus ] = useState(false);
    return (
        <div>ModifyCharacter</div>
    )
};
