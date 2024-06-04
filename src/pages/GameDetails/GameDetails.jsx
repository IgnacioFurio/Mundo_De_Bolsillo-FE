import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { gameData, gameInfo } from '../../services/game.slice';
//apicall
import { deleteGame } from '../../services/game.apicalls';
import { deleteWorldGate, getWorldGatesByGameId } from '../../services/worldgate.apicall';
import { getLocationsByWorldId } from '../../services/location.apicalls';
//components
import { WoodenButton } from '../../common/WoodenButton/WoodenButton';
import { Locations } from '../../common/Locations/Locations';
//bootstrap
import { Container, Row , Col} from 'react-bootstrap';
//helper
import { extractWorldId } from '../../helpers/GameDetails.helper';
//css
import "./GameDetails.css";


export const GameDetails = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const dataRdx = useSelector(gameData);

    const [ gameInformation, setGameInformation ] = useState(dataRdx.gameInformation);

    const [ worldGates, setWorldGates ] = useState([]);

    const [ locations, setlocations ] = useState();

    const [ showPlaces, setShowPlaces ] = useState({
        "": false,
        Localizaciones: false,
        Personajes: false
    });

    //HANDLERS
    const navigateBack = () => {
        dispatch(gameInfo({gameInformation: {}}));      
        navigate("/games/my-games");
    };

    useEffect(() => { // Bring worlds linked to the game
        getWorldGatesByGameId(gameInformation.id)
        .then(result => {
            let worlds = [];

            for (let i = 0; i < result.data.data.length; i++) {
                worlds.push(result.data.data[i].World);
            };
            setWorldGates(worlds.sort((a,b) => a.id - b.id));
        })
        .catch(error => console.log(error.response.data.error))
    }, []);

    useEffect(() => {
        getLocationsByWorldId(extractWorldId(worldGates))
        .then(result => {
            let arr = result.data.data;
            let locations = [];

            for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr[i].length; j++) {
                        locations.push(arr[i][j]);                        
                    }
            };

            setlocations(locations);
        })
        .catch(error => console.log(error.response.data.error))
    }, [worldGates]);

    // FUNCTIONS
    const deleteGameData = (game_id) => {

        for (let i = 0; i < worldGates.length; i++) {
            deleteWorldGate({game_id: game_id, world_id: worldGates[i].id})
            .then(() => {})
            .catch(error => console.log(error.response.data.error))
        };

        deleteGame(game_id)
        .then(result => {
            dispatch(gameInfo({gameInformation: {}}));      
            navigate("/games/my-games");
        })
        .catch(error => console.log(error.response.data.error));
    };

    const InfoHandler = (e) => {
        setShowPlaces({
            "": false,
            Localizaciones: false,
            Personajes: false
        });

        if (showPlaces[e.target.value] == false) {
            setShowPlaces({
                ...showPlaces,
                [e.target.value]: true
            });
        };
    };

    return (
        <Container id={gameInformation?.id} className='col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7'>
            <Row className='d-flex justify-content-evenly pt-3'>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="back" clickFunction={() => navigateBack("/games/my-games")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="edit" clickFunction={() => navigate("/games/modify-game")}/></Col>
                <Col className='col-4 d-flex justify-content-center'><WoodenButton action="delete" clickFunction={() => deleteGameData(gameInformation.id)}/></Col>
            </Row>            
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='detailsStone mt-4 py-2'>
                    <div className='gamePortraitTitle p-3'><p className='gameDetailsTitle d-flex justify-content-center col-12 fs-4 fw-bold mb-0'>{gameInformation.title}</p></div>
                </Col>                    
            </Row>
            <Row className='detailsBackground mx-1'>
                <Col className='col-12 text-center mb-3 mx-2'>{gameInformation.description}</Col> 
                <Col className='col-12 text-center fw-bold my-2'>Mundos enlazados</Col>     

                {worldGates.map((data) => 
                <Container key={data.id} className='d-flex justify-content-center col-12 col-sm-6 col-lg-4 my-2'>
                    <Col style={{width: '1.2em', cursor: 'default'}} className='switchDesignOn col-2 ms-2'></Col>
                    <Col className='col-4 col-sm-5 col-lg-3 mx-2'>{data.name}</Col>
                </Container>
                )}

                <select className='MoreInfoSelector text-center fw-bold my-2' onClick={(e) => InfoHandler(e)}> 
                    <option value="">Información sobre:</option>
                    <option value="Localizaciones">Localizaciones</option>
                    <option value="Personajes">Personajes</option>
                </select>

                {showPlaces.Localizaciones == true ? <Locations worldGates={worldGates}/> : <></>}            
                {showPlaces.Personajes == true ? <>Personajes Info</> : <></>}            
            </Row>
        </Container>
    )
}
