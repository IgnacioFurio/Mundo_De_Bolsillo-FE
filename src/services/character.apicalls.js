import axios from "axios";
import { root } from "./apiCalls";

export const getCharactersByWorldId = async (body) => {
    let data = {
        world_id: body
    };

    return await axios.post(`${root}/character/get`, data);
};

export const createCharacter = async (body) => {
    return await axios.post(`${root}/character/post`, body);
};

export const modifyCharacter = async (body) => {
    return await axios.put(`${root}/character/put`, body);
};

export const deleteCharacter = async (body) => {
    const data = {
        character_id: body
    }

    return await axios.delete(`${root}/character/delete`,{data})
};