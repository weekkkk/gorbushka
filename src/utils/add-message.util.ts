import { Message } from 'telegraf/typings/core/types/typegram';
import { Context } from 'src/interfaces';

export const addMessage = (ctx: Context, message?: Message) => {
  if (!message) return;
  if (!ctx.session.messageIds) ctx.session.messageIds = [];

  ctx.session.messageIds.push(message.message_id);
};
