import { Posts } from "../../utils/database/index.js";

export const getPosts = async () => {
  try {
    const posts = await Posts.find({ status: false }).sort({ timestamp: -1 });
    return posts;
  } catch (error) {
    return undefined;
  }
};
