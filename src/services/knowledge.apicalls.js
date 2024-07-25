import axios from "axios";
import { root } from "./apiCalls";

export const getKnowledgeByCharacterId = async (body) => {
    let data = {
        about_character_id: body
    };
    return await axios.post(`${root}/knowledge/get-by-character`, data);
};