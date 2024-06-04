import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { locationData } from '../../services/location.slice';
import { LocationFormQuestions } from '../../helpers/Location.Forms.helper';
import { getAllWorlds } from '../../services/world.apicalls';

export const ModifyLocation = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(locationData);

    const [ formCounter, setFormCounter ] = useState(0);
    
    const formQuestions = {
        name: LocationFormQuestions.text.modify.name,
        world_id: LocationFormQuestions.text.modify.world_id,
        description: LocationFormQuestions.text.modify.description,
        type: LocationFormQuestions.text.modify.type,
        government: LocationFormQuestions.text.modify.government,
        population: LocationFormQuestions.text.modify.population,
        defenses: LocationFormQuestions.text.modify.defenses,
        commerce: LocationFormQuestions.text.modify.commerce,
    };
    
    const formPlaceholders = {
        name: LocationFormQuestions.placeholder.new.name,
        world_id: LocationFormQuestions.placeholder.new.world_id,
        description: LocationFormQuestions.placeholder.new.description,
        type: LocationFormQuestions.placeholder.new.type,
        government: LocationFormQuestions.placeholder.new.government,
        population: LocationFormQuestions.placeholder.new.population,
        defenses: LocationFormQuestions.placeholder.new.defenses,
        commerce: LocationFormQuestions.placeholder.new.commerce,
    };

    const [ locationInformation, setLocationInformation ] = useState({
        id: dataRdx.locationInformation.id,
        name: dataRdx.locationInformation.name,
        world_id: dataRdx.locationInformation.world_id,
        description: dataRdx.locationInformation.description,
        type: dataRdx.locationInformation.type,
        government: dataRdx.locationInformation.government,
        defenses: dataRdx.locationInformation.defenses,
        commerce: dataRdx.locationInformation.commerce,
    });

    const [ worldInformation, setWorldInformation ] = useState({});

    //only set false when a field is required
    const [ validInputField, setValidInputfield] = useState({
        nameValid: false,
        world_idValid: false,
        descriptionValid: true,
        typeValid: true,
        governmentValid: true,
        defensesValid: true,
        commerceValid: true,
    });
    
    const [ errorInputField, setErrorInputfield] = useState({
        nameError: "",
        world_idError: "",
        descriptionError: "",
        typeError: "",
        governmentError: "",
        defensesError: "",
        commerceError: "",
    });

    const [ submitStatus, setSubmitStatus ] = useState(false);

    useEffect(() => {
        getWorlds();
    }, []);
    
    useEffect(() => {
        console.log(worldInformation);
    }, [worldInformation]);


    const getWorlds = () => {

        getAllWorlds()
        .then((result) => {
            let worlds = result.data.data
            
            setWorldInformation(worlds)
        })
        .catch(error => console.log(error));
    };

    return (
        <div className='text-warning'>ModifyLocation</div>
    )
};
