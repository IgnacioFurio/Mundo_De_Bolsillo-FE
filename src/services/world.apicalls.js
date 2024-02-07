import axios from "axios";
import { root } from "./apiCalls";

export const getAllWorlds = async () => {
    return await axios.get(`${root}/world/getall`);
};