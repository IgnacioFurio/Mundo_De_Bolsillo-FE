import axios from "axios";
import { root } from "./apiCalls";

export const getAllWorlds = async () => {
    return await axios.get(`${root}/world/getall`);
};

export const createWorld = async (body) => {
    return await axios.post(`${root}/world/post`, body)
};

export const modifyWorld = async (body) => {
    return await axios.put(`${root}/world/put`, body);
};

export const deleteWorld = async (body) => {
    const data = {
        world_id: body
    }

    return await axios.delete(`${root}/world/delete`,{data})
};