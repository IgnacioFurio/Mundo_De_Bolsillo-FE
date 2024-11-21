import axios from "axios";
import { root } from "./apiCalls";

export const getSessionsByGameId = async (body) => {
    let data = {
        game_id: body
    };

    return await axios.post(`${root}/session/get-all-by-game`, data);
};

export const createSession = async (body) => {
    return await axios.post(`${root}/session/post`, body)
};

// export const modifySession = async (body) => {
//     return await axios.put(`${root}/session/put`, body);
// };

export const deleteSession = async (body) => {
    const data = {
        session_id: parseInt(body)
    }

    return await axios.delete(`${root}/session/delete`,{data})
};