import { Posts, ShablonProps } from "../../utils";



export class PostService {
   async createPost(props:ShablonProps){
    await Posts.create({
      user_id:props.user_id,
      name:props.name,
      age:props.age,
      texnologiya:props.texnologiya,
      aloqa:props.aloqa,
      hudud:props.hudud,
      narx:props.narx,
      kasb:props.kasb,
      murojaat_vaqti:props.murojaat_vaqti,
      maqsad:props.maqsad,
      theme:props.theme,
      tag:props.tag,
    })
   }


   async getPosts(){
    const posts=await Posts.find({status:false})
    return posts
   }
}