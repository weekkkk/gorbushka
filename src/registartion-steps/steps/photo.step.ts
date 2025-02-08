import { FStep, Context } from 'src/interfaces';
import { buckButton } from 'src/buttons';
import { EGuestRegistrationSessionStep, EGuestSessionType } from 'src/enums';
import { addMessage } from 'src/utils';

export const photo: FStep = async (ctx: Context) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [EGuestRegistrationSessionStep.Photo];

  addMessage(ctx, await ctx.reply('📸 Отравьте свое фото', buckButton));
};
