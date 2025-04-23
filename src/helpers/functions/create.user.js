import { User } from "../../utils/database/index.js"

export const CreateUser=async(ctx)=>{
    await User.create({
        user_id: ctx.message.from.id,
        phone_number: ctx.update.message.contact.phone_number,
        first_name: ctx.message.from.first_name,
        username: ctx.message.from.username,
      });
}