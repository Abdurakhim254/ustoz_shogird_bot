import { User } from "../../utils/database/index.js";


export const getUser = async (id) => {
    const result = await User.findOne({ user_id: id });
    return result;
};