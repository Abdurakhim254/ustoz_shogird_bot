
import { Posts } from "../../utils/database/index.js";


export const getPost = async (id) => {
    const result = await Posts.findOne({ user_id: id });
    return result;
};