import { Ipost, NeededCount, Posts } from "../../utils";

export class PostService {
  async createPost(props: Ipost) {
    await Posts.create({
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

  async getPosts(type: NeededCount, id = 1): Promise<Ipost[] | Ipost | null> {
    if (type === NeededCount.ALL) {
      return await Posts.find({ status: false }).sort({ createdAt: -1 });
    } else if (type === NeededCount.ONE) {
      return await Posts.findOne({ user_id: id, status: true });
    }
    return null;
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
