import { TypeEnum } from "../../utils/constants/index.js"
import { getPost, getUser } from "./index.js"


export const formatPosts=async(id)=>{
    const post =await getPost(id,TypeEnum.false)
    const user =await getUser(id)
    let contact=""
    if(user.username){
      contact=`@${user.username}`
  }else{
      contact='+'+user.phone_number
  }
    const text = `   ${post.theme}
      
    👨‍💼 Xodim: ${post.name}
    🕑 Yosh: ${post.age}
    📚 Texnologiya: ${post.texnologiya} 
    🇺🇿 Telegram: ${contact}
    📞 Aloqa: ${post.aloqa}
    🌐 Hudud: ${post.hudud} 
    💰 Narxi: ${post.narx}
    👨🏻‍💻 Kasbi: ${post.kasb}
    🕰 Murojaat qilish vaqti: ${post.murojaat_vaqti} 
    🔎 Maqsad: ${post.maqsad}
    
    ${post.tag} #${post.hudud}`
    return text

}