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
    const posts=await Posts.find({status:false}).sort({timestamp:-1})
    return posts
   }


   async deletePost(id: number) {
    await Posts.deleteOne({ user_id: id, status: false });
  }
  

  async updatePost(id: number) {
    await Posts.updateOne(
      { user_id: id, status: false },
      { $set: { status: true } }
    );
  }
  
}