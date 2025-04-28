import { Ipost, NeededCount, Posts } from "../../utils";
import { v4 as uuidv4 } from 'uuid';

export class PostService {
  async createPost(props: Ipost) {
    await Posts.create({
      id: uuidv4(),
      user_id: props.user_id,
      name: props.name,
      age: props.age,
      texnologiya: props.texnologiya,
      aloqa: props.aloqa,
      hudud: props.hudud,
      narx: props.narx,
      kasb: props.kasb,
      murojaat_vaqti: props.murojaat_vaqti,
      maqsad: props.maqsad,
      theme: props.theme,
      tag: props.tag,
    });
  }

  async getPosts(type: NeededCount, id = "") {
    if (type === NeededCount.ALL) {
      return await Posts.find({ status: false }).sort({ createdAt: -1 });
    } else if (type === NeededCount.ONE) {
      return await Posts.findOne({ id: id });
    }
    return null;
  }
  

  async deletePost(id:string) {
    await Posts.deleteOne({ id: id });
  }


  async updatePost(id: string) {
    await Posts.updateOne(
      { id: id},
      { $set: { status: true } }
    );
  }
}
