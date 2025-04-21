import { Posts } from "../../utils/database/index.js";

export const createPost = async (
  name,
  age,
  texnologiya,
  aloqa,
  hudud,
  narx
) => {
  await Posts.create({ name, age, texnologiya, aloqa, hudud, narx });
};
