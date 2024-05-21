import axios from "axios";
import { root } from "./apiCalls";

export const getLocationsByWorldId = async (body) => {
    let data = {
        world_id: body
    }

    return await axios.post(`${root}/location/getall`, data);
};

export const createLocation = async (body) => {
    return await axios.post(`${root}/location/post`, body)
};
