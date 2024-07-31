import axios from "axios";
import { root } from "./apiCalls";

export const getKnowledgeByCharacterId = async (body) => {
    let data = {
        about_character_id: body
    };
    return await axios.post(`${root}/knowledge/get-by-character`, data);
};

export const createKnowledge = async (body) => {
    return await axios.post(`${root}/knowledge/post`, body)
};