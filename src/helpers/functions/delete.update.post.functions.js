import { TypeEnum } from "../../utils/constants/index.js";
import { Posts } from "../../utils/database/index.js";
import { getPost } from "./index.js";



export const updatePost=async(id)=>{
    await Posts.updateOne(
        { user_id: id },
        { $set: { status: true } }
      );
    }
  export const deletePost = async (id) => {
    const result = await getPost(id,TypeEnum.true);
    if(result.status){
      return false
    }else{
      await Posts.deleteOne({ user_id: id });
      return true
    }
  };