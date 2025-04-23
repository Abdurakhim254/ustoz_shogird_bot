import { Posts } from "../../utils/database/index.js";
import { TypeEnum } from "../../utils/constants/index.js";


export const getPost = async (id,type) => {
    let result
    if(TypeEnum.true==type){
        result = await Posts.findOne({ user_id: id,status:true });
    }else if(TypeEnum.false==type){
        result=await Posts.findOne({user_id:id,status:false})
    }
    return result;
};