import { getUser } from "./index.js"

export const Shablonizator=async(Messages,ctx)=>{
    const user=await getUser(ctx.message.from.id);
    let contact=""
    if(user.username){
        contact=`@${user.username}`
    }else{
        contact='+'+user.phone_number
    }
    const text = `   ${Messages.theme}
      
    👨‍💼 Xodim: ${ctx.session.name}
    🕑 Yosh: ${ctx.session.age}
    📚 Texnologiya: ${ctx.session.texnologiya} 
    🇺🇿 Telegram: ${contact}
    📞 Aloqa: ${ctx.session.aloqa}
    🌐 Hudud: ${ctx.session.hudud} 
    💰 Narxi: ${ctx.session.narx}
    👨🏻‍💻 Kasbi: ${ctx.session.kasb}
    🕰 Murojaat qilish vaqti: ${ctx.session.muroojaat_vaqti} 
    🔎 Maqsad: ${ctx.session.maqsad}
    
    ${Messages.tag} #${ctx.session.hudud}`
    return text

}