import axios from "axios";
import { root } from "./apiCalls";

export const getCharactersByWorldId = async (body) => {
    let data = {
        world_id: body
    }

    return await axios.post(`${root}/character/get`, data);
};