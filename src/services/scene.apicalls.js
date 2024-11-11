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

export const modifyScene = async (body) => {
    return await axios.put(`${root}/scene/put`, body);
};

export const deleteScene = async (body) => {
    const data = {
        scene_id: body
    }

    return await axios.delete(`${root}/scene/delete`,{data})
};