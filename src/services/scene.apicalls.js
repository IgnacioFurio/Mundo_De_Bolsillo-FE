import axios from "axios";
import { root } from "./apiCalls";

export const getScenesByGameId = async (body) => {
    let data = {
        game_id: body
    };

    return await axios.post(`${root}/scene/get-all-by-game`, data);
};

export const createScene = async (body) => {
    return await axios.post(`${root}/scene/post`, body)
};

// export const modifyGame = async (body) => {
//     return await axios.put(`${root}/game/put`, body);
// };

// export const deleteGame = async (body) => {
//     const data = {
//         game_id: body
//     }

//     return await axios.delete(`${root}/game/delete`,{data})
// };