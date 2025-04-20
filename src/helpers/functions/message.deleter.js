

export async function messageDeleter(ctx){
    for (const messageId of ctx.session.messageIds) {
        try {
          await ctx.api.deleteMessage(ctx.session.chatId, messageId).catch(() => {})
        } catch (error) {
          console.log('🚀 ~ error:', error)
        }
      }
    
      ctx.session.messageIds = []
}


