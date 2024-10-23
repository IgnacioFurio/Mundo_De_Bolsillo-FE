import axios from "axios";
import { root } from "./apiCalls";

export const getQuestByCharacterId = async (body) => {
    let data = {
        character_id: body
    }

    return await axios.post(`${root}/quest/get-by-character`, data);
};

export const getCharactersByQuestrId = async (body) => {
    let data = {
        quest_id: body
    }

    return await axios.post(`${root}/quest/get-by-quest`, data);
};

export const createQuest = async (body) => {
    return await axios.post(`${root}/quest/post`, body)
};

export const modifyQuest = async (body) => {
    return await axios.put(`${root}/quest/put`, body);
};

export const deleteQuest = async (body) => {
    const data = {
        quest_id: body
    }

    return await axios.delete(`${root}/quest/delete`,{data})
};