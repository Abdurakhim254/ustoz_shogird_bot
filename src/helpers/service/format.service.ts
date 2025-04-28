import { Ipost } from "../../utils";
import { UserService } from "./user.service";



const userservice=new UserService()


export class FormatService{
    
    async createTemplate(ctx:any){
        
        const user=await userservice.getuser(+ctx.user_id)
        let contact:string|number|undefined
        if(user?.username){
            contact=`@${user.username}`
        }else{
            contact=user?.phone_number
        }
        const formatPost = `   ${ctx.theme}
      
        👨‍💼 Xodim: ${ctx.name}
        🕑 Yosh: ${ctx.age}
        📚 Texnologiya: ${ctx.texnologiya} 
        🇺🇿 Telegram: ${contact}
        📞 Aloqa: ${ctx.aloqa}
        🌐 Hudud: ${ctx.hudud} 
        💰 Narxi: ${ctx.narx}
        👨🏻‍💻 Kasbi: ${ctx.kasb}
        🕰 Murojaat qilish vaqti: ${ctx.murojaat_vaqti} 
        🔎 Maqsad: ${ctx.maqsad}
        
        ${ctx.tag} #${ctx.hudud}`
        return formatPost
    }

}