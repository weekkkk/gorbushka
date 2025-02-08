import { FStep } from 'src/interfaces';
import { EGuestRegistrationSessionStep, EGuestSessionType } from 'src/enums';
import { addMessage } from 'src/utils';
import { buckButton } from 'src/buttons';

export const name: FStep = async (ctx) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [EGuestRegistrationSessionStep.Name];

  addMessage(ctx, await ctx.reply('🖊️ Введите свое ФИО', buckButton));
};
