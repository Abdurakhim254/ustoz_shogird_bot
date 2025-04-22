import { getPost, getUser } from "./index.js"

export const formatPosts=async(id)=>{
    const [post,user]=await Promise.all([
       getPost(id),
      getUser(id)
    ])
 ;
    const text = `   ${post.theme}
      
    👨‍💼 Xodim: ${post.name}
    🕑 Yosh: ${post.age}
    📚 Texnologiya: ${post.texnologiya} 
    🇺🇿 Telegram: @${user.username?user.username:user.phone_number}
    📞 Aloqa: ${post.aloqa}
    🌐 Hudud: ${post.hudud} 
    💰 Narxi: ${post.narx}
    👨🏻‍💻 Kasbi: ${post.kasb}
    🕰 Murojaat qilish vaqti: ${post.muroojaat_vaqti} 
    🔎 Maqsad: ${post.maqsad}
    
    ${post.tag} #${post.hudud}`
    return text

}