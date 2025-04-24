import { Posts } from "../../utils";



export class PostService {
   async createPost(){
    const post=await Posts.create({})
   }
}