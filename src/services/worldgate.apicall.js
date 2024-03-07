import axios from "axios";
import { root } from "./apiCalls";

export const getWorldGatesByGameId = async (gameId) => {

    let body = {
        game_id: gameId
    }

    return await axios.post(`${root}/worldgate/get-by-game`, body);
};

export const createWorldGate = async (body) => {
    return await axios.post(`${root}/worldgate/post`, body)
};

// export const modifyWorld = async (body) => {
//     return await axios.put(`${root}/world/put`, body);
// };

// export const deleteWorld = async (body) => {
//     const data = {
//         world_id: body
//     }

//     return await axios.delete(`${root}/world/delete`,{data})
// };