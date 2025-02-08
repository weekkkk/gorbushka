import { Context } from 'src/interfaces';

export const clearChat = async (ctx: Context) => {
  if (!ctx.session.messageIds) return;
  await ctx.deleteMessages(ctx.session.messageIds);
  ctx.session.messageIds = undefined;
};
