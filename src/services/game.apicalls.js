import axios from "axios";
import { root } from "./apiCalls";

export const getAllgames = async () => {
    return await axios.get(`${root}/game/getall`);
};

export const createGame = async (body) => {
    return await axios.post(`${root}/game/post`, body)
};

export const modifyGame = async (body) => {
    return await axios.put(`${root}/game/put`, body);
};

export const deleteGame = async (body) => {
    const data = {
        game_id: body
    }

    return await axios.delete(`${root}/game/delete`,{data})
};