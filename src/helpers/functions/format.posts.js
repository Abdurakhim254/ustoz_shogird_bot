import { getPost, getUser } from "./index.js"

export const formatPosts=async(id)=>{
    const post =await getPost(id)
    const user =await getUser(id)
    const contact=""
    if(user.username!=undefined){
      contact=`@${user.username}`
  }else{
      contact=user.phone_number
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