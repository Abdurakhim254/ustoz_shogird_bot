import { Posts } from "../../utils/database/index.js";


export const deletePost = async (id) => {
    await Posts.deleteOne({ user_id: id });
};

export const updatePost=async(id)=>{
    await Posts.updateOne(
        { user_id: id },
        { $set: { status: true } }
      );
    }