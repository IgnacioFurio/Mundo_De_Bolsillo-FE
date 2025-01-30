import axios from "axios";
import { root } from "./apiCalls";

export const getKnowledgeByCharacterId = async (body) => {
    let data = {
        about_character_id: body
    };
    return await axios.post(`${root}/knowledge/get-by-character`, data);
};

export const getKnowledgeKnownByCharacterId = async (body) => {
    let data = {
        characters_id: body
    };
    return await axios.post(`${root}/knowledge-characters/get-by-character`, data);
};

export const getKnowledgeByLocationId = async (body) => {
    let data = {
        about_location_id: body
    };
    return await axios.post(`${root}/knowledge/get-by-location`, data);
};

export const createKnowledge = async (body) => {
    return await axios.post(`${root}/knowledge/post`, body)
};

export const modifyKnowledge = async (body) => {
    return await axios.put(`${root}/knowledge/put`, body);
};

export const deleteKnowledge = async (body) => {
    const data = {
        id: body
    }

    return await axios.delete(`${root}/knowledge/delete`,{data})
};