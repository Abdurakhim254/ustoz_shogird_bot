import { Posts } from "../../utils/database/index.js";

export const createPost = async (
  user_id,
  name,
  age,
  texnologiya,
  aloqa,
  hudud,
  narx,
  maqsad,
  murojaat_vaqti,
  theme,
  tag
) => {
  await Posts.create({user_id, name, age, texnologiya, aloqa, hudud, narx ,maqsad,murojaat_vaqti,theme,tag});
};
