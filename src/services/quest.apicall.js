import axios from "axios";
import { root } from "./apiCalls";

export const getQuestByCharacterId = async (body) => {
    let data = {
        character_id: body
    }

    return await axios.post(`${root}/quest/get-by-character`, data);
};

// export const createLocation = async (body) => {
//     return await axios.post(`${root}/location/post`, body)
// };

// export const modifyLocation = async (body) => {
//     return await axios.put(`${root}/location/put`, body);
// };

// export const deleteLocation = async (body) => {
//     const data = {
//         id: body
//     }

//     return await axios.delete(`${root}/location/delete`,{data})
// };