import axios from "axios";
import { root } from "./apiCalls";

export const getAllLocations = async () => {
    return await axios.get(`${root}/location/getall`);
};

export const getLocationsByWorldId = async (body) => {
    let data = {
        world_id: body
    }

    return await axios.post(`${root}/location/get`, data);
};

export const createLocation = async (body) => {
    return await axios.post(`${root}/location/post`, body)
};

export const modifyLocation = async (body) => {
    return await axios.put(`${root}/location/put`, body);
};