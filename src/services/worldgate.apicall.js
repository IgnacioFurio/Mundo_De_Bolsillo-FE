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

export const deleteWorldGate = async (body) => {
    const data = {
        game_id: body.game_id,
        world_id: body.world_id
    }

    return await axios.delete(`${root}/worldgate/delete`, {data})
};