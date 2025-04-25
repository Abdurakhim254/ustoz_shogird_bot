import { User } from "../../utils";


export class UserService {
    async getuser(id:number){
        const user=await User.findOne({user_id:id})
        return user
     }


     async createuser(user_id:number,phone_number:number,first_name:string,username:string){     
        const user=await User.create({user_id,phone_number,first_name,username})
        return user 
    }
}