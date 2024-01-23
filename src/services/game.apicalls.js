import axios from "axios";
import { root } from "./apiCalls";

export const getAllgames = async () => {
    return await axios.get(`${root}/game/getall`);
};

